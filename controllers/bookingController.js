const Booking=require("../models/Booking");
const Room=require('../models/Room');

exports.bookingStatus=async(req,res)=>{


    const {roomId , startDate,endDate}= req.body;

    if(!roomId || !startDate || !endDate) return res.status(400).json({
        error:"all fields are required"
    })

    try{
        const room = await Room.findById(roomId);

        if(!room) return res.status(404).json({
            error:"room not found"
        })

        if(!room.isAvailable){
            return res.status(404).json({
                error:"room is not available"
            })
        }

        const booking = new Booking({
            room:roomId,
            user:req.user.id,
            startDate,
            endDate,
        })

        room.isAvailable=false;
        await room.save()
        await booking.save();

        return res.status(200).json({
            message:"Booked Successfully",
            booking
        })
    }
    catch(err){
        return res.status(500).json({
            error:"Room booking Failed"
        })

    }
}