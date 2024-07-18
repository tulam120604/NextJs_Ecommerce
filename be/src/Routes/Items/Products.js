import express from 'express';
import { GetAll_Admin, GetAllClient, GetDetail } from '../../Controllers/Products/Get';
import { Create_Product } from '../../Controllers/Products/Create';
import { middleWare } from '../../middleware/Auth';
import upload from '../../middleware/multer';
import { Soft_remove } from '../../Controllers/Products/Soft_delere';
import { destroy_items, get_recycle_items, restore_item } from '../../Controllers/Recycle/Items';
import { edit_Product } from '../../Controllers/Products/Edit';

const RoutesProducts = express.Router();

RoutesProducts.get('/products/admin', middleWare , GetAll_Admin);
RoutesProducts.get('/products', GetAllClient);
RoutesProducts.get('/products/:id' , GetDetail);
RoutesProducts.post('/products', upload.single('feature_product'), middleWare , Create_Product);
RoutesProducts.delete('/products/:id', middleWare , Soft_remove);
RoutesProducts.delete('/products/destroy_item/:id', middleWare , destroy_items);
RoutesProducts.put('/products/admin/:id',upload.single('feature_product'), middleWare , edit_Product);
RoutesProducts.get('/products/admin/trash', middleWare , get_recycle_items);
RoutesProducts.patch('/products/admin/trash/:id', middleWare , restore_item);


export default RoutesProducts;