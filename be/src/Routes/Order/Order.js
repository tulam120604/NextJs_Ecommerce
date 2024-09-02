import express from 'express';
import {
    detail_order, get_all_Order, get_Order_User,
    list_item_order_by_seller,
    list_item_order_by_shipper
} from '../../Controllers/Order/Order.js';
import { middleWare } from '../../middleware/Auth.js';
import {
    create_Order, get_detail_item_order, restore_buy_item_order,
    update_status_order
} from '../../Controllers/Order/Options.js';

const Routes_Order = express.Router();

Routes_Order.get('/order/:user_id', get_Order_User);
Routes_Order.get('/list_orders', middleWare, get_all_Order);
Routes_Order.get('/detail_order', detail_order);
Routes_Order.post('/order/add', create_Order);
Routes_Order.post('/order/restore_buy_item', restore_buy_item_order);
Routes_Order.patch('/order/update_status/:user_id', update_status_order);
Routes_Order.get('/order/feedback/:id_item', get_detail_item_order);
Routes_Order.get('/list_order_seller/:id_seller', middleWare, list_item_order_by_seller);
// list item by shipper
Routes_Order.get('/item_order_shipper', list_item_order_by_shipper)

export default Routes_Order;