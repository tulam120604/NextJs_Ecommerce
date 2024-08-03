import express from 'express';
import { get_detail_user, list_Account } from '../../Controllers/Auth/get';
import { middleWare } from '../../middleware/Auth';
import { create_Account, Login } from '../../Controllers/Auth/options';

const RoutesAuth = express.Router();
RoutesAuth.get('/account' , middleWare ,list_Account)
RoutesAuth.get('/infor/:id', get_detail_user)
RoutesAuth.post('/register', create_Account);
RoutesAuth.post('/login', Login);


export default RoutesAuth