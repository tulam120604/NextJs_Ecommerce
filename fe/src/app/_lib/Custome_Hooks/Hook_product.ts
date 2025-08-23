import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Detail_Item_Dashboard,
  Query_Category,
} from "../Query_APIs/Items/Query";
import { Mutation_Items } from "../Query_APIs/Items/Mutation_product";
import { uploadMultipleImage } from "../../util/upload";

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
  const {
    my_form,
    on_Submit,
    isLoading: loading_mutation,
  } = Mutation_Items({
    action: id_item ? "EDIT" : "ADD",
  });
  useEffect(() => {
    if (id_item && mode) {
      my_form.reset(data_detail_product.data);
    }
    // console.count('re-render')
  }, [my_form, data_detail_product?.data, mode, id_item]);
  async function submitForm(data_form: any) {
    try {
      const urlGallery = await uploadMultipleImage(data_form?.gallery);
      const dataReq = {
        ...data_form,
        gallery: urlGallery,
        ...(mode && { id_item }),
      };
      const result = await on_Submit(dataReq);
      return result;
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
