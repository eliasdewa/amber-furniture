import express from "express";
import { deleteUser, getProfile, getUsers, loginUser, logoutUser, registerUser, updateUser, updateUserProfile } from "../controllers/users.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.post('/logout', logoutUser);
userRouter.post('/profile', protectRoute, getProfile);
userRouter.delete('/profile', protectRoute, deleteUser);

// admin routes
userRouter.get('/users', getUsers);
userRouter.delete('/users/:id', deleteUser);

userRouter.put('/users/:id', protectRoute, adminRoute, updateUser);
userRouter.patch('/edit-profile', protectRoute, adminRoute, updateUserProfile);

export default userRouter;
