import express from 'express';
import { get_detail_user, list_Account } from '../../Controllers/Auth/get.js';
import { middleWare, middleWare_get_user_from_cookie } from '../../middleware/Auth.js';
import { create_Account, Login, logout, refesh_token, set_role_user_to_seller } from '../../Controllers/Auth/options.js';

const RoutesAuth = express.Router();
RoutesAuth.get('/account', middleWare, list_Account)
RoutesAuth.get('/infor_account', middleWare_get_user_from_cookie, get_detail_user)
RoutesAuth.get('/inforshop/:id', get_detail_user)
RoutesAuth.post('/register', create_Account);
RoutesAuth.post('/login', Login);
RoutesAuth.post('/set_role_user_to_seller', middleWare, set_role_user_to_seller);
RoutesAuth.post('/logout', logout);
RoutesAuth.post('/refesh_token', refesh_token);


export default RoutesAuth