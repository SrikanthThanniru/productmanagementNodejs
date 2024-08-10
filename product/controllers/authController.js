const User = require("../models/User")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")


exports.register = async (req, res) =>{ 
    const {username, email, password, role} = req.body;

    try{
        const user = new User({username, email, password, role})
        await user.save();
        res.status(201).json({message:"user created successfully"})
    }catch(error){
        res.status(500).json({message:"error creating user:", error})
    }
};



exports.login = async (req, res)=>{
    const {email, password} = req.body

    try{
        const user = await User.findOne({email});
        if(!user) return res.status(400).json({message:"creditinals wrong"});

        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({message:"wrong password"});

        const token = jwt.sign({userId:user.id, role:user.role}, process.env.JWT_SECRET, {expiresIn:"1h"});
        res.status(200).json({token})


    }catch(err){
        res.status(500).json({message:"error login", err})
    }
}