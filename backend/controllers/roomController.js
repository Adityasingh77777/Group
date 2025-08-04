const Room=require('../models/Room');
const User=require('../models/User');

exports.createRoom=async(req,res)=>{

    // console.log("Headers:",req.headers);
    // console.log("Body:",req.body);

    const {title,description,price,location,roomType,contactNo} = req.body;
    // console.log(title);

    if (!title || !description || !price || !location || !roomType || !contactNo) {
    return res.status(400).json({
      error: 'All fields are required'
    });
  }

    if(req.user.role!=='owner'){
        return res.status(403).json({
            error:'Only owner can create room'
        })
    }

    try{

        const room=new Room({
            title,
            description,
            price,
            location,
            roomType,
            owner:req.user.id,
            contactNo
        })

        await room.save()

        return res.status(200).json({
            message:"Room created Successfully",
            room
        })
        
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            error:"Room Creation Failed"
        })
    }
}

exports.getRoom=async(req,res)=>{
    try{
        const rooms=await Room.find();

        return res.json({
            success:true,
            requestedBy:req.user.email,
            data:rooms
        })

    }catch(err){
        return res.status(500).json({
            error:"Owner can't see anyone's rooms"
        })
    }
}