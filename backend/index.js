import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.route.js';
import userRouter from './routes/user.route.js';
import 'dotenv/config';
import errorMiddleware from './middleware/errorMiddleware.js';
import connectCloudinary from './config/cloudinary.js';

// app configuration
const app = express();
const port = process.env.PORT || 5000
connectDB(); // Database connection
connectCloudinary(); // cloudinary connection

// middleware
app.use(express.json());
app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
  method: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
})); // we can access the backend from any frontend

// api endpoint
app.use("/api/product", productRouter)
app.use("/api/user", userRouter)

// Error handlers middleware
app.use(errorMiddleware);

// port Listener
app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));