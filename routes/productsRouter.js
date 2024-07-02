const express=require("express");
const router=express.Router();
const upload=require("../config/multer-config.js");
const productModel=require("../models/product.models.js");


router.post("/create",upload.single("image"),async function(req,res){
    try {
        let {name,price,discount,bgColor,panelColor,textColor}=req.body;
    let product=await productModel.create({
        image:req.file.buffer,
        name,price,discount,bgColor,panelColor,textColor
    })
    req.flash("success","Product created successfully");
    res.redirect("/owners/admin");
    } catch (error) {
        res.send(error.message);
        
    }
})
module.exports=router;