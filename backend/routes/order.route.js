import express from 'express';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/authUser.js';
import { allOrders, placeOrder, placeOrderCbebirr, placeOrderTelebirr, updateStatus, userOrders } from '../controllers/order.controller.js';

const orderRouter = express.Router();
// Admin Features
orderRouter.post('/list', adminAuth, allOrders);
orderRouter.post('/status', adminAuth, updateStatus);
// Payment Features
orderRouter.post('/place', authUser, placeOrder);
orderRouter.post('/telebirr', authUser, placeOrderTelebirr);
orderRouter.post('/cbebirr', authUser, placeOrderCbebirr);
// User features
orderRouter.post('/userorders', authUser, userOrders);

export default orderRouter;