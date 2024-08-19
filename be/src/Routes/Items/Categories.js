import express from 'express';
import { Get_detail_category, GetAllCategories } from '../../Controllers/Categories/Get.js';
import { Create_Categories } from '../../Controllers/Categories/Create.js';
import { AddProductToCategories } from '../../Controllers/Categories/Edit.js';
import upload from '../../middleware/multer.js';

const RoutesCategories = express.Router();

RoutesCategories.get('/category', GetAllCategories);
RoutesCategories.get('/category/:id_category', Get_detail_category);
RoutesCategories.post('/category', upload.single('category_img'), Create_Categories);
RoutesCategories.patch('/category/:id' , AddProductToCategories);

export default RoutesCategories;