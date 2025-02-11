import express from 'express';

import {
    create_address, edit_address, get_address,
    remove_address, update_default_address
} from '../../Controllers/Auth/address.js';
import { middleWare_get_user_from_cookie } from '../../middleware/Auth.js';

const RoutesAddress = express.Router();

RoutesAddress.get('/address/get', middleWare_get_user_from_cookie, get_address);
RoutesAddress.post('/address/create', middleWare_get_user_from_cookie, create_address);
RoutesAddress.put('/address/update/', middleWare_get_user_from_cookie, edit_address);
RoutesAddress.patch('/address/update_default_address', middleWare_get_user_from_cookie, update_default_address);
RoutesAddress.delete('/address/remove/:id', remove_address);

export default RoutesAddress