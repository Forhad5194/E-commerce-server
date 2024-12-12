import { Router } from "express";
import { loginController, logoutController, registerUsercontroller, verifyEmailController } from "../controller/user.controller.js";
import auth from "../middleware/auth.js";

const userRoute = Router();


userRoute.post("/register" ,  registerUsercontroller)
userRoute.post("/verify_Email" ,  verifyEmailController)
userRoute.post("/login" ,  loginController)
userRoute.get("/logout" , auth , logoutController)

export default userRoute;