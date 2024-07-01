const mongoose=require("mongoose");
const productSchema=mongoose.Schema({
    name:{
        type:String
    },
    image:{
        type:Buffer
    },
    price:{
        type:Number
    },
    discount:{
        type:Number,
        default:0,
    },
    bgColor:{
        type:String
    },
    panelColor:{
        type:String
    },
    textColor:{
        type:String
    }
});
module.exports=mongoose.model("Product",productSchema);