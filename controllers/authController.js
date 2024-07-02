const bcrypt=require("bcrypt");
const usersModel = require("../models/user.models.js");
const {generateToken}=require("../utils/generateToken.js");
// const productModels=require("../models/product.models.js")

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

  module.exports.loginUser = async function (req, res) {
    let { email, password } = req.body;
    let user = await usersModel.findOne({ email: email });
    if (!user) {
        req.flash("error", "Email Or Password incorrect");
        return res.redirect("/login");
    }

    bcrypt.compare(password, user.password, async function (err, result) {
        if (result) {
            let token = generateToken(user);
            res.cookie("token", token);

            return res.redirect("/shop");
        } else {
            req.flash("error", "Email or Password incorrect");
            return res.redirect("/login");
        }
    });
};

  module.exports.logoutUser=function(req,res){
    res.cookie("token","");
    res.redirect("/")
  }