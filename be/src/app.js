import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import  ConnectDB  from './Connect/database';
import RoutesProducts from './Routes/Items/Products';
import RoutesCategories from './Routes/Items/Categories';
import RoutesAuth from './Routes/Auth/Auth';
import RoutesCart from './Routes/Cart/Cart';
import Routes_upload from './Routes/upload';
import Routes_Order from './Routes/Order/Order';
import Routes_Attribute from './Routes/Attribute/Attribute';
dotenv.config();
const app = express();
app.use(express.json());
app.use(cors());

ConnectDB(process.env.DB_MONGO);

// item
app.use('/v1', RoutesProducts);
app.use('/v1', RoutesCategories);

// attribute
app.use('/v1', Routes_Attribute)

// authen
app.use('/v1', RoutesAuth);
app.use('/v1', Routes_upload);

// cart
app.use('/v1', RoutesCart);

// order
app.use('/v1', Routes_Order);


export const viteNodeApp = app;