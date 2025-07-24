import jwt from "jsonwebtoken";

export const generateToken = (userData={}) => {
    try {
        const secretKey = process.env.SECRET;
        const token = jwt.sign(userData, secretKey, {expiresIn: '5m'});
        return token;
    } catch (error) {
        console.log(error);
        throw new Error("No fue posible firmar el token", error);
    }
}