'use client';

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { create_attributesCatalog, create_value_attributeCatalog, get_attributeCatalog_by_item, get_attributeCatalog_by_seller } from "../../Services/Services_Items/attribute_catalog";


export function Get_AttributeCatalog_Items(id_item: any) {
    const { data, ...rest } = useQuery({
        queryKey: ['Attribute_Catalog_Key', id_item],
        queryFn: async () => id_item && await get_attributeCatalog_by_item(id_item),
    })
    return { data, ...rest };
}

export function Get_AttributeCatalog_Seller(id_seller: any) {
    const { data, ...rest } = useQuery({
        queryKey: ['Attribute_Catalog_Key', id_seller],
        queryFn: async () => id_seller && await get_attributeCatalog_by_seller(id_seller),
        enabled: !!id_seller
    })
    return { data, ...rest };
}


export function Mutation_AttributeCatalog(actions: 'CREATE' | 'CREATE_VALUE' | 'UPDATE') {
    const queryClient = useQueryClient();
    const { mutate, ...rest } = useMutation({
        mutationFn: async (value: any) => {
            switch (actions) {
                case 'CREATE':
                    return await create_attributesCatalog(value);
                case "CREATE_VALUE":
                    return await create_value_attributeCatalog(value);
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