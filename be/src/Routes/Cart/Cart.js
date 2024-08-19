import express from 'express';
import {  checked_item_cart, list_carts } from '../../Controllers/Cart/Get';
import { Add_To_Cart, dow_quantity, remove_all_item_cart, remove_item_cart, up_quantity } from '../../Controllers/Cart/Options_Cart';

const RoutesCart = express.Router();

RoutesCart.get('/cart/:user_id', list_carts);
RoutesCart.post('/cart', Add_To_Cart);
RoutesCart.post('/cart/up', up_quantity);
RoutesCart.post('/cart/dow', dow_quantity);
RoutesCart.post('/cart/remove_item_cart', remove_item_cart);
RoutesCart.post('/cart/check_item_cart', checked_item_cart);
RoutesCart.post('/cart/remove_all_item_cart', remove_all_item_cart);


export default RoutesCart;