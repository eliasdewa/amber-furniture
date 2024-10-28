import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import errorHandler from "./errorHandler.js";

// Middleware to verify JWT token
const verifyToken = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;
  // const token = req.headers['authorization'].split(' ')[1];

  if (!token) {
    return next(errorHandler("Not authorized, token is required"), 401);
  }
  const token_decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!token_decoded) {
    return next(errorHandler("Invalid token"), 401);
  }
  req.userId = token_decoded.userId;
  req.role = token_decoded.role;
  next();
});

export default verifyToken;