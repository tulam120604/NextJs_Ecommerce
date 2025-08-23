"use client";

import React, { useState } from "react";
import { Button } from "../ui/Shadcn/button";
import { Plus, X } from "lucide-react";
import Field_Form from "./field_form";
import { message } from "../ui/message";

export default function Form_variant({ propsData }: any) {
  const { my_form } = propsData;
  const [variant, setVariant] = useState<any>([
    {
      attribute: "",
      value_variants: [
        {
          name_variant: "",
          stock_variant: 0,
          price_variant: 0,
        },
      ],
    },
  ]);

  function add_value_variant(i: any) {
    if (variant[i]?.value_variants?.length > 9) {
      message.warning("Giá trị biến thể tối đa là 10");
      return;
    }
    const add_value_variants = [...variant];
    add_value_variants[i].value_variants.push({
      name_variant: "",
      stock_variant: 0,
      price_variant: 0,
    });
    setVariant(add_value_variants);
  }

  function add_variant() {
    if (variant?.length > 9) {
      message.warning("Biến thể của sản phẩm tối đa là 10!");
      return;
    }
    setVariant([
      ...variant,
      {
        attribute: "",
        value_variants: [
          {
            name_variant: "",
            stock_variant: 0,
            price_variant: 0,
          },
        ],
      },
    ]);
  }

  // remove variant
  function remove_Variant(index: number) {
    const new_variant = [...variant];
    new_variant.splice(index, 1);
    setVariant(new_variant);
  }

  // remove value variant
  function remove_value_variants(index: number) {
    const remove_value_variant = [...variant];
    remove_value_variant[index].value_variants.splice(index, 1);
    setVariant(remove_value_variant);
  }

  return (
    <>
      <div className="flex flex-col text-gray-700 gap-y-2">
        {variant?.map((item: any, i: any) => (
          <div key={item._id}>
            <div className="flex items-start gap-x-4">
              <div className="flex items-end gap-4 text-sm flex-wrap">
                <Field_Form
                  props={{
                    text_label: "Tên biến thể",
                    htmlFor: "attribute",
                    type: "text",
                    registerValue: `variant[${i}].attribute`,
                    my_form,
                    errors:
                      my_form?.formState?.errors?.variant?.[i]?.attribute
                        ?.message,
                  }}
                />
              </div>
              <div className="flex flex-col gap-y-3">
                {item?.value_variants?.map((_: any, j: any) => (
                  <div key={i} className="flex item-center gap-x-4 text-sm">
                    <Field_Form
                      props={{
                        text_label: "Kích thước (nếu có)",
                        htmlFor: "value_variant",
                        type: "text",
                        registerValue: `variant[${i}].value_variants[${j}].name_variant`,
                        my_form,
                      }}
                    />
                    <Field_Form
                      props={{
                        text_label: "Giá",
                        htmlFor: "price_variant",
                        type: "text",
                        registerValue: `variant[${i}].value_variants[${j}].price_variant`,
                        my_form,
                        errors:
                          my_form?.formState?.errors?.variant?.[i]
                            ?.value_variants?.[j]?.price_variant?.message,
                      }}
                    />
                    <Field_Form
                      props={{
                        text_label: "Số lượng",
                        htmlFor: "stock_variant",
                        type: "text",
                        registerValue: `variant[${i}].value_variants[${j}].stock_variant`,
                        my_form,
                        errors:
                          my_form?.formState?.errors?.variant?.[i]
                            ?.value_variants?.[j].stock_variant?.message,
                      }}
                    />
                    {/* <div>
                      <label htmlFor="stock_variant">Số lượng</label>
                      <input
                        id="stock_variant"
                        type="text"
                        defaultValue={e?.stock_item}
                        {...propsData?.my_Form?.register(
                          `variant[${i}].value_variants[${j}].stock_variant`,
                          { required: true }
                        )}
                        className="outline-none py-2 px-4 border border-gray-300 rounded"
                      />
                    </div> */}
                    {item?.value_variants?.length > 1 && (
                      <X
                        width={30}
                        height={30}
                        onClick={() => remove_value_variants(i)}
                        className={`${
                          j < 1 && "invisible"
                        } text-red-500 rounded-full cursor-pointer 
                        translate-y-7 hover:bg-red-500 hover:text-gray-50 duration-200 p-0.5`}
                      />
                    )}
                    {item?.value_variants?.length < 2 && (
                      <div className="w-[30px] h-[30px]" />
                    )}
                  </div>
                ))}
              </div>
              <Plus
                width={30}
                height={30}
                onClick={() => add_value_variant(i)}
                className="cursor-pointer rounded-full p-0.5 text-sky-600 hover:bg-sky-500 
                hover:text-gray-50 duration-200 -translate-x-[46px] translate-y-7"
              />
            </div>
            {variant?.length > 1 && (
              <div className={`${i < 1 && "invisible h-0"} mb-4 mt-2`}>
                <Button
                  type="button"
                  onClick={() => remove_Variant(i)}
                  className="w-auto bg-red-500 hover:bg-red-600 duration-200"
                >
                  Gỡ biến thể
                </Button>
              </div>
            )}
          </div>
        ))}
        <div>
          <Button
            type="button"
            onClick={add_variant}
            className="px-4 bg-indigo-600 hover:bg-indigo-800 duration-200"
          >
            Thêm biến thể
          </Button>
        </div>
      </div>
    </>
  );
}
