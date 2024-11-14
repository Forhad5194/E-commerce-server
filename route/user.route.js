import { Router } from "express";
import { registerUsercontroller } from "../controller/user.controller.js";

const userRoute = Router();


userRoute.post("/register" ,  registerUsercontroller)

export default userRoute;