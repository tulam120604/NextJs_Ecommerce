'use client';

import { useQuery } from "@tanstack/react-query";
import { getAll, getDetail, getLimit, list_All_ITems } from "../../Fn_Items/products";
import { detail_Categories, list_Categories } from "../../Fn_Items/categories";


// product list
export function Query_Items (id? : string | number) {
    const key = id ? ['Product_Key', id] : ['Product_Key'];
    const {data, ...rest} = useQuery({
        queryKey : key,
        queryFn : async () => {
            return id ? await getDetail(id) : await getAll();
        } 
    })
    return {data, ... rest};
}

// paginate item
export function Paginate_Item (page? : number) {
    const {data, ... rest} = useQuery({
        queryKey : ['Product_Key', page],
        queryFn : async () =>  await getAll(page)
    })
    return {data, ...rest}
}

// limit item 
export function Limit_Item (countItem : number) {
    const {data, ...rest} = useQuery({
        queryKey : ['Product_Key', countItem],
        queryFn : async () => await getLimit(countItem)
    })
    return {data, ...rest}
}


// category
export function Query_Category (id? : string | number | undefined) {
    const key = id ? ['Category_Key', id] : ['Category_Key'];
    const {data, ...rest} = useQuery({
        queryKey : key,
        queryFn : async () => {
            return id ? await detail_Categories(id) : await list_Categories();
        }
    })
    return {data, ...rest}
}


// get list item admin
export function Query_List_Items () {
    const {data, ...rest} = useQuery({
        queryKey : ['Product_Key'],
        queryFn : async  () => {
            return await list_All_ITems();
        }
    });
    return {data, ...rest};
}
