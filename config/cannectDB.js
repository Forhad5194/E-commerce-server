import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

if(!process.env.MONGODB_URL){
  throw new Error("Missing MONGODB_URL environment variable");    
}


export async function cannect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("mongobd connection error");
        process.exit(1);
        
    }
}