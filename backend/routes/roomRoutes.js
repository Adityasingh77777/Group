const express=require("express");
const router=express.Router();

const {createRoom,getRoom}=require('../backend/controllers/roomController');
const {authenticateToken}=require('../backend/middlewares/authMiddlewares')

router.post('/create',authenticateToken,createRoom);
router.get('/create',authenticateToken,getRoom);

module.exports=router
