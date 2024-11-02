import asyncHandler from "express-async-handler";
import errorHandler from "../middleware/errorHandler.js";
import orderModel from "../models/order.model.js";

// create a order
export const createOrder = asyncHandler(async (req, res, next) => {
  const newOrder = await orderModel(req.body)
  const savedOrder = await newOrder.save();
  res.status(201).json({ message: "A new order added", savedOrder});
});
// get order by user email
export const getOrderByEmail = asyncHandler(async (req, res, next) => {
  const {email} = req.params;
  const orders = await orderModel.find({email}).sort({createdAt: -1})
  if (!orders) {
    return next(errorHandler("No orders found", 404));
  }
  res.status(200).json(orders);
});

// get all orders
export const getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await orderModel.find().sort({createdAt: -1});
  res.status(200).json(orders);
});