import asyncHandler from "express-async-handler";
import emailModel from "../models/emailSubscribe.model.js";
import errorHandler from "../middleware/errorHandler.js";
import validator from "validator";

// subscribe
export const emailSubscribe = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(errorHandler("Email is required!", 400));
  }
  // Check if email is valid
  if (!validator.isEmail(email)) {
    return next(errorHandler("Please enter a valid email", 400));
  }
  // Check if email is already subscribed
  const existingEmail = await emailModel.findOne({ email });
  if (existingEmail) {
    return next(errorHandler("Email already subscribed", 400));
  }
  const newEmail = new emailModel({ email });
  await newEmail.save();
  res.status(201).json({ message: "Thanks for your subscription!" });
});

// delete subscribed email
export const deleteEmail = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const email = await emailModel.findByIdAndDelete(id);
  if (!email) {
    return next(errorHandler("Email not found", 404));
  }
  res.status(200).json({ message: "Email deleted successfully" });
});

// get all subscribed users
export const getAllSubscribedUsers = asyncHandler(async (req, res, next) => {
  const emails = await emailModel.find({});
  res.status(200).json({ emails });
});
