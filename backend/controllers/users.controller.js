import userModel from "../models/user.model.js";
import errorHandler from "../middleware/errorHandler.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

// Generate token
const generateTokens = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

// Create cookies
const setCookies = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true, // prevent XSS attacks, cross site scripting attack
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict", // prevents CSRF attack, cross-site request forgery attack
    maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
  });
};

// Register new user
export const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const userExists = await userModel.findOne({ email });

    if (userExists) {
      return next(errorHandler("User already exists", 400));
    }

    // Create the user (add validation logic as needed)
    const newUser = new userModel({ username, email, password });
    await newUser.save();

    const token = generateTokens(newUser._id);
    // set token
    setCookies(res, token);

    res.status(201).json({
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        profileImg: newUser.profileImg,
      },
      token,
    });
  } catch (error) {
    console.log("Error in signup controller", error.message);
    next(error);
  }
};

// Login user
export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user || !(await user.comparePassword(password))) {
      return next(errorHandler("Invalid credentials", 400));
    }
    // generate token
    const token = generateTokens(user._id);
    // set the access token
    setCookies(res, token);

    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        profileImg: user.profileImg,
      },
      token,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    next(error);
  }
};
// logout user
export const logoutUser = async (req, res, next) => {
  try {
    res.clearCookie("accessToken");
    res.json({ message: "User logged out successfully" });
  } catch (error) {
    console.log("Error in logout controller", error.message);
    next(error);
  }
};

// get all users
export const getUsers = async (req, res, next) => {
  try {
    const users = await userModel.find({});
    res.status(200).json({ users });
  } catch (error) {
    console.log("Error getting users", error.message);
    next(error);
  }
};

// update user
export const updateUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // Ensure user exists
    const user = await userModel.findById(req.user.id);
    if (!user) {
      return next(errorHandler("User not found", 400));
    }

    // Prepare updated data
    const updatedData = { username, email };
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      updatedData.password = hashedPassword;
    }

    // Handle profile image upload
    if (req.file) {
      // Upload image to Cloudinary
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: "image",
      });
      updatedData.profileImg = result.url;
      // Cleanup: Remove uploaded file from local storage
      fs.unlinkSync(req.file.path);
    }

    // Update user data
    const updatedUser = await userModel.findByIdAndUpdate(
      req.user.id,
      updatedData,
      {
        new: true,
      }
    );

    res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// delete user
export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler("You can delete only your account!", 401));
  }
  try {
    await userModel.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    console.log("Error deleting user", error.message);
    next(error);
  }
};
