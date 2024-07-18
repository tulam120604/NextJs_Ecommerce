import express from 'express';
import { create_Order, get_all_Order, get_Order_User } from '../../Controllers/Order/Order';

const Routes_Order = express.Router();

Routes_Order.get('/order/:user_id', get_Order_User);
Routes_Order.get('/order/all', get_all_Order);
Routes_Order.post('/order/add', create_Order);

export default Routes_Order;