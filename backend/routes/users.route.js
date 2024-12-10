import express from "express";
import { deleteUser, getUsers, loginUser, logoutUser, registerUser, updateUser } from "../controllers/users.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import upload from "../config/multerConfig.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.put('/update-profile', protectRoute, upload.single("image"), updateUser);

// admin routes
userRouter.get('/users', adminRoute, getUsers);
userRouter.delete('/delete/:id', protectRoute, deleteUser);


export default userRouter;
