import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Detail_Item_Dashboard,
  Query_Category,
} from "../Query_APIs/Items/Query";
import { Mutation_Items } from "../Query_APIs/Items/Mutation_product";

export function useCustome_Hook_Product({ mode }: any) {
  const router = useRouter();
  const params = useParams();
  const id_item = params["cap-nhat-san-pham"] as string;
  const [filed_form_data, setFiled_form_data] = useState<any>();

  let data_detail_product: any;
  if (mode === "edit" && mode) {
    data_detail_product = Detail_Item_Dashboard(String(id_item));
  }

  const { data: data_Category, isLoading } = Query_Category();
  const { my_form, on_Submit, isLoading : loading_mutation } = Mutation_Items({
    action: id_item ? "EDIT" : "ADD",
  });
  useEffect(() => {
    if (id_item && mode) {
      my_form.reset(data_detail_product.data);
    }
    // console.count('re-render')
  }, [my_form, data_detail_product?.data, mode, id_item]);
  function submitForm(data_form: any) {
    try {
      const value_form_data = my_form?.getValues();
      const check_field = Object.keys(value_form_data).filter(
        (filed: any) =>
          !["stock", "price_product", "variant"].includes(filed) &&
          !value_form_data[filed]
      );
      if (check_field?.length > 0) {
        setFiled_form_data(check_field);
      } else {
        const formData = new FormData();
        const arr_file_gallery = Array.isArray(data_form?.gallery)
          ? data_form?.gallery
          : Object.values(data_form?.gallery);
        arr_file_gallery?.forEach((file: File) => {
          formData.append("gallery", file);
        });
        const variantString = JSON.stringify(data_form.variant);
        formData.append("short_name", data_form.short_name);
        data_form.price_product &&
          formData.append("price_product", data_form.price_product);
        formData.append("des_product", data_form.des_product);
        formData.append(
          "category_id",
          data_form.category_id && data_form.category_id
        );
        formData.append("made_in", data_form.made_in);
        data_form.stock
          ? formData.append("stock", data_form.stock)
          : formData.append("variant", variantString);
        let dataAll: any = {
          data_item: formData,
        };
        if (mode && id_item) {
          dataAll = {
            data_item: formData,
            id_item: id_item,
          };
        }
        const result = on_Submit(dataAll);
        console.log(result);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return {
    my_form,
    submitForm,
    router,
    isLoading,
    loading_mutation,
    data_Category,
    data_detail_product,
    filed_form_data,
  };
}
