import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import productRouter from './routes/product.route.js';
import userRouter from './routes/user.route.js';
import 'dotenv/config';
import errorMiddleware from './middleware/errorMiddleware.js';

// app configuration
const app = express();
const port = 5000

// middleware
app.use(express.json());
app.use(cors({
  origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL],
  method: ["GET", "POST", "DELETE", "PUT"],
  credentials: true,
})); // we can access the backend from any frontend

// Database connection
connectDB();


// api endpoint
app.use("/api/product", productRouter)
app.use("/api/user", userRouter)

// To access the product images on frontend
app.use("/images", express.static('uploads')) //http://localhost:5000/images/imageFilename

// Error handlers middleware
app.use(errorMiddleware);

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));