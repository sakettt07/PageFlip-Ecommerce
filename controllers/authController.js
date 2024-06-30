const bcrypt=require("bcrypt");
const usersModel = require("../models/user.models.js");
const {generateToken}=require("../utils/generateToken.js");

module.exports.registerUser=async function (req, res) {
    try {
      let { fullname, password, email } = req.body;

      let user=await usersModel.findOne({email:email});
      if(user){
        return res.status(401).render("login");
      }

      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, async function (err, hash) {
          if (err) return res.send(err.message);
          else {
            let newUser = await usersModel.create({
              fullname,
              password: hash,
              email,
            });
           let token= generateToken(newUser);
            res.cookie("token", token);
            res.render("login");
          }
        });
      });
    } catch (error) {
      res.send(error.message);
    }
  }

  module.exports.loginUser=async function(req,res){
    let {email,password}=req.body;
    let user= await usersModel.findOne({email:email});
    if(!user){
      res.flash("error","Email Or Password incorrect");
      return res.redirect("/");
    }
    bcrypt.compare(password,user.password,function(err,result){
        if(result){
            let token=generateToken(user);
            res.cookie("token",token);
            res.render("shop");
        }
        else{
          req.flash("error","Email or Password incorrect");
          return res.redirect("/")
        }
    })

  }

  module.exports.logoutUser=function(req,res){
    res.cookie("token","");
    res.send("You have been logged out");
  }