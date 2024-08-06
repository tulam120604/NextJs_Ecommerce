import { useMutation, useQueryClient } from "@tanstack/react-query"
import { add_order, restore_buy_order, update_status_order } from "../../Services/Services_Order/Fn_Order";
import { useState } from "react";

type Actions = 'ADD_and_RESTORE_BUY_ITEM' | 'EDIT' | 'UPDATE_STATUS' | 'RESTORE_BUY_ITEM'

export function Mutation_Order(action: Actions) {
    const [status_api, setStatus_api] = useState('no_call')
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (dataClient: any) => {
            switch (action) {
                case "ADD_and_RESTORE_BUY_ITEM":
                    if (dataClient.action_mutate == 'restore_buy_item') {
                        return await restore_buy_order(dataClient)
                    }
                    else {
                        return await add_order(dataClient);
                    }
                case "UPDATE_STATUS":
                    return await update_status_order(dataClient)
                default: return
            }
        }, onSuccess: (res: any) => {
            queryClient.invalidateQueries({
                queryKey: ['Key_Order']
            });
            if (res?.status !== 404 || res?.status !== 400 || res?.status !== 500) {
                setStatus_api('call_ok');
                sessionStorage.removeItem('item_order');
            }
            else {
                setStatus_api('call_error')
            }
        }, onError: (error: any) => {
            return error
        }
    })
    return { mutate, ...rest, status_api };
}