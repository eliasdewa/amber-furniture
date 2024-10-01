import asyncHandler from "express-async-handler";
import orderModel from "../models/order.model.js";
import userModel from "../models/user.model.js";

// Place orders using COD(cash on delivery) method
const placeOrder = asyncHandler(async (res, req, next) => {
  const { userId, items, amount, address } = req.body;
  // Place order using COD method (for demonstration purposes)
  const orderData = {
    userId,
    items,
    amount,
    address,
    paymentMethod: "cash",
    payment: false,
    date: Date.now(),
  };
  const newOrder = new orderModel(orderData);
  await newOrder.save();
  // create cart data
  await userModel.findByIdAndUpdate(userId, { cartData: {}})
  res.status(201).json({ success: true, message: "Order placed successfully" });
});
// Place order using Telebirr method
const placeOrderTelebirr = asyncHandler(async (res, req, next) => {
  
});
// Place order using CBEbirr method
const placeOrderCbebirr = asyncHandler(async (res, req, next) => {
  
});
// All orders data for admin panel
const allOrders = asyncHandler(async (res, req, next) => {
  const orders = await orderModel.find({});
  res.status(200).json({ success: true, orders });
});
 // User orders data
const userOrders = asyncHandler(async (res, req, next) => {
  const { userId } = req.body;
  const orders = await orderModel.find({userId});
  res.status(200).json({ success: true, orders });
});
 // Update order status from admin panel
const updateStatus = asyncHandler(async (res, req, next) => {
  const { orderId, status } = req.body;
  await orderModel.findByIdAndUpdate(orderId, {status});
  res.status(200).json({ success: true, message: "Order status updated" });
});

export { placeOrder, placeOrderCbebirr, placeOrderTelebirr, allOrders, userOrders, updateStatus };