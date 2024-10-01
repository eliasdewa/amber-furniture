import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.route.js';
import userRouter from './routes/user.route.js';
import dotenv from "dotenv";
import errorMiddleware from './middleware/errorMiddleware.js';
import connectCloudinary from './config/cloudinary.js';
import cartRouter from './routes/cart.route.js';
import orderRouter from './routes/order.route.js';

// app configuration
const app = express();
dotenv.config();
const port = process.env.PORT || 5000
connectDB(); // Database connection
connectCloudinary(); // cloudinary connection

// middleware
app.use(express.json());
app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204,
  "credentials": true,
}));
 // we can access the backend from any frontend

// api endpoint
app.use("/api/product", productRouter)
app.use("/api/user", userRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

// Error handlers middleware
app.use(errorMiddleware);

// port Listener
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));