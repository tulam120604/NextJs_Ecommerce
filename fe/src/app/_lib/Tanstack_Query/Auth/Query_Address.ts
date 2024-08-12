import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create_address, get_address } from "../../Services/Services_Auth/Address";
import { useForm } from "react-hook-form";

export function List_Address(id_user: string | number , accessToken?: string) {
    const { data, ...rest } = useQuery({
        queryKey: ['Address_Key' ,id_user, accessToken],
        queryFn: async () => {
            if (accessToken) {
                return await get_address(id_user, accessToken);
            }
            return 'Không thể xác minh danh tính!!'
        },
        enabled: !!accessToken
    })
    return { data, ...rest };
}

type Actions = 'CREATE' | 'EDIT' | 'REMOVE'

export function Mutation_Address (action : Actions){
    const queryClient = useQueryClient();
    const form_address = useForm()
    const { mutate, ...rest } = useMutation({
        mutationFn : async (dataClient : any) => {
            switch (action){
                case "CREATE" :
                    return await create_address(dataClient);
                default : return
            }
        },
        onSuccess : () => {
            queryClient.invalidateQueries({
                queryKey : ['Address_Key']
            })
        }
    })
}