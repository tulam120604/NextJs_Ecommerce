import express from 'express';
import { Attribute_catalog, Category_attribute } from '../../Controllers/Attribute/index.js';


const Routes_Attribute = express.Router();

// loai thuoc tinh
Routes_Attribute.get('/category_attribute/seller/:id_account', Category_attribute.get_category_attribute);
Routes_Attribute.get('/category_attribute/seller/get_one/:id_account', Category_attribute.get_one_category_attribute);
Routes_Attribute.post('/category_attribute/seller/create/:id_account', Category_attribute.create_category_attribute);
Routes_Attribute.put('/category_attribute/seller/update/:id_account', Category_attribute.update_category_attribute);
Routes_Attribute.delete('/category_attribute/seller/remove/:id_account', Category_attribute.remove_category_attribute);


// thuoc tinh
Routes_Attribute.get('/attribute_catalog/seller/:id_account', Attribute_catalog.get_attribute_catalog);
Routes_Attribute.get('/attribute_catalog/seller/get_one/:id_account', Attribute_catalog.get_one_attribute_catalog);
Routes_Attribute.post('/attribute_catalog/seller/create/:id_account', Attribute_catalog.create_attribute);
Routes_Attribute.put('/attributes_catalog/seller/update/:id_account', Attribute_catalog.update_attribute_catalog);
Routes_Attribute.patch('/attribute_catalog/seller/remove/:id_account', Attribute_catalog.remove_attribute_catalog);


export default Routes_Attribute;