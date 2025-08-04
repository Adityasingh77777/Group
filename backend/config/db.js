require("dotenv").config()

const mongoose = require('mongoose');

async function connectDB(){
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log("Database Connected Successfully")
    }
    catch(err){
        console.log("mongoDB connection error:",err);
        process.exit(1);
    }
}

module.exports=connectDB
