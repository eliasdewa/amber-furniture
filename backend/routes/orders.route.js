import express from 'express';
import { createOrder, getAllOrders, getOrderByEmail } from '../controllers/order.controller.js';

const orderRouter = express.Router();
// create order
orderRouter.post('/', createOrder);

// get orders by user email
orderRouter.get('/email/:email', getOrderByEmail);

// get all orders
orderRouter.get('/allOrders', getAllOrders);

export default orderRouter;