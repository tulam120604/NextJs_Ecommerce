import express from 'express';
import { middleWare } from '../../middleware/Auth.js';
import upload from '../../middleware/multer.js';

import Products from '../../Controllers/Products/index.js'

const RoutesProducts = express.Router();

RoutesProducts.get('/list_products/admin', middleWare, Products.list_product_dashboard);
RoutesProducts.get('/list_products/client', Products.list_product_client);
RoutesProducts.get('/products/search', Products.search_product);
RoutesProducts.get('/products/category/:category_id', Products.list_product_by_category);
RoutesProducts.get('/products/:id', Products.view_detail_product_client);
RoutesProducts.get('/products/dashboard/:id', Products.view_detail_product_dashboard);
RoutesProducts.post('/create_product', upload.array('gallery'), middleWare, Products.Create_Product);
RoutesProducts.delete('/products/admin/soft_delete/:id', middleWare, Products.soft_remove);
RoutesProducts.delete('/products/destroy_item/:id', middleWare, Products.destroy_items);
RoutesProducts.put('/products/admin/:id', upload.array('gallery'), middleWare, Products.edit_Product);
RoutesProducts.get('/products/admin/trash', middleWare, Products.get_recycle_items);
RoutesProducts.patch('/products/admin/restore_item/:id', middleWare, Products.restore_item);


export default RoutesProducts;