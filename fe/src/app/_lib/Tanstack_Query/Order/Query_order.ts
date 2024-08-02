import { useQuery } from "@tanstack/react-query";
import { get_all_order, get_order_user } from "../../Services_Order/Fn_Order";

export function Query_Order (id_user?: any)  {
    const {data, ...rest} = useQuery({
        queryKey : ['Key_Order', id_user],
        queryFn : () => get_order_user(id_user)
    });
    return {data, ...rest};
}


export function List_Order_Dashboard (token : any) {
    const {data, ...rest} = useQuery({
        queryKey : ['Key_Order', token],
        queryFn : async () => {
            if (token) {
                return await get_all_order(token);
            }
            return 'Đại vương là giả mạo!!'
        }
    })
    return {data, ...rest};
}