import { useQuery } from "@tanstack/react-query";
import { list_Account } from "../../Services_Auth/Authen";

export function List_Account(token: any, id?: string | number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Account_Key'],
        queryFn: async () => {
            if (token) {
                return await list_Account(token);
            }
            return 'Không thể xác minh danh tính!!'
        },
        enabled: !!token
    })
    return {data, ...rest};
} 