'use client';

import { getAll, getDetail, getLimit, list_ITems_Admin, list_Recycle_ITems_Admin } from "../../Fn_Items/products";
import { detail_Categories, list_Categories } from "../../Fn_Items/categories";
import { useQuery } from "@tanstack/react-query";


// product list / detail
export function Query_Items(id?: string | number) {
    const key = id ? ['Product_Key', id] : ['Product_Key'];
    const { data, ...rest } = useQuery({
        queryKey: key,
        queryFn: async () => {
            return id ? await getDetail(id) : await getAll();
        },
        // refetchInterval: 1000,
    })
    return { data, ...rest };
}

// paginate item
export function Paginate_Item(page?: number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Product_Key', page],
        queryFn: async () => await getAll(page)
    })
    return { data, ...rest }
}

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
export function Query_List_Items_Admin(token : any, page? : Number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Product_Key'],
        queryFn: async () => {
            if (token) {
                return await list_ITems_Admin(token, page);
            }
            return "Không xác minh tài khoản"
        },
        enabled : !!token
    });
    return { data, ...rest };
}

// get list item admin
export function Query_Recycle_Items_Admin(token : any, page? : Number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Product_Key'],
        queryFn: async () => {
            if (token) {
                return await list_Recycle_ITems_Admin(token, page);
            }
            return "Không thể xác minh tài khoản"
        },
        enabled : !!token
    });
    return { data, ...rest };
}


// edit all field list item admin
export function Query_Edit_Items_Admin(token : any, page? : Number) {
    const { data, ...rest } = useQuery({
        queryKey: ['Product_Key'],
        queryFn: async () => {
            if (token) {
                return await list_Recycle_ITems_Admin(token, page);
            }
            return "Không thể xác minh tài khoản"
        },
        enabled : !!token
    });
    return { data, ...rest };
}