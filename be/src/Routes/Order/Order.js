import express from 'express';
import {
    view_detail_order, list_item_order_by_user,
    list_item_order_by_shipper,
    list_item_order_by_dashboard
} from '../../Controllers/Order/Get_order.js';
import { middleWare, middleWare_get_user_from_cookie } from '../../middleware/Auth.js';
import {
    buy_again,
    create_Order, view_detail_item_order,
    update_status_order
} from '../../Controllers/Order/Order_management.js';

const Routes_Order = express.Router();

Routes_Order.get('/order_by_user', middleWare_get_user_from_cookie, list_item_order_by_user);
Routes_Order.get('/list_orders', middleWare, list_item_order_by_dashboard);
Routes_Order.get('/detail_order', middleWare_get_user_from_cookie, view_detail_order);
Routes_Order.post('/order/add', middleWare_get_user_from_cookie, create_Order);
Routes_Order.post('/order/buy_again', middleWare_get_user_from_cookie, buy_again);
Routes_Order.patch('/order/update_status', middleWare_get_user_from_cookie, update_status_order);
Routes_Order.get('/order/feedback/:id_item', view_detail_item_order);
// list item by shipper
Routes_Order.get('/item_order_shipper', list_item_order_by_shipper)

export default Routes_Order;