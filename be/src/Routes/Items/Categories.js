import express from 'express';
import { Get_detail_category, GetAllCategories } from '../../Controllers/Categories/Get';
import { Create_Categories } from '../../Controllers/Categories/Create';
import { AddProductToCategories } from '../../Controllers/Categories/Edit';
import upload from '../../middleware/multer';

const RoutesCategories = express.Router();

RoutesCategories.get('/category', GetAllCategories);
RoutesCategories.get('/category/:id_category', Get_detail_category);
RoutesCategories.post('/category', upload.single('category_img'), Create_Categories);
RoutesCategories.patch('/category/:id' , AddProductToCategories);

export default RoutesCategories;