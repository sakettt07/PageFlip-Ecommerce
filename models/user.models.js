const mongoose=require("mongoose");

const userSchema = mongoose.Schema(
    {
      fullname:{
        type:String,
      },
      email: {
        type: String,
        lowercase: true,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      cart:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
      }],
      orders:{
        type:Array,
        default:[]
      },
      contact:{
        type:Number
      },
      picture:{
        type:String
      }
    },
    { timestamps: true }
  );
  module.exports =mongoose.model('User', userSchema);