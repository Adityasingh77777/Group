const express=require("express");

const router=express.Router();

const {login,signup}=require("../controllers/authController");
const {users}=require("../controllers/userController");

router.post("/signup",signup);
router.post("/login",login);
router.get("/users",users);

module.exports=router
