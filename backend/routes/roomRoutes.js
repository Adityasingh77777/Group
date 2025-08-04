const express=require("express");
const router=express.Router();

const {createRoom,getRoom}=require('../controllers/roomController');
const {authenticateToken}=require('../middlewares/authMiddlewares')

router.post('/create',authenticateToken,createRoom);
router.get('/getRoom',authenticateToken,getRoom);

module.exports=router
