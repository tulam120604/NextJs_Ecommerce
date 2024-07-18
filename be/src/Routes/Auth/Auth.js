import express from 'express';
import { create_Account } from '../../Controllers/Auth/create';
import { Login } from '../../Controllers/Auth/login';

const RoutesAuth = express.Router();
RoutesAuth.post('/register', create_Account);
RoutesAuth.post('/login', Login);


export default RoutesAuth