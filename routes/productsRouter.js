const express=require("express");
const router=express.Router();


router.get("/",function(req,res){
    res.send("Hey i am the owner.")
})
module.exports=router;