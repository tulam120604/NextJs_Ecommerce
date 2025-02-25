import express from 'express';
import { add_notification, get_notification, send_notification } from '../../Controllers/Notification/Notification_management.js';
import { middleWare_get_user_from_cookie } from '../../middleware/Auth.js';

const RoutesNotification = express.Router();

RoutesNotification.get("/get_message_notification", middleWare_get_user_from_cookie, get_notification);
RoutesNotification.post("/create_notification", middleWare_get_user_from_cookie, add_notification);
RoutesNotification.patch("/send_notification", middleWare_get_user_from_cookie, send_notification);

export default RoutesNotification