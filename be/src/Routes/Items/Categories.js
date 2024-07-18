import express from 'express';
import { GetAllCategories } from '../../Controllers/Categories/Get';
import { Create_Categories } from '../../Controllers/Categories/Create';
import { AddProductToCategories } from '../../Controllers/Categories/Edit';

const RoutesCategories = express.Router();

RoutesCategories.get('/category', GetAllCategories);
RoutesCategories.post('/category', Create_Categories);
RoutesCategories.patch('/category/:id' , AddProductToCategories);

export default RoutesCategories;