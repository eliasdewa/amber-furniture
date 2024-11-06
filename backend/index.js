import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/errorMiddleware.js";

import productRouter from "./routes/products.route.js";
import orderRouter from "./routes/orders.route.js";
import reviewRouter from "./routes/reviews.route.js";
import emailRouter from "./routes/emailSubscribe.route.js";
import userRouter from "./routes/users.route.js";
import adminRouter from "./stats/admin.stats.js";
import connectCloudinary from "./config/cloudinaryConfig.js";

// app configuration
const app = express();
dotenv.config();
const port = process.env.PORT || 5000;
connectDB(); // Database connection
connectCloudinary(); // Cloudinary connection

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5174"],
    method: ["GET", "POST", "DELETE", "PUT"],
    credentials: true
  })
); // we can access the backend from any frontend

// api endpoint
app.use("/api/products", productRouter);
app.use("/api/orders", orderRouter);
app.use("/api/reviews", reviewRouter);
app.use("/api/emails", emailRouter);
app.use("/api/auth", userRouter);
app.use("/api/admin", adminRouter);

// Error handlers middleware
app.use(errorMiddleware);

// port Listener
app.listen(port, () =>
  console.log(`Server listening on http://localhost:${port}`)
);
