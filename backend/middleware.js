// const jwt = require("jsonwebtoken");
import jwt from "jsonwebtoken"
// const JWT_SECRET = require("./config");
import { JWT_SECRET } from "./config.js";


export const authMidddleware = async(req,res,next) => {
    console.log("inside middleware")
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(403).json({message: "please login"});
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded =  jwt.verify(token, JWT_SECRET);
        console.log(decoded)
        console.log("after verifying")
        if(decoded.userId){
            req.userId = decoded.userId;
            console.log("id is same")
            next();
        }
    } catch (error) {
        return res.status(403).json({message: "Invalid Token"})
    }
};


// module.exports= {
//     authMidddleware
// }