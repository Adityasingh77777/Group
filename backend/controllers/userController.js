const User = require("../models/User");

exports.users = async(req,res)=>{
    try{
        const users=await User.find().select("-password");

        return res.json({
            success:true,
            requestedBy:req.user.email,
            data:users
        })

    }catch(err){
        return res.status(500).json({
            error:"Failed to Fetch user"
        })
    }
};