import { useQuery } from "@tanstack/react-query";
import { get_all_order, get_order_user } from "../../Services_Order/Fn_Order";

export function Query_Order (id_user: any, page : number, limit : number, status_item_order ?: any)  {
    const {data, ...rest} = useQuery({
        queryKey : ['Key_Order', id_user,page, limit, status_item_order],
        queryFn : () => get_order_user(id_user, page, limit, status_item_order),
        enabled : !!id_user
    });
    return {data, ...rest};
}


export function List_Order_Dashboard (accessToken : any) {
    const {data, ...rest} = useQuery({
        queryKey : ['Key_Order', accessToken],
        queryFn : async () => {
            if (accessToken) {
                return await get_all_order(accessToken);
            }
            return 'Đại vương là giả mạo!!'
        }
    })
    return {data, ...rest};
}