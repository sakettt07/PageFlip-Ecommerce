const express=require("express");
const router=express.Router();
const ownerModel=require("../models/owner.models.js");



if(process.env.MODE==="developement"){
    router.post("/create",async function(req,res){
        let owners=await ownerModel.find();
        if(owners.length>0){
            res.status(503).send("You do not have the access")
        }
        let {fullname,email,password}=req.body;
        let createOwner=await ownerModel.create({
            fullname,email,password
        })
        res.status(200).send(createOwner);
    })

}
// console.log(process.env.NODE_ENV)
module.exports=router;