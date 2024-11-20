import   jwt  from "jsonwebtoken";
import UserModel from "../model/user.model.js";


export const GenerateRefreshToken = async(userId) => {
    const token = await jwt.sign({ id: userId }, process.env.REFRESH_TOKEN, { expiresIn: "7d" })


    const updateRefreshToken = await UserModel.updateOne({_id: userId} , {
        refresh_token: token
    })

    return token
};

