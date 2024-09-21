import express from 'express';
import { get_attribute_catalog } from '../../Controllers/Attribute_catalog/get.js';
import { create_attributes_catalog, create_value_attributes_catalog } from '../../Controllers/Attribute_catalog/create.js';

const Routes_Attribute = express.Router();

Routes_Attribute.get('/attribute/:id_item', get_attribute_catalog);
Routes_Attribute.post('/attributes/create', create_attributes_catalog);
Routes_Attribute.put('/attributes/create_value', create_value_attributes_catalog);

export default Routes_Attribute