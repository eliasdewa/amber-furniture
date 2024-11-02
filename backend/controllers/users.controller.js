import asyncHandler from "express-async-handler";
import userModel from "../models/user.model.js";
import errorHandler from "../middleware/errorHandler.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

// User registration
export const adminRegister = asyncHandler(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    return next(errorHandler("All fields are required!", 400));
  }

  if (username.length < 3 || username.length > 12) {
    return next(
      errorHandler("Username must be between 4 and 12 characters long", 400)
    );
  }
  if (username.includes(" ")) {
    return next(errorHandler("Username can't contains spaces", 400));
  }
  // email address
  if (!email.toLowerCase().match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
    return next(errorHandler("Invalid email address", 400));
  }
  // Password
  if (password.length < 8) {
    return next(
      errorHandler("Password must contain at least 8 characters!", 400)
    );
  }

  const adminExist = await userModel.findOne({ email });
  if (adminExist) {
    return next(errorHandler("Admin already exist!", 400));
  }

  // hashed the password
  const hashedPassword = bcryptjs.hashSync(password, 10);

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
  const validPassword = bcryptjs.compareSync(password, admin.password);
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
      expiresIn: "2h",
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
