import uploadImageOnCloudinary from "../config/cloudinary.js"
import generateToken from "../config/token.js"
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"
export const signup=async(req,res)=>{
    try {
        const {firstName,lastName,email,password,userName}=req.body
        if(!firstName||!lastName||!email||!password||!userName){
            return res.status(400).json({"message":"send all details"})
        }
        //image
        
        //console.log("Multer file:",req.file);
        let profileimage;
        if(req.file){
            profileimage=await uploadImageOnCloudinary(req.file.path);
        }
        console.log("Cloudinary URL:",profileimage);
        
        
        //chech if user already exist!![username or email]
        let existingUser=await User.findOne({email})
        if(existingUser){
            return res.status(400).json({"message":"user already exist"})
        }
        //password hashing
        const hassedPassword=await bcrypt.hash(password,10)
        //user create
        const user=await User.create({
            firstName:firstName,
            lastName:lastName,
            email:email,
            password:hassedPassword,
            userName:userName,
            profileimage:profileimage
        })
        //generate token
        let token;
        try {
            token=generateToken(user._id)
        } catch (error) {
            console.log(error);
            
        }
        //cookie create
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT=="production",
            sameSite:"strict",
            maxAge:7*24*60*60*1000
        })
        //cookie parser middleware
        return res.status(201).json({user:{
            firstName,
            lastName,
            email,
            userName,
            profileimage
        }})

    } catch (error) {
        return res.status(500).json({"message":"Internal server error"})
    }
}
export const login=async (req,res)=>{
    try {
        const {email,password}=req.body
        let existingUser=await User.findOne({email})
        if(!existingUser){
            return res.status(400).json({"message":"user doent exist"})
        }
        let match=await bcrypt.compare(password,existingUser.password)
        if(!match){
            return res.status(400).json({"message":"incorrect password"})
        }
        //token generate
        let token;
        try {
            token=generateToken(existingUser._id)
        } catch (error) {
            console.log(error);
            
        }
        //cookie create
        res.cookie("token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENVIRONMENT=="production",
            //samesite..check..in production its nun
            sameSite:"strict",
            maxAge:7*24*60*60*1000//in miliseconds
        })
        return res.status(200).json({user:{
            firstName:existingUser.firstName,
            lastName:existingUser.lastName,
            email:existingUser.email,
            userName:existingUser.userName
        }})
    } catch (error) {
        return res.status(500).json(error)
    }
}
//no cookies means logout
export const logout =async (req,res)=>{
    try {
        res.clearCookie("token")
        return res.status(200).json({"meassgae":"logout successfully"})
    } catch (error) {
        return res.status(500).json(error)
    }
}