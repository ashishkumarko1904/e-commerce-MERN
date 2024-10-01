import User from "../models/user.model.js"
import jwt from "jsonwebtoken";
import {redis} from "../lib/redis.js";

//function for generating the  access and refresh token with jwt
const generateTokens =(userId)=>{
    const accessToken = jwt.sign({userId},process.env.ACCESS_TOKEN_SECRET,{
        expiresIn:"15m",
    });
    const refreshToken = jwt.sign({userId},process.env.REFRESH_TOKEN_SECRET,{
        expiresIn:"7d",
    });
    return {accessToken,refreshToken};
};


const storeRefreshToken = async(userId,refreshToken)=>{
    await redis.set(`refreshtoken:${userId}`,refreshToken,"EX",7*24*60*60);//7days
}

const setCookies=(res,accessToken,refreshToken)=>{
    res.cookie("accessToken",accessToken,{
        httpOnly:true, //prevent xss attacks
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict", //prevent csrf attacks
        maxAge:15*60*1000,
    });

    res.cookie("refreshToken",refreshToken,{
        httpOnly:true, //prevent xss attacks
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict", //prevent csrf attacks
        maxAge:7*24*60*60*1000, //7days
    });

}

//the controller function for the signup route 

export const signup = async (req,res)=>{
    const {email,password,name} = req.body;

    try {
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400).json({message:"user already exist"});
    }
    
    const user = await User.create({name,email,password});
    
     //authenticate 

     const {accessToken,refreshToken} = generateTokens(user._id);
     //store them on redis 
     await storeRefreshToken(user._id,refreshToken);
     //set them into cookies 
     setCookies(res,accessToken,refreshToken);

    res.status(201).json({user:{
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role
    },message:"user created succesfully"});
    } catch (error) {
        console.log("error in signup controller",error.message);
        res.status(500).json({message:error.message});
    }
}


export const login = async (req,res)=>{
   try {
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(user && (await user.comparePassword(password))){
        const {accessToken,refreshToken} = generateTokens(user._id);
        await storeRefreshToken(user._id,refreshToken);
        setCookies(res,accessToken,refreshToken);
        res.json({
            _id:user._id,
            name:user.name,
            email:user.email,
            role:user.role,
        });
    }
    else{
        res.status(400).json({
            message:"invalid email or password"});
    } 
   } catch (error) {
    console.log("error in login controller",error.message);
    res.status(500).json({message:error.message});
   }



}


export const logout = async (req,res)=>{
    try {
        const refreshToken = req.cookies.refreshToken;
        if(refreshToken){
            const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET)
            await redis.del(`refreshtoken:${decoded.userId}`);
        }
        res.clearCookie("accessToken");
        res.clearCookie("refreshToken");
        res.json({message:"logged out successfully"});
    } catch (error) {
        console.log("error in logout controller",error.message);
     res.status(500).json({message:"server error",error:error.message}); 
    }
}
//refresh the access token 
export const refreshToken = async (req,res)=>{
try {
    const refreshToken = req.cookies.refreshToken;
    if(!refreshToken){
        return res.status(401).json({message:"no refresh token provided"});
    }
    const decoded = jwt.verify(refreshToken,process.env.REFRESH_TOKEN_SECRET);
    const storedToken  = await redis.get(`refresh_token:${decoded.userId}`);
    if(storedToken !== refreshToken){
        return res.status(401).json({message:"Invalid refresh token"});
    }
    const accessToken = jwt.sign({userId:decoded.userId},process.env.ACCESS_TOKEN_SECRET,{expiresIn:"15m"});
    res.cookie("accessToken",accessToken,{
        httpOnly:true,
        secure:process.env.NODE_ENV === "production",
        sameSite:"strict",
        maxAge:15*60*1000,
    });
    res.json({message:"token refreshed successfully"});
} catch (error) {
    console.log("error in refresh token controller",error.message);
    res.status(500).json({message:"server error",error:error.message});
}
}