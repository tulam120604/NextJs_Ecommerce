import express from 'express';
import Attribute from '../../Controllers/Attribute/index.js';


const Routes_Attribute = express.Router();

Routes_Attribute.get('/attribute_catalog/seller/:id_account', Attribute.get_attribute_catalog);
Routes_Attribute.post('/attribute_catalog/create', Attribute.create_attribute);
Routes_Attribute.put('/attributes_catalog/create_value', Attribute.update_attribute_catalog);
Routes_Attribute.patch('/attribute_catalog/remove/:id_account', Attribute.remove_attribute_catalog);


export default Routes_Attribute;