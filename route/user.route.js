import { Router } from "express";
import { forgotPasswordController, loginController, logoutController, registerUsercontroller, resertPassword, updateUser, uploadAvater, verifyEmailController, verifyForgotPasswordOtp } from "../controller/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRoute = Router();


userRoute.post("/register" ,  registerUsercontroller)
userRoute.post("/verify_Email" ,  verifyEmailController)
userRoute.post("/login" ,  loginController)
userRoute.get("/logout" , auth , logoutController)
userRoute.put('/upload-avatar',auth,upload.single("avatar"),uploadAvater)
userRoute.put('/update-user' , auth, updateUser)
userRoute.put("/forgot-password" , forgotPasswordController)
userRoute.put("/verify-forgot-password-otp" , verifyForgotPasswordOtp)
userRoute.put("/reset-password" , resertPassword)

export default userRoute;