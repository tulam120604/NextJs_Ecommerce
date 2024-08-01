'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { toast } from 'react-toastify';
import { Query_Category, Query_Items } from "../Tanstack_Query/Items/query";
import { Mutation_Items } from "../Tanstack_Query/Items/mutationFn";



export function Custome_Hooks({ mode }: any) {
    const { edit_item } = useParams();
    let data_one_item: any;
    if (mode === 'edit' && mode) {
        data_one_item = Query_Items(String(edit_item));
    }
    const [dataToken, set_DataToken] = useState();
    const routing = useRouter();

    useEffect(() => {
        const data_Token = localStorage.getItem('account');
        if (data_Token) {
            const token_Account = JSON.parse(data_Token);
            set_DataToken(token_Account.token)
        }
    }, [dataToken]);
    const { data, isLoading } = Query_Category();
    const data_Category = data;
    // console.log(data_Category)
    const { my_Form, on_Submit, loading, query_client } = Mutation_Items({
        action: edit_item ? "EDIT" : "ADD",
        onSuccess: () => {
            query_client.invalidateQueries({
                queryKey: ['Product_Key']
            })
            my_Form.reset();
            const text_alert = edit_item ? `Sản phẩm mã ${edit_item} đã được sửa !` : "Đã thêm sản phẩm !";
            toast.success(text_alert, {autoClose: 500})
            setTimeout(() => {
                routing.push('/admin/list_products')
            }, 800);
        },
        onSettled: () => {
            // Optionally handle any cleanup or additional logic after mutation
            query_client.invalidateQueries({
                queryKey: ['Product_Key']
            });
        },
        onError: () => {
            Swal.fire({
                icon: "error",
                title: "Lỗi",
                text: "Vui lòng kiểm tra lại!!",
            });
        }
    });
    useEffect(() => {
        if (edit_item && mode) {
            my_Form.reset(data_one_item.data);
        }
        // console.count('re-render')
    }, [my_Form, data_one_item && data_one_item.data]);
    function submitForm(data_form: any) {
        try {
            console.log(data_form);
            const attributesString = JSON.stringify(data_form.attributes);
            const formData = new FormData();
            formData.append('short_name', data_form.short_name);
            formData.append('feature_product', (typeof data_form.feature_product == 'string') ? data_form.feature_product :  data_form.feature_product[0]);
            (data_form.price_product && formData.append('price_product', data_form.price_product))
            formData.append('des_product', data_form.des_product);
            formData.append('category_id', data_form.category_id && data_form.category_id);
            formData.append('made_in', data_form.made_in);
            (data_form.stock ? formData.append('stock', data_form.stock) : formData.append('attributes', attributesString))
            // console.log(attributesString)
            let dataAll: any = {
                token: dataToken,
                data_item: formData,
            }
            if (mode && edit_item) {
                dataAll = {
                    token: dataToken,
                    data_item: formData,
                    id_item: edit_item
                }
            }
            on_Submit(dataAll);
        } catch (error) {
            console.error(error || "Lỗi rồi đại vương ơi!");
        }
    };

    return {
        dataToken,
        my_Form,
        submitForm,
        routing,
        isLoading,
        loading,
        data_Category,
        data_one_item,
    }
}