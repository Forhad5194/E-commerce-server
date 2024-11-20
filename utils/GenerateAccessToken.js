import jwt from "jsonwebtoken"
export const GenerateAccessToken = async (userId) => {

    const token = await jwt.sign({ id: userId }, process.env.ACCESS_TOKEN, { expiresIn: "5h" })

    return token
}