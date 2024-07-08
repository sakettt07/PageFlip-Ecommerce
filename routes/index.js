const express=require("express");
const router=express.Router();
const isLoggedIn=require("../middlewares/isLoggedIn.js");
const productModels = require("../models/product.models.js");
const userModels = require("../models/user.models.js");
const upload =require("../config/multer-config.js");

function formatDate(date) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(date).toLocaleDateString('en-GB', options);
}

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
router.get("/cart", isLoggedIn, async function(req, res) {
    let user = await userModels.findOne({ email: req.user.email }).populate("cart");
    let bill = user.cart.reduce((item) => {
        return item.price - item.discount + 20; 
    }, 0);
    res.render("cart", { user, bill });
});
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
router.get("/account",isLoggedIn,async function(req,res){
    try {
        let user = await userModels.findOne({ email: req.user.email }).select("-password"); 
        if (user) {
            let formattedDate = formatDate(user.createdAt);
            res.render("account", { user, formattedDate });
        } else {
            res.status(404).send("User not found");
        }
    } catch (error) {
        console.error(error);
        res.status(500).send("Server Error");
    }

})
router.get("/edit/:id",isLoggedIn,async function(req,res){
    try {
        let user=await userModels.findOne({_id:req.params.id});
        if(!user){
            return res.status(404).send("User not found")
        }
        res.render('edit',{user});
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
})
router.post("/edit/:id",upload.single("profilePicture"),isLoggedIn,async function(req,res){
    try {
        let user=await userModels.findById(req.params.id);
        if(!user){
            return res.status(404).send("User not found");
        }
        if (req.body.fullname) {
            user.fullname = req.body.fullname;
        }

        // Update profile picture if uploaded
        if (req.file) {
            // Convert buffer to base64 and save
            user.picture = req.file.buffer;
        }
        await user.save();
        res.redirect('/account')
    } catch (error) {
        console.error(err);
        res.status(500).send('Internal Server Error');  
    }
})
module.exports=router;