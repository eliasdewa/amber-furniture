import asyncHandler from "express-async-handler";
import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";
import errorHandler from "../middleware/errorHandler.js";

// Create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

// Register new user
const registerUser = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;
  // Validate the data
  if (!name || !email || !password) {
    return next(errorHandler("All fields are required!", 400));
  }
  if (!validator.isLength(name, { min: 2, max: 20 })) {
    return next(errorHandler("Name must be between 2 and 20 characters", 400));
  }
  if (!validator.isEmail(email)) {
    return next(errorHandler("Please enter a valid email", 400));
  }
  if (!validator.isLength(password, { min: 8, max: 30 })) {
    return next(
      errorHandler("Password must be between 8 and 30 characters", 400)
    );
  }
  // Check if user already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return next(errorHandler("Email already exists", 400));
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create new user
  const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
  });
  // save new user
  const user = await newUser.save();
  // Generate and send JWT token
  const token = createToken(user._id);
  res
    .status(201)
    .json({ success: true, message: "User registered successfully", token });
});

// Login user
const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Validate the data
  if (!email || !password) {
    return next(errorHandler("All fields are required!", 400));
  }
  // Check if user exists
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(errorHandler("User doesn't exist", 400));
  }
  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(errorHandler("Invalid Credentials", 400));
  }
  // Generate and send JWT token
  const token = createToken(user._id);
  res.json({ success: true, message: "User logged in successfully", token });
});

// Admin Login
const adminLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Validate the data
  if (!email || !password) {
    return next(errorHandler("All fields are required!", 400));
  }
  if (
    email !== process.env.ADMIN_EMAIL &&
    password !== process.env.ADMIN_PASSWORD
  ) {
    return next(errorHandler("Invalid Credentials", 400));
  }
  // Generate and send JWT token
  const token = jwt.sign(email + password, process.env.JWT_SECRET);

  res.json({ success: true, message: "Admin logged in successfully", token });
});

export { registerUser, loginUser, adminLogin };
