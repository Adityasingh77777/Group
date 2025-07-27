const jwt=require("jsonwebtoken");

exports.authenticateToken=(req,res,next) =>{
    const authHeader= req.headers["authorization"]
    const token=authHeader && authHeader.split(" ")[1];

    if(!token){
        return res.status(401).json({
            error:"Access denied .No token Provided"
        })
    }

    try{
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decoded
        next();
    }

    catch(err){
        return res.status(500).json({
            error:"Authentication failed"
        })
    }
}