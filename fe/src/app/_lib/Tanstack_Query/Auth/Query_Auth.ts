import { useQuery } from "@tanstack/react-query";
import { infor_user, list_Account } from "../../Services_Auth/Authen";

export function List_Account(accessToken: any) {
    const { data, ...rest } = useQuery({
        queryKey: ['Account_Key'],
        queryFn: async () => {
            if (accessToken) {
                return await list_Account(accessToken);
            }
            return 'Không thể xác minh danh tính!!'
        },
        enabled: !!accessToken
    })
    return {data, ...rest};
} 

export function Infor_user (id : string | number) {
    const {data, ...rest} = useQuery({
        queryKey : ['Account_Key', id],
        queryFn : async () => {
            if (id) {
                return await infor_user(id);
            };
            return 'Không thể xác minh danh tính!!'
        },
        enabled : !!id
    });
    return {data, ...rest};
}