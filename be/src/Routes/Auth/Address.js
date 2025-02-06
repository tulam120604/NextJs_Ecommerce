import express from 'express';

import {
    create_address, edit_address, get_address,
    remove_address, update_default_address
} from '../../Controllers/Auth/address.js';
import { middleWare } from '../../middleware/Auth.js';

const RoutesAddress = express.Router();

RoutesAddress.get('/address/get', middleWare, get_address);
RoutesAddress.post('/address/create', middleWare, create_address);
RoutesAddress.put('/address/update/', middleWare, edit_address);
RoutesAddress.patch('/address/update_default_address', middleWare, update_default_address);
RoutesAddress.delete('/address/remove/:id', remove_address);

export default RoutesAddress