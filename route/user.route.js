import { Router } from "express";
import { loginController, registerUsercontroller, verifyEmailController } from "../controller/user.controller.js";

const userRoute = Router();


userRoute.post("/register" ,  registerUsercontroller)
userRoute.post("/verify_Email" ,  verifyEmailController)
userRoute.post("/login" ,  loginController)

export default userRoute;