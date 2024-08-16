const mongoose=require("mongoose");

const VerifiedSchema=new mongoose.Schema({
email:{type:String},
payment_id:{type:String},
order_id:{type:String},
course_id:{type:String}
},
{timestamps:true}

);

module.exports=mongoose.model("VerifiedPayment",VerifiedSchema);