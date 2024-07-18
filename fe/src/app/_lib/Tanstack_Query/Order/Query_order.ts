import { useQuery } from "@tanstack/react-query";
import { get_all_order, get_order_user } from "../../Order/Fn_Order";

export function Query_Order (id_user?: any, token?: any)  {
    const key_order = id_user ? ['Key_Order', id_user] : ['Key_Order'];
    const {data, ...rest} = useQuery({
        queryKey : key_order,
        queryFn : async () => (
            id_user ?  await get_order_user(id_user) : await get_all_order(token)
        )
    });
    return {data, ...rest};
}