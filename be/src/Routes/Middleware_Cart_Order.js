import express from 'express';
import { create_Middleware_Cart_Order, get_Middleware_Cart_Order } from '../middleware/Cart_Order';

const Routes_Middleware_Cart_Order = express.Router();

Routes_Middleware_Cart_Order.get('/middleware_cart_order/:user_id', get_Middleware_Cart_Order);
Routes_Middleware_Cart_Order.post('/middleware_cart_order/add_middleware_order', create_Middleware_Cart_Order);

export default Routes_Middleware_Cart_Order