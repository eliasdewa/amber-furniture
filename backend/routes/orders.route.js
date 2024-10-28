import express from 'express';
import { createOrder, getOrderByEmail } from '../controllers/order.controller.js';

const orderRouter = express.Router();
// create order router
orderRouter.post('/', createOrder);

// get orders by user email
orderRouter.get('/email/:email', getOrderByEmail);

export default orderRouter;