/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useState } from "react";
import { Button } from "../ui/Tables/button";
import Form_add_category from "./form_category";
import { CircleMinus, ImageUp, Undo2 } from "lucide-react";
import Loading_Dots from "../Loadings/Loading_Dots";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import Form_variant from "./form_variant";
import { useRouter } from "next/navigation";
import { useCustome_Hook_Product } from "../../_lib/Custome_Hooks/Hook_product";
import Field_Form from "./field_form";

const Form_product: React.FC<any> = ({ mode }: any) => {
  const router = useRouter();
  const {
    my_form,
    submitForm,
    isLoading,
    data_Category,
    data_detail_product,
    filed_form_data,
  } = useCustome_Hook_Product({ mode });
  const [change_img, setChange_img] = useState([]);
  const [images, setImages] = useState<any[]>([]);
  const [category_form, setCategory_form] = useState<boolean>(false);
  const [statusOptionsCategory, setStatusOptionsCategory] =
    useState<any>("Chọn");
  const [statusOptionsVariant, setStatusOptionsVariant] =
    useState<any>("no-variant");
  const [variant, setVariant] = useState<any>([
    {
      attribute: "",
      value_variant: [
        {
          name_variant: "",
          stock_variant: 0,
          price_variant: 0,
        },
      ],
    },
  ]);
  useEffect(() => {
    if (mode) {
      if (data_detail_product?.data) {
        if (data_detail_product?.data?.gallery) {
          setChange_img(data_detail_product?.data?.gallery);
          setImages(data_detail_product?.data?.gallery);
        }
        let data_attr_detail;
        if (data_detail_product?.data?.variant) {
          data_attr_detail = my_form
            .getValues()
            ?.variant?.variants?.map((item: any) => ({
              attribute: item?.attribute,
              value_variant: item?.value_varriant,
            }));
          setVariant(data_attr_detail);
        } else {
          setVariant([]);
        }
      }
      setStatusOptionsCategory(
        data_detail_product?.data?.category_id?.category_name
      );
    }
  }, [mode, data_detail_product?.data, my_form]);
  function handle_category() {
    setCategory_form(!category_form);
  }

  function pushImage(e: any) {
    const file = e.target.files;
    if (file.length > 0) {
      setImages((preImg) => [...preImg, ...Array.from(file)]);
      const file_images = Array.from(file);
      const arr_file_images: any = [];
      file_images?.forEach((file: any) => {
        const reader_img = new FileReader();
        reader_img.onloadend = () => {
          arr_file_images.push(reader_img.result as string);
          if (arr_file_images.length === file_images.length) {
            setChange_img((img: any) => {
              if (img) {
                return [...img, ...arr_file_images];
              }
              return arr_file_images;
            });
          }
        };
        reader_img.readAsDataURL(file);
      });
    }
  }
  function handle_minus_image(uri: string, i: number) {
    const new_image_after_minus = change_img.filter(
      (item: string) => item !== uri
    );
    setChange_img(new_image_after_minus);
    const new_images = images.filter((_: any, index: number) => index !== i);
    setImages(new_images);
  }

  // submit form
  function formSubmit(dataForm: any) {
    const data_form_item = {
      ...dataForm,
      gallery: images,
    };
    submitForm(data_form_item);
  }
  useEffect(() => {
    if (!mode) {
      my_form.reset();
      setChange_img([]);
      setVariant([
        {
          name_varriant: "",
          value_varriant: [
            {
              name_value: "",
              stock_item: 0,
              price_attribute: 0,
            },
          ],
        },
      ]);
    }
  }, [mode, my_form]);
  return (
    <>
      <section className="flex flex-col gap-y-6 py-6 rounded pr-4 overflow-x-hidden">
        {/* {loading === "dang_call" && (
          <div className="grid place-items-center fixed z-[3] *:z-[4] w-screen h-screen top-0 left-0 bg-[#10182488]">
            <Loading_Dots />
          </div>
        )} */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-lg font-extrabold opacity-80">
              {mode ? "Cập nhật sản phẩm" : "Tạo mới sản phẩm"}
            </span>
            <span className="text-gray-600 text-sm">
              {mode ? "Chỉnh sửa lại sản phẩm trong cửa hàng của bạn" : "Thêm mới sản phẩm vào cửa hàng của bạn"}
              
            </span>
          </div>
          <button
            className="opacity-80 hover:underline text-sm flex items-center"
            onClick={() => router.back()}
          >
            Quay lại
            <Undo2 strokeWidth={1.5} size={20} />
          </button>
        </div>
        <div className="relative">
          <button
            onClick={handle_category}
            type="button"
            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors"
          >
            Thêm danh mục
          </button>
          {category_form && (
            <div>
              <div
                onClick={handle_category}
                className="fixed w-[200%] h-[200%] bg-[#00000066] top-0 z-[6] left-0"
              />
              <Form_add_category setCategory_form={setCategory_form} />
            </div>
          )}
        </div>
        <form
          onSubmit={my_form.handleSubmit(formSubmit)}
          className="flex flex-col gap-y-10 p-6 rounded *:w-full text-base text-gray-700 bg-white"
        >
          <div className="grid xl:grid-cols-[2fr_1fr_1fr] gap-x-16 gap-y-6">
            <Field_Form
              props={{
                text_label: "Tên sản phẩm",
                htmlFor: "short_name",
                type: "text",
                registerValue: "short_name",
                my_form,
                errors:
                  filed_form_data?.includes("short_name") &&
                  "Vui lòng nhập tên sản phẩm!",
              }}
            />
            {/* category */}
            {isLoading ? (
              <span>Loading...</span>
            ) : (
              <div className="relative items-center mb-4">
                <label
                  htmlFor="category_id"
                  className="mb-2 text-sm opacity-90"
                >
                  Danh mục
                </label>
                <div className="mt-2">
                  <Select
                    onValueChange={(value) => {
                      my_form.setValue("category_id", value);
                      setStatusOptionsCategory(value);
                    }}
                    {...my_form.register("category_id")}
                  >
                    <SelectTrigger className="!h-auto pt-2 mt-1">
                      <SelectValue placeholder={statusOptionsCategory} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {data_Category?.data?.length > 0 ? (
                          data_Category?.data?.map((item: any) => (
                            <SelectItem key={item?._id} value={item?._id}>
                              {item?.category_name}
                            </SelectItem>
                          ))
                        ) : (
                          <SelectItem value=" ">Trống!</SelectItem>
                        )}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <span className="absolute text-sm text-red-500 whitespace-nowrap top-[72px]">
                  {filed_form_data?.includes("category_id") &&
                    "Vui lòng chọn danh mục sản phẩm!"}
                </span>
              </div>
            )}
            {/* brand */}
            <Field_Form
              props={{
                text_label: "Xuất xứ sản phẩm",
                htmlFor: "made_in",
                type: "text",
                registerValue: "made_in",
                my_form,
                errors:
                  filed_form_data?.includes("made_in") &&
                  "Vui lòng nhập xuất xứ sản phẩm!",
              }}
            />
          </div>
          <div className="flex flex-col gap-y-3">
            <label className="mb-2 text-sm opacity-90">Ảnh sản phẩm</label>
            <div className="flex flex-wrap gap-3 relative">
              {change_img.length > 0 &&
                change_img?.map((uri: any, i: number) => (
                  <div
                    key={uri}
                    className="relative border border-gray-300 rounded"
                  >
                    <img
                      className="w-[100px] h-[100px] rounded"
                      src={uri}
                      alt="loading"
                    />
                    <button
                      className="absolute top-0 right-0 *:w-4 *:h-4 text-xs text-red-500 rounded-full hover:scale-110 duration-200"
                      onClick={() => handle_minus_image(uri, i)}
                      type="button"
                    >
                      <CircleMinus />
                    </button>
                  </div>
                ))}
              <div className="w-full border h-[100px] rounded text-sm grid place-items-center">
                <div className="flex flex-col items-center gap-y-2 text-gray-600">
                  <ImageUp />
                  Kéo và thả ảnh vào đây
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                id="feature_product"
                className="outline-none rounded border cursor-pointer w-full h-[100px] 
                  absolute opacity-0"
                onChange={pushImage}
                multiple
              />
            </div>
          </div>
          <Field_Form
            props={{
              text_label: "Mô tả sản phẩm",
              htmlFor: "description",
              type: "text",
              registerValue: "des_product",
              my_form,
              errors:
                filed_form_data?.includes("des_product") &&
                "Vui lòng nhập mô tả sản phẩm!",
            }}
          />
          <div className="w-full rounded *:p-4 border">
            <section className="w-full flex items-center gap-10">
              <span className="mb-2 text-sm opacity-90">Dữ liệu sản phẩm</span>
              <div>
                <Select
                  value={statusOptionsVariant}
                  onValueChange={(value) => setStatusOptionsVariant(value)}
                >
                  <SelectTrigger className="!h-auto pt-2 mt-1">
                    <SelectValue placeholder="Sản phẩm đơn giản" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="no-variant">
                        Sản phẩm đơn giản
                      </SelectItem>
                      <SelectItem value="variant">
                        Sản phẩm có biến thể
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            </section>
            {/* --- */}
            {(statusOptionsVariant === "no-variant" || variant?.length < 1) && (
              <div className="flex gap-x-16">
                <Field_Form
                  props={{
                    text_label: "Giá",
                    htmlFor: "price_product",
                    type: "text",
                    registerValue: "price_product",
                    my_form,
                  }}
                />

                <Field_Form
                  props={{
                    text_label: "Số lượng",
                    htmlFor: "stock",
                    type: "text",
                    registerValue: "stock",
                    my_form,
                  }}
                />
              </div>
            )}
            {statusOptionsVariant === "variant" && (
              <Form_variant propsData={{ my_form }} />
            )}
          </div>

          {/* {loading === "call_error" && (
            <span className="text-red-500">Lỗi! Vui lòng kiểm tra lại!!</span>
          )} */}
          <div className="w-full">
            <Button
              type="submit"
              className={`text-sm font-medium text-white 
                        ${
                          mode
                            ? "bg-yellow-500 hover:bg-yellow-600"
                            : "bg-indigo-600 hover:bg-indigo-800"
                        }`}
            >
              {mode ? "Cập nhật sản phẩm" : "Tạo sản phẩm"}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};
export default Form_product;