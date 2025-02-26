import jwt from "jsonwebtoken";
import User from "../models/User.js";
import bcrypt from "bcryptjs";

export const protectRoute = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
        return res.status(401).json({ 
            success:false,
            message: "Not authorized to access this route - No Token Provided" });
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (!decoded) {
            return res.status(401).json({
                success:false,
                message: "Not authorized to access this route - Invalid Token" });
        }

        const user = await User.findById(decoded.userId);
        if (!user) {
        return res.status(404).json({ message: "No user found with this id" });
        }
        req.user = user;
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error.message);
       if(error instanceof jwt.JsonWebTokenError) {
           return res.status(401).json({ 
               success: false,
               message: "Not authorized to access this route - Invalid Token" });
       }
       else {
           return res.status(500).json({ 
               success: false,
               message: "Something went wrong, please try again" });
    }
    }};