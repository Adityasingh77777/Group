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

exports.confirmStatus=async(req,res)=>{
    const {bookingId}=req.body;

    if(!bookingId) return res.status(400).json({
        error:"invalid booking Id"
    })

    try{
        const booking=await Booking.findById(bookingId).populate("room");
        if(!booking){
            return res.status(404).json({
                error:"Booking not found"
            })
        }

        if(booking.room.owner.toString() !== req.user.id){
            return res.status(403).json({
                error:"only the owner can confirm the booking"
            })
        }

        booking.status="confirmed";
        await booking.save();
        return res.status(200).json({
            message:"Booking confirmed"
        })
    }catch(err){
        return res.status(500).json({
            error:"Confirmation cancelled"
        })
    }
}
