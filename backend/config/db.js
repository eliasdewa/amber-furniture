import mongoose from "mongoose";

// Connect to MongoDB
export const connectDB = async () => {
  await mongoose.connect("mongodb+srv://edwebdev:edWebDev@cluster0.x0tqaxk.mongodb.net/Ambar-furniture?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => console.log('DB connection established'))
};