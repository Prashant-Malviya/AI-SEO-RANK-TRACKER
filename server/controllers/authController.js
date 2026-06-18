// register user

import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//generate jwt token
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"30d"})
}

const sanitizeUser = (user) => {
    const userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

export const register = async (req, res)=>{

    try {
        
        const {name, email, password} = req.body;

        if(!name || !email || !password)
            return res.status(400).json({success:false, message:"All fields required"});

        if(password.length < 6)
            return res.status(400).json({success:false, message:"Password must be at least 6 characters"});

        if(!process.env.JWT_SECRET)
            return res.status(500).json({success:false, message:"JWT secret is not configured"});

        //Check if user exists

        const normalizedEmail = email.toLowerCase().trim();
        const existingUser = await User.findOne({email: normalizedEmail});

        if(existingUser)
            return res.status(400).json({success:false, message: "User already exists"})

        // hash password

        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt(10));

        //create user
        const user = await User.create({name: name.trim(), email: normalizedEmail, password:hashedPassword})

        const token = generateToken(user._id)

         res.status(201).json({success:true, token, user: sanitizeUser(user)})

    } catch (error) {
        
        console.error("Register error", error.message)

        res.status(500).json({success: false, message: "server error"})
    }
}


export const login = async (req, res)=>{

    try {
        
        const {email, password} = req.body;

        if(!email || !password)
            return res.status(400).json({success:false, message:"All fields required"});

        if(!process.env.JWT_SECRET)
            return res.status(500).json({success:false, message:"JWT secret is not configured"});

        //Check if user exists

        const user = await User.findOne({email: email.toLowerCase().trim()});

        if(!user)
            return res.status(400).json({success:false, message: "Invalid credentials"})

        // check password

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({success: false, message: "Invalid credentials"})
        }

        const token = generateToken(user._id);
        res.status(200).json({success: true, token, user: sanitizeUser(user)})

    } catch (error) {
        
        console.error("Login error", error.message)

        res.status(500).json({success: false, message: "server error"})
    }
}


// get current user

export const getUser = async (req,res)=>{

    try {
        
        const user = await User.findById(req.userId).select("-password");

        if(!user){
            return res.status(400).json({success:false, message: "user not found"})
        }

        res.json({success: true, user})

    } catch (error) {
        
        console.error("Get user error:", error.message);

        res.status(500).json({success:false, message: "server error"})
    }
}
