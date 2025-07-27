const User = require("../models/User");
const jwt = require("jsonwebtoken");


exports.users = async(req,res)=>{

    const authHeader=req.headers["authorization"];
    const token=authHeader && authHeader.split(" ")[1];
    
    if(!token){
        return res.status(401).json({
            error:"Access denied . No token Provided"
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET);

        const users=await User.find().select("-password");

        return res.json({
            success:true,
            requestedBy:decoded.email,
            data:users
        })

    }catch(err){
        return res.status(500).json({
            error:"Failed to Fetch user"
        })
    }
};