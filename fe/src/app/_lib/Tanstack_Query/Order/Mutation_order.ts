import { useMutation, useQueryClient } from "@tanstack/react-query"
import { add_order } from "../../Order/Fn_Order";
import { useState } from "react";

type Actions = 'ADD' | 'EDIT'

export function Mutation_Order (action : Actions) {
    const queryClient = useQueryClient();
    const {mutate, ...rest} = useMutation({
        mutationFn : async (dataClient : any) => {
            switch (action) {
                case "ADD" : 
                return add_order(dataClient);
                default : return
            }
        }, onSuccess : (res: any) => {
            queryClient.invalidateQueries({
                queryKey : ['Key_Order']
            });
            return res
        } , onError : (error : any) => {
            return error
        }
    })
    return {mutate, ...rest};
}