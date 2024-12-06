import asyncHandler from "express-async-handler";
import userModel from "../models/user.model.js";
import errorHandler from "../middleware/errorHandler.js";
import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "3h",
  });
};

const setCookies = (res, accessToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
    maxAge: 3 * 60 * 60 * 1000, // 3 hr
  });
};

// Register new user
export const registerUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await userModel.create({ username, email, password });

    // authenticate
    const accessToken = generateTokens(user._id);
    // set token
    setCookies(res, accessToken);

    res.status(201).json({
      message: "User registered successfully",
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    res.status(500).json({ message: error.message });
  }
};

// Login user
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      res.status(400).json({ message: "Invalid email or password" });
    }
    // generate token
    const accessToken = generateTokens(user._id);
    // set the access token
    setCookies(res, accessToken);

    res.json({
      message: "User logged in successfully",
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ message: error.message });
  }
};
// logout user
export const logoutUser = async (req, res) => {
  try {
    res.clearCookie("accessToken");
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
// get profile
export const getProfile = async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// get all users
export const getUsers = asyncHandler(async (req, res, next) => {
  const users = await userModel.find({});
  res.status(200).json({ users });
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
  res.status(200).json({ message: "User role updated successfully" });
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
  res.status(200).json({
    message: "User profile updated successfully",
    user: {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profileImage,
      bio: user.bio,
      profession: user.profession,
    },
  });
});
