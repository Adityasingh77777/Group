const mongoose=require("mongoose");

const roomSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    location:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    roomType:{
        type:String,
        enum:["single","double","triple"]
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    owner:{
         type: mongoose.Schema.Types.ObjectId, 
         ref: 'User' 
        },
    },
    { 
        timestamps: true 
    }
);

module.exports=mongoose.model('Room',roomSchema);