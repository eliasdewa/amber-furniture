import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import errorHandler from "./errorHandler.js";

const adminAuth = asyncHandler(async (req, res, next) => {
  // Get token
  const { token } = req.headers
  // Check if token exists
  if (!token) {
    return next(errorHandler("No token, authorization denied", 401));
  }
  // Verify token
  const token_decode = jwt.verify(token, process.env.JWT_SECRET);
  if (token_decode !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
    return next(errorHandler("Invalid token, authorization denied", 403));
  }
  next();
});

export default adminAuth;