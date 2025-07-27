const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['Owner','Renter'],
        default:'Renter',
        required:true
    }
})

module.exports=mongoose.model('User',userSchema);