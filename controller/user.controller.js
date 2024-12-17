import { sendEmail } from "../config/sendEmail.js";
import UserModel from "../model/user.model.js";
import bcryptjs from "bcryptjs"
import { verifyEmailTemplate } from "../utils/verifyEmailTemplate.js";
import { GenerateAccessToken } from "../utils/GenerateAccessToken.js";
import { GenerateRefreshToken } from "../utils/GenerateRefreshToken.js";
import uploadImageCloudinary from "../utils/uploadImageCloudinary.js";
import generatedOtp from "../utils/GeneratedOtp.js";
import forgotPasswordEmailTemplate from "../utils/forgotPasswordEmailTemplate.js";




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
        if (!email || !password) {
            return response.status(400).json({
                message: "provide email, password",
                error: true,
                success: false
            })
        }
        const user = await UserModel.findOne({ email })
        if (!user) {
            return response.status(400).json({
                message: "user not registered",
                error: true,
                success: false,
            })
        }
        if (user.status !== "Active") {
            return response.status(400).json({
                message: "Contact to support tems",
                error: true,
                success: false,
            })
        }

        const checkPassword = await bcryptjs.compare(password, user.password)
        if (!checkPassword) {
            return response.status(400).json({
                message: "Invalid password",
                error: true,
                success: false,
            })
        }


        const accessToken = await GenerateAccessToken(user._id)
        const refreshToken = await GenerateRefreshToken(user._id)

        const cookieOptions = {

            httpOnly: true,
            secure: true,
            someSite: "None"
        }
        response.cookie("accessToken", accessToken, cookieOptions)
        response.cookie("refreshToken", refreshToken, cookieOptions)

        return response.json({
            message: "LogIn Successfully",
            error: false,
            success: true,
            data: {
                accessToken,
                refreshToken
            }
        })
    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })

    }
}





// Login controller End


// LogOut controller start

export async function logoutController(request, response) {
    try {
        const userid = request.userId
        const cookieOptions = {
            httpOnly: true,
            secure: true,
            someSite: "None"
        }
        response.clearCookie("accessToken", cookieOptions)
        response.clearCookie("refreshToken", cookieOptions)


        const removeRefreshToken = await UserModel.findByIdAndUpdate(userid, {
            refresh_token: ""
        })

        return response.json({
            message: "LogOut Successfully",
            error: false,
            success: true,

        })





    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })

    }
}

// LogOut controller End

// Upload Avater start

export async function uploadAvater(request, response) {
    try {

        const userId = request.userId

        const image = request.file
        const upload = await uploadImageCloudinary(image)
        const updateUser = await UserModel.findByIdAndUpdate(userId, {
            avatar: upload.url
        })







        return response.json({
            message: "upload profile",
            data: {
                _id: userId,
                avatar: upload.url
            }
        })








    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,

        })
    }
}
// Upload Avater End



// User update is start 
export async function updateUser(request, response) {
    try {
        const userId = request.userId
        const { name, email, mobile, password } = request.body
        let hashPassword = ""
        if (password) {
            const salt = await bcryptjs.genSalt(10)
            hashPassword = await bcryptjs.hash(password, salt)
        }

        const updateUser = await UserModel.updateOne({ _id: userId }, {
            ...(name && { name: name }),
            ...(email && { email: email }),
            ...(mobile && { mobile: mobile }),
            ...(password && { password: hashPassword })
        })
        return response.json({
            message: "Update user successfully",
            error: false,
            success: true,
            data: updateUser
        })
    } catch (error) {
        message = error.message || error
        error = true,
            success = false
    }
}
// User update is End 

// forgot password controller start 
export async function forgotPasswordController(request, response) {
    try {
        const { email } = request.body;
        const user = await UserModel.findOne({ email })
        if (!user) {
            return response.status(400).json({
                message: "Email not found",
                error: true,
                success: false
            })
        }


        const otp = generatedOtp()
        const expireTime = new Date() + 60 * 60 * 1000
        const update = await UserModel.findByIdAndUpdate(user._id, {
            forgot_password_otp: otp,
            forgot_password_expiry: new Date(expireTime).toISOString(),
        })


        await sendEmail({
            sendTo: email,
            subject: "Forgot Password",
            html: forgotPasswordEmailTemplate({
                name: user.name,
                otp: otp,
            })
        })





        return response.json({
            message: "Otp sent successfully",
            error: false,
            success: true,
        })






    } catch (error) {
        return response.json({
            message: error.message || error,
            error: true,
            success: false,
        })

    }
}
// forgot password controller End 

// otp vrify start
export async function verifyForgotPasswordOtp(request, response) {
    try {
        const { email, otp } = request.body

        if (!email || !otp) {
            return response.status(400).json({
                message: "Provide required field email, otp.",
                error: true,
                success: false
            })
        }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return response.status(400).json({
                message: "Email not available",
                error: true,
                success: false
            })
        }

        const currentTime = new Date().toISOString()

        if (user.forgot_password_expiry < currentTime) {
            return response.status(400).json({
                message: "Otp is expired",
                error: true,
                success: false
            })
        }

        if (otp !== user.forgot_password_otp) {
            return response.status(400).json({
                message: "Invalid otp",
                error: true,
                success: false
            })
        }

        //if otp is not expired
        //otp === user.forgot_password_otp

        const updateUser = await UserModel.findByIdAndUpdate(user?._id, {
            forgot_password_otp: "",
            forgot_password_expiry: ""
        })

        return response.json({
            message: "Verify otp successfully",
            error: false,
            success: true
        })

    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false
        })
    }
}
// otp vrify End 

// reser password start
export async function resertPassword(request, response) {
    try {

        const { email, newPassword, confimPassword } = request.body
        if (!email || !newPassword || !confimPassword) {
            return response.status(400).json({
                message: "provide email, new password and confirm password",

            })
        }

        const user = await UserModel.findOne({ email })

        if (!user) {
            return response.status(400).json({
                message: "Email not found",
                error: true,
                success: false,

            })
        }

        if (newPassword !== confimPassword) {
            return response.status(400).json({
                message: "Password and confirm password not match",
                error: true,
                success: false,

            })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashPassword = await bcryptjs.hash(newPassword, salt)


        const update = await UserModel.findOneAndUpdate(user._id, {
            password: hashPassword,

        })

        return response.json({
            message: "Password reset successfully",
            error: false,
            success: true,
        })



    } catch (error) {
        return response.status(500).json({
            message: error.message || error,
            error: true,
            success: false,
        })
    }
}
// reser password End 

