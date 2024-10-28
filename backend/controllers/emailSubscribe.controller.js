import asyncHandler from "express-async-handler";
import emailModel from "../models/emailSubscribe.model.js";
import errorHandler from "../middleware/errorHandler.js";

// create a order
const emailSubscribe = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(errorHandler("Email is required!", 400));
  }
  const existingEmail = await emailModel.findOne({ email });
  if (existingEmail) {
    return next(errorHandler("Email already subscribed", 400));
  }
  const newEmail = new emailModel({ email });
  await newEmail.save();
  res.status(201).json({ message: "Subscribed successfully" });
});

const getAllSubscribedUsers = asyncHandler(async (req, res, next) => {
  const subscribedUsers = await emailModel.find({});
  res.status(200).json({ subscribedUsers });
});

export {emailSubscribe, getAllSubscribedUsers}