import express from 'express';
import { get_attribute_catalog, get_attribute_catalog_by_user } from '../../Controllers/Attribute_catalog/get.js';
import { create_attributes_catalog, create_value_attributes_catalog } from '../../Controllers/Attribute_catalog/create.js';
import { remove_attribute_catalog } from '../../Controllers/Attribute_catalog/remove.js';

const Routes_Attribute = express.Router();

Routes_Attribute.get('/attribute_catalog/seller/:id_account', get_attribute_catalog_by_user);
Routes_Attribute.get('/attribute_catalog/:id_item', get_attribute_catalog);
Routes_Attribute.post('/attribute_catalog/create', create_attributes_catalog);
Routes_Attribute.put('/attributes_catalog/create_value', create_value_attributes_catalog);
Routes_Attribute.patch('/attribute_catalog/remove/:id_account', remove_attribute_catalog);

export default Routes_Attribute;