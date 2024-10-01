import asyncHandler from "express-async-handler";
import userModel from "../models/user.model.js";

// Add to user cart data
const addToCart = asyncHandler(async (req, res, next) => {
  const { userId, itemId, size } = req.body;
  const userData = await userModel.findById(userId);
  let cartData = await userData.cartData;

  if (cartData[itemId]) {
    if (cartData[itemId][size]) {
      cartData[itemId][size]++;
    } else {
      cartData[itemId][size] = 1;
    }
  } else {
    cartData[itemId] = { };
    cartData[itemId][size] = 1;
  }
  await userModel.findByIdAndUpdate(userId, { cartData });
  res.status(200).json({ success: true, message: "Added to cart" });
});

// update user cart data
const updateCart = asyncHandler(async (req, res, next) => {
  const { userId, itemId, size, quantity } = req.body;
  const userData = await userModel.findById(userId);
  let cartData = await userData.cartData;
  cartData[itemId][size] = quantity;

  await userModel.findByIdAndUpdate(userId, { cartData });
  res.status(200).json({ success: true, message: "Cart updated" });
});

// get user cart data
const getUserCart = asyncHandler(async (req, res, next) => {
  const {userId} = req.body;

  const userData = await userModel.findById(userId);
  let cartData = await userData.cartData;

  res.status(200).json({ success: true, cartData });
});


export { addToCart, getUserCart, updateCart };
