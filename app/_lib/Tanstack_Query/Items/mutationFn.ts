'use client';

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItem, editItem, removeItem } from "../../Fn_Items/products";
import { SubmitHandler, useForm } from "react-hook-form";

type Action =  'ADD' | 'EDIT' | 'REMOVE' ;


export function Mutation_Items (action : Action) {

    // create form 
    const my_Form = useForm();
    
    const query_client = useQueryClient();
    const {mutate, ...rest} = useMutation({
        retry : 3,
        mutationFn : async (dataClient) => {
            switch (action) {
                case 'ADD' :
                    return await addItem(dataClient);
                case 'EDIT' : 
                    return await editItem(dataClient);
                case 'REMOVE' :
                    return await removeItem(dataClient)
                default : return
            }
        },
        onSuccess : (item : any) => {
            if (item) {
                query_client.invalidateQueries({
                    queryKey : ['Product_Key']
                })
            } else {
                console.error('Kiem tra lai internet, server,...')
            }
        },
        onError: (err) => {
            console.error(err)
        }
    })

    // form
    const on_Submit : SubmitHandler<any> = async (data) => {
        mutate(data);
    }

    return {mutate, my_Form, on_Submit, ...rest};
}
