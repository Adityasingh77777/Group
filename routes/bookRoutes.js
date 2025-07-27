const express=require("express");
const router=express.Router();

const {authenticateToken} = require('../middlewares/authMiddlewares');
const {bookingStatus}=require('../controllers/bookingController')

router.post('/status',authenticateToken,bookingStatus);

module.exports=router