import asyncHandler from "express-async-handler";
import userModel from "../models/user.model.js";
import errorHandler from "../middleware/errorHandler.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import validator from "validator";

// User registration
export const adminRegister = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(errorHandler("All fields are required!", 400));
  }

  if (!validator.isLength(username, { min: 3, max: 12 })) {
    return next(errorHandler("UserName must be between 3 and 12 characters", 400));
  }
  if (!validator.isEmail(email)) {
    return next(errorHandler("Please enter a valid email", 400));
  }
  if (!validator.isLength(password, { min: 8, max: 30 })) {
    return next(
      errorHandler("Password must be between 8 and 30 characters", 400)
    );
  }

  const adminExist = await userModel.findOne({ email });
  if (adminExist) {
    return next(errorHandler("Admin already exist!", 400));
  }

  // hashed the password
  const hashedPassword = bcrypt.hash(password, 10);

  const newAdmin = await userModel.create({
    username,
    email,
    password: hashedPassword,
    role: "admin",
  });
  await newAdmin.save();
  res.status(200).json({ message: "Admin registered successfully" });
});
// admin login
export const adminLogin = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(errorHandler("All fields are required!", 400));
  }
  const admin = await userModel.findOne({ email });
  if (!admin) {
    return next(errorHandler("Admin not found", 404));
  }
  // check the password is correct or not
  const validPassword = bcrypt.compare(password, admin.password);
  if (!validPassword) {
    return next(errorHandler("Invalid password", 404));
  }
  if (admin.role !== "admin") {
    return next(errorHandler("User not authorized", 403));
  }
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  return res
    .status(200)
    .cookie("token", token, {
      expiresIn: "1h",
    })
    .json({
      message: "Admin logged in successful",
      token: token,
      adminUser: {
        username: admin.username,
        email: admin.email,
      }
    });
});
// admin logout
export const adminLogout = asyncHandler(async (req, res, next) => {
  res
    .status(201)
    .clearCookie("token")
    .json({ message: "Admin logged out successfully." });
});

// Register new user
export const registerUser = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  // Validate the data
  if (!username || !email || !password) {
    return next(errorHandler("All fields are required!", 400));
  }
  if (!validator.isLength(username, { min: 3, max: 12 })) {
    return next(errorHandler("UserName must be between 3 and 12 characters", 400));
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
  const userExist = await userModel.findOne({ email });
  if (userExist) {
    return next(errorHandler("Email already exists", 400));
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create new user
  const newUser = new userModel({
    username,
    email,
    password: hashedPassword,
  });
  // save new user
  const user = await newUser.save();
  res
    .status(201)
    .json({ message: "User registered successfully", user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    }});
});

// Login user
export const loginUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  // Validate the data
  if (!email || !password) {
    return next(errorHandler("All fields are required!", 400));
  }
  // Check if user exists
  const user = await userModel.findOne({ email });
  if (!user) {
    return next(errorHandler("User doesn't exist", 404));
  }
  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return next(errorHandler("Invalid Credentials", 400));
  }
  // Generate and send JWT token
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
 // Set the token in the cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "None",
  });
  res.status(200).json({
    message: "User logged in successfully",
    token,
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});

// Logout user
export const logoutUser = asyncHandler(async (req, res, next) => {
  res.clearCookie("token");
  res.status(200).json({ message: "User logged out successfully" });
});

// get all users
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel
    .find({}, "id username email role")
    .sort({ createdAt: -1 });
  res.status(200).json(users);
});

// delete user
export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findByIdAndDelete(id);
  if (!user) {
    return next(errorHandler("User not found", 404));
  }
  res.status(200).json({ message: "User deleted successfully" });
});

// update user role
export const updateUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { role } = req.body;
  const user = await userModel.findByIdAndUpdate(id, { role }, { new: true });
  if (!user) {
    return next(errorHandler("User not found", 404));
  }
  res.status(200).json({ message: "User role updated successfully"});
});

// edit or update user profile
export const updateUserProfile = asyncHandler(async (req, res, next) => {
  const { userId, name, profileImage, bio, profession } = req.body;
  if (!userId) {
    return next(errorHandler("User ID is required", 400));
  }
  const user = await userModel.findById(userId);
  if (!user) {
    return next(errorHandler("User not found", 404));
  }
  // update profile
  if (name !== undefined) user.name = name;
  if (profileImage !== undefined) user.profileImage = profileImage;
  if (bio !== undefined) user.bio = bio;
  if (profession !== undefined) user.profession = profession;

  await user.save();
  res.status(200).json({ message: "User profile updated successfully", user: {
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    profileImage: user.profileImage,
    bio: user.bio,
    profession: user.profession,
  }});
});