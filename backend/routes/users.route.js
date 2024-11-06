import express from "express";
import { adminLogin, adminLogout, adminRegister, deleteUser, getUsers, loginUser, logoutUser, registerUser, updateUser, updateUserProfile } from "../controllers/users.controller.js";
// import verifyAdminToken from "../middleware/verifyAdminToken.js";

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);

userRouter.post('/logout', logoutUser);

userRouter.get('/users', getUsers);
userRouter.delete('/users/:id', deleteUser);
userRouter.put('/users/:id', updateUser);
userRouter.patch('/edit-profile', updateUserProfile);

userRouter.post("/admin/register", adminRegister);

userRouter.post("/admin/login", adminLogin);

userRouter.post("/admin/logout", adminLogout);

export default userRouter;
