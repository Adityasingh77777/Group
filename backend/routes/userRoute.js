const express=require("express");

const router=express.Router();

const {login,signup}=require("../controllers/authController");
const {users}=require("../controllers/userController");
const {authenticateToken}=require("../middlewares/authMiddlewares")

router.post("/signup",signup);
router.post("/login",login);
router.get("/users",authenticateToken,users);

module.exports=router
