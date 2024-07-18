import express from 'express';
import { get_attribute } from '../../Controllers/Attribute/get';

const Routes_Attribute = express.Router();

Routes_Attribute.get('/attribute/:id_item', get_attribute)

export default Routes_Attribute