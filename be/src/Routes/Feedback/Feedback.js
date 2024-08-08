import express from 'express';
import { add_feedback, get_feedback_detail_item } from '../../Controllers/Feedbacks/Options';

const RoutesFeedback = express.Router();

RoutesFeedback.post('/feedback', add_feedback);
RoutesFeedback.get('/feedback/detail_item/:id_item', get_feedback_detail_item);

export default RoutesFeedback
