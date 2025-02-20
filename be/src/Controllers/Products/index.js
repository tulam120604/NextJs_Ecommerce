import {
    list_product_client, list_product_dashboard, list_product_by_category,
    view_detail_product_client, view_detail_product_dashboard, search_product
} from './Get.js';
import { Create_Product } from './Create.js';
import { Soft_remove } from './Soft_delete.js';
import { destroy_items, get_recycle_items, restore_item } from '../Recycle/Items.js';
import { edit_Product } from './Edit.js';

const Products = {
    list_product_client,
    list_product_dashboard,
    list_product_by_category,
    view_detail_product_client,
    view_detail_product_dashboard,
    search_product,
    Create_Product,
    Soft_remove,
    destroy_items,
    get_recycle_items,
    restore_item,
    edit_Product
};

export default Products