import mongoose from "mongoose";

// Connect to MongoDB
export const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('DB connection established'))
};