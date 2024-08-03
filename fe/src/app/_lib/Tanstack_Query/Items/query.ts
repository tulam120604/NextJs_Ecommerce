'use client';

import { getDetailDashboard, getLimit, getLimit_and_paginate, list_All_Item_Dashboard, list_ITems_Dashboard, list_Recycle_ITems_Admin } from "../../Services_Items/products";
import { detail_Categories, list_Categories } from "../../Services_Items/categories";
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
export function Query_List_Items_Dashboard(accessToken: any, page: number, limit_item: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Product_Key', page],
        queryFn: async () => {
            if (accessToken) {
                return await list_ITems_Dashboard(accessToken, page, limit_item);
            }
            return "Không thể xác minh tài khoản"
        },
        enabled: !!accessToken
    });
    return { data, ...rest };
}

// detail
export function Detail_Item_Dashboard (id : string | number)  {
    const {data, ...rest}  = useQuery({
        queryKey : ['Product_Key', id],
        queryFn : () => getDetailDashboard(id)
    })
    return {data, ...rest}
}

// get all item admin
export function Query_List_All_Items_Dashboard(accessToken: any) {
    const { data, ...rest } = useQuery({
        queryKey: ['Product_Key'],
        queryFn: async () => {
            if (accessToken) {
                return await list_All_Item_Dashboard(accessToken);
            }
            return "Không thể xác minh tài khoản"
        },
        enabled: !!accessToken
    });
    return { data, ...rest };
}


// get the list in the trash
export function Query_Recycle_Items_Admin(accessToken: any, page?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Product_Key'],
        queryFn: async () => {
            if (accessToken) {
                return await list_Recycle_ITems_Admin(accessToken, page);
            }
            return "Không thể xác minh tài khoản"
        },
        enabled: !!accessToken
    });
    return { data, ...rest };
}


// edit all field list item admin
export function Query_Edit_Items_Admin(accessToken: any, page?: Number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Product_Key'],
        queryFn: async () => {
            if (accessToken) {
                return await list_Recycle_ITems_Admin(accessToken, page);
            }
            return "Không thể xác minh tài khoản"
        },
        enabled: !!accessToken
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