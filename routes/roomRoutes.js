const express=require("express");
const router=express.Router();

const {createRoom}=require('../controllers/roomController');
const {authenticateToken}=require('../middlewares/authMiddlewares')

router.post('/create',authenticateToken,createRoom);
// router.get('/create',getRoom);

module.exports=router
