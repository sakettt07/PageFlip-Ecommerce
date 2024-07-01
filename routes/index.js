const express=require("express");
const router=express.Router();
const isLoggedIn=require("../middlewares/isLoggedIn.js");

router.get("/",function(req,res){
    let error=req.flash("error");
    res.render("index",{error});
})
router.get("/login", (req, res) => {
    res.render("login"); 
});
module.exports=router;