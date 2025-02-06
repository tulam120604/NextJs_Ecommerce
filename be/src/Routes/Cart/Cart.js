import express from 'express';
import { checked_item_cart, list_carts } from '../../Controllers/Cart/Get.js';
import { Add_To_Cart, dow_quantity, remove_all_item_cart, remove_item_cart, up_quantity } from '../../Controllers/Cart/Options_Cart.js';
import { middleWare } from '../../middleware/Auth.js';

const RoutesCart = express.Router();

RoutesCart.get('/list_items_cart', middleWare, list_carts);
RoutesCart.post('/add_to_cart', middleWare, Add_To_Cart);
RoutesCart.post('/cart/up', middleWare, up_quantity);
RoutesCart.post('/cart/dow', middleWare, dow_quantity);
RoutesCart.post('/cart/remove_item_cart', middleWare, remove_item_cart);
RoutesCart.post('/cart/check_item_cart', middleWare, checked_item_cart);
RoutesCart.post('/cart/remove_all_item_cart', middleWare, remove_all_item_cart);


export default RoutesCart;