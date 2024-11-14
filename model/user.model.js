import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide the Name"]
    },
    email: {
        type: String,
        required: [true, "Provide the Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Provide the Password"],

    },
    avatar: {
        type: String,
        default: ""
    },
    mobile: {
        type: Number,
        default: null
    },
    refresh_token: {
        type: String,
        default: ""
    },
    verify_Email: {
        type: Boolean,
        default: false
    },
    last_login_date : {
        type: Date,
        default: ""
    },
    status : {
        type: String,
        emun: ["Active" , "Inactive" , "Suspended" ],
        default: "Active"

    },
    address_details: [
        {
            type:  mongoose.Schema.ObjectId,
            ref: "Address"
        }
    ],
    shoping_cart: [
        {
            type:  mongoose.Schema.ObjectId,
            ref: "cartProduct"
        }
    ],
    orderHistory: [
        {
            type:  mongoose.Schema.ObjectId,
            ref: "order"
        }
    ],
    forgot_password_otp : {
        type: String,
        default: null
    },
    forgot_password_expiry : {
        type: Date,
        default: ""
    },
    role : {
        type: String,
        emun: ["ADMIN" , "USER" ],
        default: "USER"
        
    }
    
}, {
    timestamps: true
})


const UserModel = mongoose.model("User" , userSchema )

export default UserModel;