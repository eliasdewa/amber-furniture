import jwt from "jsonwebtoken";
import errorHandler from "./errorHandler.js";
import asyncHandler from "express-async-handler";

const authUser = asyncHandler(async (req, res, next) => {
  // Get token
  const { token } = req.headers
  // Check if token exists
  if (!token) {
    return next(errorHandler("No token, authorization denied", 401));
  }
  // Verify token
  const token_decode = jwt.verify(token, process.env.JWT_SECRET);
  req.body.userId = token_decode.id
  next();
});

export default authUser;