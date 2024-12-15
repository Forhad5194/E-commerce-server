import { Router } from "express";
import { loginController, logoutController, registerUsercontroller, updateUser, uploadAvater, verifyEmailController } from "../controller/user.controller.js";
import auth from "../middleware/auth.js";
import upload from "../middleware/multer.js";

const userRoute = Router();


userRoute.post("/register" ,  registerUsercontroller)
userRoute.post("/verify_Email" ,  verifyEmailController)
userRoute.post("/login" ,  loginController)
userRoute.get("/logout" , auth , logoutController)
userRoute.put('/upload-avatar',auth,upload.single("avatar"),uploadAvater)
userRoute.put('/update-user' , auth, updateUser)

export default userRoute;