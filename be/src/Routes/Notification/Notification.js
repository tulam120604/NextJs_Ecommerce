import express from 'express';
import { add_notification, get_notification, send_notification } from '../../Controllers/Notification/Options';

const RoutesNotification = express.Router();

RoutesNotification.get("/get_message_notification/:sender_id", get_notification);
RoutesNotification.post("/create_notification/:sender_id", add_notification);
RoutesNotification.patch("/send_notification/:sender_id", send_notification);

export default  RoutesNotification