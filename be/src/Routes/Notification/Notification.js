import express from 'express';
import { add_notification, get_notification, send_notification } from '../../Controllers/Notification/Options.js';
import { middleWare } from '../../middleware/Auth.js';

const RoutesNotification = express.Router();

RoutesNotification.get("/get_message_notification", middleWare, get_notification);
RoutesNotification.post("/create_notification", middleWare, add_notification);
RoutesNotification.patch("/send_notification", middleWare, send_notification);

export default RoutesNotification