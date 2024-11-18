import { Router } from "express";
import { registerUsercontroller, verifyEmailController } from "../controller/user.controller.js";

const userRoute = Router();


userRoute.post("/register" ,  registerUsercontroller)
userRoute.post("/verify_Email" ,  verifyEmailController)

export default userRoute;