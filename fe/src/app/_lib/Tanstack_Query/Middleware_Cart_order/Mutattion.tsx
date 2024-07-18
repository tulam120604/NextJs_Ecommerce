import { useMutation, useQueryClient } from "@tanstack/react-query";


type Actions = "PUSH" | "DELETE"

export function Mutation_Middleware_Cart_Order(action: Actions) {
    const queryClient = useQueryClient();

    const { mutate, ...rest } = useMutation({
        mutationFn: async (item: any) => {
            switch (action) {
                case 'PUSH':
                    try {
                        const res = await fetch(`http://localhost:2000/v1/middleware_cart_order/add_middleware_order`, {
                            method: 'post',
                            headers : {
                                'Content-Type' : 'application/json',
                            },
                            body: JSON.stringify({user_id: item.user_id,items_middleware: item.items, total_price : item.total_price})
                        });
                        if (!res.ok) {
                            return res.status || 'Lỗi rồi đại vương ơi!!'
                        }
                        const data = await res.json();
                        return data
                    } catch (error) {
                        return error || 'Lỗi server rồi đại vương ơi!!'
                    }
                case 'DELETE':
                    try {
                        const res = await fetch(`http://localhost:2000/v1/middleware_cart_order`, {
                            method: 'delete',
                        });
                        if (!res.ok) {
                            return res.status || 'Lỗi rồi đại vương ơi!!'
                        }
                        const data = await res.json();
                        return data
                    } catch (error) {
                        return error || 'Lỗi server rồi đại vương ơi!!'
                    }
                default: return
            }
        }, onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ['MiddleWare_Cart_Order']
            })
        }, onError: (error: any) => {
            return error
        }
    })

    return { mutate, ...rest }
}