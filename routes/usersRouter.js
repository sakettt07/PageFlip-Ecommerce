const express = require("express");
const router = express.Router();
const {registerUser,loginUser}=require("../controllers/authController.js");
require("dotenv").config();


router.post("/register",registerUser );

router.post("/login",loginUser)
module.exports = router;
