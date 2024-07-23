'use client';

import { addItem, edit_items_admin, removeItem, restore_items_admin } from "../../Fn_Items/products";
import { SubmitHandler, useForm } from "react-hook-form";
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

type Action = 'ADD' | 'EDIT' | 'REMOVE' | 'RESTORE';


export function Mutation_Items({action , onSuccess, onError, onSettled} : {action : Action, onSuccess?: any, onError? : any, onSettled? : any} ) {
    const [loading, setLoading] = useState<string>('no_call');
    // create form 
    const my_Form = useForm();

    const query_client = useQueryClient();
    const { mutate, ...rest } = useMutation({
        // retry: 3,
        mutationFn: async (dataClient) => {
            setLoading('dang_call');
            switch (action) {
                case 'ADD':
                    return await addItem(dataClient);
                case 'EDIT':
                    return await edit_items_admin(dataClient);
                case 'REMOVE':
                    return await removeItem(dataClient);
                case 'RESTORE':
                    return await restore_items_admin(dataClient);
                default: return
            }
        },
        onSuccess: (res : any) => {
            query_client.invalidateQueries({
                queryKey: ['Product_Key']
            });
            if (res.status === 400) {
                setLoading('call_error');
            }
            else {
                setLoading('call_ok');
            }
        },
        onSettled: () => {
            query_client.invalidateQueries({
                queryKey : ['Product_Key']
            });
          },
        onError: (err) => {
            console.error(err)
        }
    })

    // form
    const on_Submit: SubmitHandler<any> = async (data) => {
        mutate(data);
    }

    return { mutate, my_Form, on_Submit,query_client, onSuccess, onError,  loading, ...rest };
}
