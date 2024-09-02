export interface IProduct {
    _id?: string | number,
    short_name?: string | number,
    gallery: string[],
    id_user_seller?: string | number,
    trending?: boolean | string,
    des_product?: string | number,
    category_id?: string | number,
    count_stock?: number | string,
    attributes?: string | number,
    made_in?: string,
    createAt?: string | number,
    updateAt?: string | number,
    deleted?: boolean | string,
}


export interface I_ItemOrder {
    _id?: string | number
    color_item?: string | number,
    price_item?: string | number,
    product_id?: IProduct,
    quantity?: number | string,
    size_attribute_item?: string | number,
    status_feedback?: boolean | string,
    total_price_item?: number | string,
}

export interface IColumns {
    items_order?: I_ItemOrder[];
    code_order?: string;
    infor_user?: { name_user: string };
    date_time?: string;
    status_item_order: number | string;
    _id?: string;
}

export interface I_Infor_User {
    name_user?: string | number,
    address?: string | number,
    phone?: string | number,
    email_user?: string | number
}

export interface I_Order {
    coder?: string | number,
    createdAt?: string | number,
    date_time?: string | number,
    infor_user?: I_Infor_User,
    items_order?: IProduct,
    status_item_order?: number | string,
    updatedAt?: string | number,
    user_id?: string | number,
    _id: string | number,
    code_order?: string | number
}
