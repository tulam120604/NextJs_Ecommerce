import express from 'express';
const RoutesPayment = express.Router();
import { create_payment } from '../../Controllers/Payment/payment.js';


RoutesPayment.post('/create_payment', create_payment);

export default RoutesPayment