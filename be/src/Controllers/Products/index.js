import {
    get_Detail_Client, get_Detail_Dashboard, get_item_by_category,
    get_Item_Client, get_Item_Dashboard, search_Item
} from './Get.js';
import { Create_Product } from './Create.js';
import { Soft_remove } from './Soft_delete.js';
import { destroy_items, get_recycle_items, restore_item } from '../Recycle/Items.js';
import { edit_Product } from './Edit.js';

const Products = {
    get_Detail_Client,
    get_Detail_Dashboard,
    get_item_by_category,
    get_Item_Client,
    get_Item_Dashboard,
    search_Item,
    Create_Product,
    Soft_remove,
    destroy_items,
    get_recycle_items,
    restore_item,
    edit_Product
};

export default Products