import express from 'express';
import { middleWare } from '../../middleware/Auth.js';
import upload from '../../middleware/multer.js';

import Products from '../../Controllers/Products/index.js'

const RoutesProducts = express.Router();

RoutesProducts.get('/products/admin', middleWare, Products.get_Item_Dashboard);
RoutesProducts.get('/products', Products.get_Item_Client);
RoutesProducts.get('/products/search', Products.search_Item);
RoutesProducts.get('/products/category/:category_id', Products.get_item_by_category);
RoutesProducts.get('/products/:id', Products.get_Detail_Client);
RoutesProducts.get('/products/dashboard/:id', Products.get_Detail_Dashboard);
RoutesProducts.post('/create_product', upload.array('gallery'), middleWare, Products.Create_Product);
RoutesProducts.delete('/products/:id', middleWare, Products.Soft_remove);
RoutesProducts.delete('/products/destroy_item/:id', middleWare, Products.destroy_items);
RoutesProducts.put('/products/admin/:id', upload.array('gallery'), middleWare, Products.edit_Product);
RoutesProducts.get('/products/admin/trash', middleWare, Products.get_recycle_items);
RoutesProducts.patch('/products/admin/trash/:id', middleWare, Products.restore_item);
RoutesProducts.get('/products/sellers/:id_user', Products.get_item_by_user);


export default RoutesProducts;