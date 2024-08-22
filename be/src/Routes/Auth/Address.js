import express from 'express';

import {
    create_address, edit_address, get_address,
    remove_address, update_default_address
} from '../../Controllers/Auth/address.js';

const RoutesAddress = express.Router();

RoutesAddress.get('/address/:user_id', get_address);
RoutesAddress.post('/address/:user_id', create_address);
RoutesAddress.put('/address/edit/:id', edit_address);
RoutesAddress.patch('/address/update_default_address/:id_user', update_default_address);
RoutesAddress.delete('/address/remove/:id', remove_address);

export default RoutesAddress