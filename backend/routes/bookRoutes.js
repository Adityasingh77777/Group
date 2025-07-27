const express=require("express");
const router=express.Router();

const {authenticateToken} = require('../middlewares/authMiddlewares');
const {bookingStatus,confirmStatus}=require('../controllers/bookingController')

router.post('/bookingStatus',authenticateToken,bookingStatus);
router.post('/confirmation',authenticateToken,confirmStatus);


module.exports=router