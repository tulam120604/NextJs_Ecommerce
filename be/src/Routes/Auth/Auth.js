import express from 'express';
import { create_Account } from '../../Controllers/Auth/create';
import { Login } from '../../Controllers/Auth/login';
import { list_Account } from '../../Controllers/Auth/get';
import { middleWare } from '../../middleware/Auth';

const RoutesAuth = express.Router();
RoutesAuth.get('/account' , middleWare ,list_Account)
RoutesAuth.post('/register', create_Account);
RoutesAuth.post('/login', Login);


export default RoutesAuth