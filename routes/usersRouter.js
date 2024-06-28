const express=require("express");
const router=express.Router();
const usersModel=require("../models/user.models.js");


router.post("/register",async function(req,res){
   try {
    let {fullname,password,email}=req.body;
    let newUser=await usersModel.create({
        fullname,
        password,
        email
    })
    res.send(newUser)
   } catch (error) {
    res.send(error.message);
   }

})
module.exports=router;