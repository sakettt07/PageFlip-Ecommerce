const express=require("express");
const router=express.Router();
const isLoggedIn=require("../middlewares/isLoggedIn.js");
const productModels = require("../models/product.models.js");

router.get("/",function(req,res){
    let error=req.flash("error");
    res.render("index",{error});
})
router.get("/login", (req, res) => {
    res.render("login"); 
});
router.get("/shop",isLoggedIn,async function(req,res){
    let products=await productModels.find();
    res.render("shop",{products});
})
module.exports=router;