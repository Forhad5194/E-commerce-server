import UserModel from "../model/user.model.js";
import bcryptjs from "bcryptjs"




export async function registerUsercontroller(req , res) {
    try {
         const { name, email, password } = req.body;
         if(!name || !email || !password) {
             return res.status(400).json({
                 message: "All fields are required",
                 error: true ,
                 success: false, 
             })
         }
         const user = await UserModel.findOne({email})
         if(user) {
            return res.json({
                message: "Email already exists",
                error: true ,
                success: false, 
 
            })
         }
         const salt = await bcryptjs.getSalt(10) 
         const hashPassword = await bcryptjs.hash(password, salt)

         const payload = {
             name,
             email,
             password: hashPassword,
         }

         const newUser = new UserModel(payload)
         const save = await newUser.save();





    } catch (error) {
            return res.status(500).json({
                message: error.message || error ,
                error: true ,
                success: false, 
             
            })      
    }
}