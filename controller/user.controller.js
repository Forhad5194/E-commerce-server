import { sendEmail } from "../config/sendEmail.js";
import UserModel from "../model/user.model.js";
import bcryptjs from "bcryptjs"
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate.js";




export async function registerUsercontroller(request, response) {
    try {
        const { name, email, password } = request.body

        if (!name || !email || !password) {
            return response.status(400).json({
                message: "provide email, name, password",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })

        if (user) {
            return response.json({
                message: "Already register email",
                error: true,
                success: false
            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(password, salt)

        const payload = {
            name,
            email,
            password: hashPassword
        }

        const newUser = new UserModel(payload)
        const save = await newUser.save()

        const VerifyEmailUrl = `${process.env.FONTENT_URL}/verify-email?code=${save?._id}`

        const verifyEmail = await sendEmail({
            sendTo: email,
            subject: "Verify email from binkeyit",
            html: verifyEmailTemplate({
                name,
                url: VerifyEmailUrl
            })
        })

        return response.json({
            message: "User register successfully",
            error: false,
            success: true,
            data: save
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}

//  This is email verification function area  start

export async function verifyEmailController(request, response) {

    try {

        const { code } = request.body;

        const user = await UserModel.findOne({ _id: code })
        if (!user) {
            return response.json({
                message: "Invalid code",
                error: true,
                success: false
            })
        }

        const updateUser = await UserModel.updateOne({ _id: code }, {
            verify_Email: true,
        })


        return response.json({
            message: "Email verified successfully",
            error: false,
            success: true,

        })


    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: true,
        })


    }
}



//  This is email verification function area  end




// Login controller start

export async function loginController(request, response) {
        try {

            const { email, password } = request.body;
            const user = await UserModel.findOne({email})
            if(!user) {
                return response.status(400).json({
                    message: "user not registered",
                    error: true,
                    success: false,
                })
            }
                if(user.status !== "Active") {
                     return response.status(400).json({
                         message: "Contact to support tems",
                         error: true,
                         success: false,
                     })
                }

                const checkPassword = await bcryptjs.compare(password, user.password)
                if(!checkPassword) {
                    return response.status(400).json({
                        message: "Invalid password",
                        error: true,
                        success: false,
                    })
                }





















        } catch (error) {
            return response.status(500).json({
                message: error.message || error,
                error: true,
                success: false,
            })
            
        }
}





// Login controller End