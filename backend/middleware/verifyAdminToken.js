import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import errorHandler from "./errorHandler.js";

const verifyAdminToken = asyncHandler((req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return next(errorHandler("Not authorized, token is required"), 401);
  }
  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      return next(errorHandler("Invalid token"), 401);
    }
    req.user = user;
    next();
  });
});

export default verifyAdminToken;