import mongoose from "mongoose";


const cartProductSchema = new mongoose.Schema({
    productld: {
        type: mongoose.Schema.ObjectId,
        ref: 'product'
    },
    quntity: {
        type: Number,
        default: 1
    },
    userld : {
     type: mongoose.Schema.ObjectId,
     ref: 'User' 
    }
} , {
    timestamps: true
})

const CartProductModel = mongoose.model("cartProduct" , cartProductSchema)

export default CartProductModel;