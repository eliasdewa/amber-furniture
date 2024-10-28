import asyncHandler from "express-async-handler";
import errorHandler from "../middleware/errorHandler.js";
import orderModel from "../models/order.model.js";

// create a order
const createOrder = asyncHandler(async (req, res, next) => {
  const newOrder = await orderModel(req.body)
  const savedOrder = await newOrder.save();
  res.status(201).json({ message: "A new order added", savedOrder});
});

// get order by user email
const getOrderByEmail = asyncHandler(async (req, res, next) => {
  const {email} = req.params;
  const orders = await orderModel.find({email}).sort({createdAt: -1})
  if (!orders) {
    return next(errorHandler("No orders found", 404));
  }
  res.status(200).json(orders);
});
// // get all orders
// const getAllOrders = asyncHandler(async (req, res, next) => {
//   const orders = await orderModel.find({}).sort({createdAt: -1});
//   res.status(200).json({success: true, orders});
// });

// // get a single order
// const getSingleOrder = asyncHandler(async (req, res, next) => {
//   const orderId = req.params.id;
//   const order = await orderModel.findById(orderId).populate("author", "name email");
//   if (!order) {
//     return next(errorHandler("Order not found"), 404);
//   }
//   const reviews = await reviewModel.find({orderId}).populate("userId", "name email")
//   res.status(200).json({order, reviews});
// });

// // update a single order
// const updateOrder = asyncHandler(async (req, res, next) => {
//   const orderId = req.params.id;
//   const updatedOrder = await orderModel.findByIdAndUpdate(orderId, {...req.body}, {new: true});
//   if (!updatedOrder) {
//     return next(errorHandler("Order not found"), 404);
//   }
//   res.status(200).json({message: "Order updated successfully", updatedOrder});
// });

// // delete a order
// const deleteOrder = asyncHandler(async (req, res, next) => {
//   const orderId = req.params.id;
//   const deletedOrder = await orderModel.findByIdAndDelete(orderId);
//   if (!deletedOrder) {
//     return next(errorHandler("Order not found"), 404);
//   }
//   // delete reviews related to the order
//   await reviewModel.deleteMany({ orderId });
//   res.status(200).json({ message: "Order deleted successfully", deletedOrder});
// });

// // get related orders
// const getRelatedOrders = asyncHandler(async (req, res, next) => {
//   const orderId = req.params.id;
//   if (!orderId) {
//     return next(errorHandler("Order ID is required", 400));
//   }
//   const order = await orderModel.findById(orderId);
//   if (!order) {
//     return next(errorHandler("Order not found", 404));
//   }
//   const titleRegex = new RegExp(
//     order.name.split(" ").filter(word => word.length > 1).join("|"), "i"
//   );
//   const relatedOrders = await orderModel.find({
//     _id: { $ne: orderId }, // exclude the current order
//     $or: [
//       {name: {$regex: titleRegex}}, // match similar names
//       {category: order.category} // match similar categories
//     ]
//   }).limit(6);
//   res.status(200).json(relatedOrders);
// });

export { createOrder, getOrderByEmail };