import express from "express";
import { adminLogin, adminLogout, adminRegister } from "../controllers/users.controller.js";
// import verifyAdminToken from "../middleware/verifyAdminToken.js";

const userRouter = express.Router();

userRouter.post("/admin/register", adminRegister);

userRouter.post("/admin/login", adminLogin);

userRouter.post("/admin/logout", adminLogout);

export default userRouter;
