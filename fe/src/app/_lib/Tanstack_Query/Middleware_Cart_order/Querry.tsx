import { useQuery } from "@tanstack/react-query";

export function Get_MiddleWare_Cart_Order (user_id : any) {
    const {data, ...rest} = useQuery({
        queryKey : ['MiddleWare_Cart_Order'],
        queryFn : async () => {
            try {
                const res = await fetch(`http://localhost:2000/v1/middleware_cart_order/${user_id}`);
                if (!res.ok) {
                    return  res.status || 'Lỗi rồi đại vương ơi!!'
                }
                const data = await res.json();
                return data
            } catch (error) {
                return error || 'Lỗi server rồi đại vương ơi!!'
            }
        }
    })
    return {data, ... rest}
}