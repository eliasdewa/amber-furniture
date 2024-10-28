import errorHandler from "./errorHandler.js";

const verifyAdmin = (req, res, next) => {
  if (req.role!== "admin") {
    return next(errorHandler("Unauthorized access", 403));
  }
  next();
};

export default verifyAdmin;