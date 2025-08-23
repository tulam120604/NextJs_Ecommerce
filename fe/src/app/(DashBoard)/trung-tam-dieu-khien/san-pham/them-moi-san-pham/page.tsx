"use client";

import React from "react";
import MyForm from "@/src/app/_Components/Forms/form_product";
import { Mutation_Items } from "@/src/app/_lib/Query_APIs/Items/Mutation_product";
import { Query_Category } from "@/src/app/_lib/Query_APIs/Items/Query";

const page = () => {
  const { data: data_Category, isLoading: loading_category } = Query_Category();

  const { my_form, mutateAsync, isLoading } = Mutation_Items({
    action: "ADD",
  });
  const props = {
    my_form,
    mutateAsync,
    isLoading,
    data_Category,
    loading_category,
  };
  return <MyForm props={props} type='Thêm sản phẩm vào cửa hàng'/>;
};

export default page;
