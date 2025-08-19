import jwt from "jsonwebtoken"
import {User} from "../models/user.model.js"

export const verifyJWT = async (req, _, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            return next(new Error("Unauthorized request"));
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        // NOTE: User model is missing, so this is a placeholder. Replace with your user fetching logic.
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken")
        if (!user) {
            return next(new Error("Invalid Access Token"));
        }
        req.user = user;
        next()
    } catch (error) {
        next(new Error(error?.message || "Invalid access token"));
    }
}