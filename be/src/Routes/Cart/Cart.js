import express from 'express';
import { checked_item_cart, list_carts } from '../../Controllers/Cart/Get_cart.js';
import { Add_To_Cart, dow_quantity, remove_all_item_cart, remove_item_cart, up_quantity } from '../../Controllers/Cart/Cart_management.js';
import { middleWare_get_user_from_cookie } from '../../middleware/Auth.js';

const RoutesCart = express.Router();

RoutesCart.get('/list_items_cart', middleWare_get_user_from_cookie, list_carts);
RoutesCart.post('/add_to_cart', middleWare_get_user_from_cookie, Add_To_Cart);
RoutesCart.post('/cart/up', middleWare_get_user_from_cookie, up_quantity);
RoutesCart.post('/cart/dow', middleWare_get_user_from_cookie, dow_quantity);
RoutesCart.post('/cart/remove_item_cart', middleWare_get_user_from_cookie, remove_item_cart);
RoutesCart.post('/cart/check_item_cart', middleWare_get_user_from_cookie, checked_item_cart);
RoutesCart.post('/cart/remove_all_item_cart', middleWare_get_user_from_cookie, remove_all_item_cart);


export default RoutesCart;