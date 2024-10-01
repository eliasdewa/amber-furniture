import express from 'express';
import { addToCart, getUserCart, updateCart } from '../controllers/cart.controller.js';
import authUser from '../middleware/authUser.js';

const cartRouter = express.Router();

cartRouter.post('/add', authUser, addToCart);
cartRouter.post('/get', authUser, getUserCart);
cartRouter.post('/update', authUser, updateCart);

export default cartRouter;