const mongoose=require("mongoose");

const ownerSchema = mongoose.Schema(
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
      products:{
        type:Array,
        default:[]
      },
      picture:{
        type:String,
      },
      gstin:{
        type:String,
      }

  });
  module.exports =mongoose.model('owner', ownerSchema);