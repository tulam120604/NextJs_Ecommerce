import express from 'express';
const RoutesPayment = express.Router();
import { create_payment, callBack_payment, query_status_order } from '../../Controllers/Payment/Payment';

RoutesPayment.post('/create_payment', create_payment);
RoutesPayment.post('/callback', callBack_payment);
RoutesPayment.post('/query_status_order/:apptransid', query_status_order)

export default RoutesPayment