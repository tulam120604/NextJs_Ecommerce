import express from 'express';
import { get_detail_user, list_Account } from '../../Controllers/Auth/get.js';
import { middleWare } from '../../middleware/Auth.js';
import { create_Account, granting_premissions, Login, logout, refesh_token } from '../../Controllers/Auth/options.js';

const RoutesAuth = express.Router();
RoutesAuth.get('/account' , middleWare ,list_Account)
RoutesAuth.get('/infor/:id',middleWare, get_detail_user)
RoutesAuth.get('/inforshop/:id', get_detail_user)
RoutesAuth.post('/register', create_Account);
RoutesAuth.post('/login', Login);
RoutesAuth.post('/granting_premissions',middleWare, granting_premissions);
RoutesAuth.post('/logout', logout);
RoutesAuth.post('/refesh_token', refesh_token);
RoutesAuth.get('/check_token_expired/:id', middleWare , get_detail_user)


export default RoutesAuth