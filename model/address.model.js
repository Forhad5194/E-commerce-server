import mongoose from "mongoose";

const addressScheme = new mongoose.Schema({
    address_line : {
        type : String,
        default: ""
    },
    city : {
        type : String,
        default: ""
    },
    state : {
        type : String,
        default: ""
    },
    pincode : {
        type : String,
    
    },
    country : {
        type : String,
     
    },
    mobile: {
        type: Number,
        default: null
    },

} , {
    timestamps: true
})

const AddressModel = mongoose.model("address", addressScheme);

export default AddressModel;