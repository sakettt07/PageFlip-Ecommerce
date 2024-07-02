const express=require("express");
const router=express.Router();
const isLoggedIn=require("../middlewares/isLoggedIn.js");
const productModels = require("../models/product.models.js");
const userModels = require("../models/user.models.js");

router.get("/",function(req,res){
    let error=req.flash("error");
    res.render("index",{error,loggedin:false});
})
router.get("/login", (req, res) => {
    let error=req.flash("error");
    res.render("login",{error,loggedin:false}); 
});
router.get("/addtocart/:id",isLoggedIn,async function(req,res){
    let user=await userModels.findOne({email:req.user.email})
    user.cart.push(req.params.id);
    await user.save();
    req.flash("success","Added to cart");
    res.redirect("/shop")
})
router.get("/shop",isLoggedIn,async function(req,res){
    try {
        let products = await productModels.find();
        let success=req.flash("success");
        res.render("shop", { products,success});
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }
})
module.exports=router;