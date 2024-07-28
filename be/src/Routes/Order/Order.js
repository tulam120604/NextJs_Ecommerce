import express from 'express';
import { create_Order, get_all_Order, get_Order_User, restore_buy_item_order, update_status_order } from '../../Controllers/Order/Order';

const Routes_Order = express.Router();

Routes_Order.get('/order/:user_id', get_Order_User);
Routes_Order.get('/order/all', get_all_Order);
Routes_Order.post('/order/add', create_Order);
Routes_Order.post('/order/restore_buy_item', restore_buy_item_order);
Routes_Order.patch('/order/update_status/:user_id', update_status_order);

export default Routes_Order;