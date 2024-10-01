import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
export const protectRoute = async (req,res,next)=>{
try {
    const accessToken = req.cookies.accessToken;
    if(!accessToken){
        return res.status(401).json({message:"unauthorized- not access token provided"});
    }
   try {
    const decoded = jwt.verify(accessToken,process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId).select("-password");
    if(!user){
        return res.status(401).json({message:"user not found"});
    }
    // put the user in the req so that we can use it in different functions or middlewares
    req.user = user;
    next();
   } catch (error) {
    if(error.name === "TokenExpiredError"){
        return res.status(401).json({message:"Unauthorized : access-token expired"});
    }
    throw error;
   }
} catch (error) {
    console.log("error in protectroute middleware",error.message);
    return res.status(401).json({message:"unauthorized- invalid access token"});
}
};

//adminRoute()-middleware
export const adminRoute = (req,res,next)=>{
    if(req.user && req.role === "admin"){
        next();
    }
    else{
        return res.status(403).json({message:"Access Denied- admin only"});
    }
}