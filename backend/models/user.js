const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String, default: null },
  email: { type: String, unique: true },
  password: { type: String },
  cart:{type:Array,required:false},
  payment_id:{type:String,required:false}
});

module.exports = mongoose.model("user", userSchema);