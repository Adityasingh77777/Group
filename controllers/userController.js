const User = require("../models/User");
const jwt = require("jsonwebtoken");


exports.users = async(req,res)=>{
    try{
        const {token} = req.body;
        if(jwt.verify(token, process.env.JWT_SECRET)) {
            const users= await User.find();
            return res.json(users);
        }
    }catch(err){
        return res.status(500).json({
            error:"Failed to Fetch user"
        })
    }
};