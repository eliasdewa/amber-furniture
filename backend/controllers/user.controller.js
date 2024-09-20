import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Create token
const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET)
};

// Register new user
const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  // Validate the data
  if (!validator.isLength(name, { min: 2, max: 30 })) {
    return res.status(400).json({ success: false, message: "Name must be between 2 and 30 characters" });
  }
  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, message: "Invalid email format" });
  }
  if (!validator.isLength(password, { min: 8, max: 50 })) {
    return res.status(400).json({ success: false, message: "Password must be between 8 and 50 characters" });
  }
  // Check if user already exists
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ success: false, message: "Email already exists" });
  }
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
  // Create new user
  const newUser = new userModel({
    name,
    email,
    password: hashedPassword,
  });
  try {
    const user = await newUser.save();
    // Generate and send JWT token
    const token = createToken(user._id);
    res.status(201).json({ success: true, message: "User registered successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to register user" });
  }
};

// Login user
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  // Check if user exists
  const user = await userModel.findOne({ email });
  if (!user) {
    return res.status(401).json({ success: false, message: "User doesn't exist" });
  }
  // Check if password matches
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ success: false, message: "Invalid Credentials" });
  }
  try {
    // Generate and send JWT token
    const token = createToken(user._id);
    res.json({ success: true, message: "Logged in successfully", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Failed to log in user" });
  }
};

export { registerUser, loginUser }