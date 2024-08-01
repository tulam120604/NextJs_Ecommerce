'use client';

import { getDetail, getLimit, getLimit_and_paginate, list_ITems_Dashboard, list_Recycle_ITems_Admin } from "../../Fn_Items/products";
import { detail_Categories, list_Categories } from "../../Fn_Items/categories";
import { useQuery } from "@tanstack/react-query";


// limit item 
export function Limit_Item(countItem: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Product_Key', countItem],
        queryFn: async () => await getLimit(countItem)
    })
    return { data, ...rest }
}

// category
export function Query_Category(id?: string | number | undefined) {
    const key = id ? ['Category_Key', id] : ['Category_Key'];
    const { data, ...rest } = useQuery({
        queryKey: key,
        queryFn: async () => {
            return id ? await detail_Categories(id) : await list_Categories();
        }
    })
    return { data, ...rest }
}

// get list item admin
export function Query_List_Items_Dashboard(token: any, page: number, limit_item: number, id?: string | number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Product_Key'],
        queryFn: async () => {
            if (token) {
                return id ? await getDetail(id) : await list_ITems_Dashboard(token, page, limit_item);
            }
            return "Không thể xác minh tài khoản"
        },
        enabled: !!token
    });
    return { data, ...rest };
}

// get list item admin
export function Query_Recycle_Items_Admin(token: any, page?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Product_Key'],
        queryFn: async () => {
            if (token) {
                return await list_Recycle_ITems_Admin(token, page);
            }
            return "Không thể xác minh tài khoản"
        },
        enabled: !!token
    });
    return { data, ...rest };
}


// edit all field list item admin
export function Query_Edit_Items_Admin(token: any, page?: Number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Product_Key'],
        queryFn: async () => {
            if (token) {
                return await list_Recycle_ITems_Admin(token, page);
            }
            return "Không thể xác minh tài khoản"
        },
        enabled: !!token
    });
    return { data, ...rest };
}


// paginate and limit client 
// get list item admin
export function Query_Paginate_Item_Client( page: number, limit_item: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Product_Key', page, limit_item],
        queryFn: async () => {
                return await getLimit_and_paginate(page, limit_item);
        },
    });
    return { data, ...rest };
}