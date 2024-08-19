import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import ConnectDB from './Connect/database';
import RoutesProducts from './Routes/Items/Products';
import RoutesCategories from './Routes/Items/Categories';
import RoutesAuth from './Routes/Auth/Auth';
import RoutesCart from './Routes/Cart/Cart';
import Routes_upload from './Routes/upload';
import Routes_Order from './Routes/Order/Order';
import Routes_Attribute from './Routes/Attribute/Attribute';
import RoutesFeedback from './Routes/Feedback/Feedback';
import RoutesNotification from './Routes/Notification/Notification';
import { handle_socket_event } from './socket/handle_socket';
import { createServer } from 'node:http'
import { Server } from 'socket.io';
import RoutesAddress from './Routes/Auth/Address';
import RoutesPayment from './Routes/Payment/Payment';

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

// feedback
app.use('/v1', RoutesFeedback);

// notification
app.use('/v1', RoutesNotification)

// address 
app.use('/v1', RoutesAddress)

// payment
app.use('/v1', RoutesPayment)


// web socket
const server = createServer(app)
const io = new Server(server, {
    cors: {
        origin: process.env.HOST_SOCKET,
    }
});

handle_socket_event(io)

server.listen(process.env.PORT_SOCKET, () => {
    console.log('server running!');
})


export const viteNodeApp = app;