import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import { cannect } from "./config/cannectDB.js";


const app = express(cors({
    origin: "process.env.FONTENT_URL",
    credentials: true
}));

app.use(express.json());
app.use(cookieParser());
app.use(morgan())
app.use(helmet({
    contentSecurityPolicy: false,
}))

const PORT = 8080 || process.env.PORT

app.get("/" , (req , res) => {
    res.json({ message: "Hello World. I am a new server ." })
})



cannect().then( () => {
    app.listen(PORT , () => {
        console.log(`Server running on port ${PORT}`);
    })
});


