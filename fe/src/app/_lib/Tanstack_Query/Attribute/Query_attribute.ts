'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create_attributes, create_value_attribute, get_attribute_by_item } from "../../Services/Services_Items/attribute";


export function Get_Attribute_Items(id_item: any) {
    const { data, ...rest } = useQuery({
        queryKey: ['Attribute_Key'],
        queryFn: async () => id_item && await get_attribute_by_item(id_item),
    })
    return { data, ...rest };
}

export function Mutation_Attribute(actions: 'CREATE' | 'CREATE_VALUE' | 'UPDATE') {
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (value: any) => {
            switch (actions) {
                case 'CREATE':
                    return await create_attributes(value);
                case "CREATE_VALUE":
                    return await create_value_attribute(value);
                default: return
            }
        },
        onSuccess: (res) => {
            queryClient.invalidateQueries({
                queryKey: ['Attribute_Key']
            })
        },
        onError: (error) => error
    });

    return { mutate, ...rest }
}