import { genToken, genToken1 } from "../config/token.js";
import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import validator from "validator";

export const register=async (req, res) => {
    try{
        const {name, email, password}= req.body;

        const existUser=await User.findOne({email:email});
        if(existUser){
            return res.status(400).json({message:"User already Exists!"});
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({message:"Enter valid email!"});
        }
        if(password.length<6){
            return res.status(400).json({message:"Password length must have atleast 6 character"});
        }
        let hashPassword=await bcrypt.hash(password,10);
        const user = await User.create({name,email,password:hashPassword});
        let token =await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            maxAge: 7*24*60*60*1000,
        });
        return res.status(201).json(user);
    }
    catch (err){
        console.log(err);
    }
}

export const login=async (req, res)=>{
    try{
        let {email, password}= req.body;

        let user=await User.findOne({email:email});

        if(!user){
            return res.status(404).json({message:"User not found!"});
        }
        let isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({message:"Wrong password"});
        }
        let token =await genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            maxAge: 7*24*60*60*1000,
        });
        return res.status(201).json(user);
    }
    catch (err){
        console.log(err);
    }
}

export const logout=async (req, res)=>{
    try{
        res.clearCookie("token");
        return res.status(200).json({message:"User logged out successfully!"});
    }
    catch(e){
        console.log(e);
    }
}

export const googleLogin=async (req, res)=>{
    try{
        let {name,email}=req.body;
        let user=await User.findOne({email:email});
         if(!user){
            user = await User.create({name,email});
        }
        
        let token =genToken(user._id);
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge: 7*24*60*60*1000,
        });
        return res.status(200).json(user);
    }
    catch(e){
        console.log("Google login error",e);
    }
}

export const adminLogin=async (req, res)=>{
    try{
        let {email,password}=req.body;
        if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
            let token =await genToken1(email);
            res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            sameSite:"Strict",
            maxAge: 1*24*60*60*1000,
        });
        return res.status(200).json(token);
        }
        return res.status(400).json({message:"Invalid credentials"})
    }
    catch(e){
        console.log("Admin Login Error",e);
    }
}