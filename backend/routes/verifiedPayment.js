const router =require("express").Router();
const bodyParser=require("body-parser");
const User=require("../models/user");
const Verifiedpayment=require("../models/verifiedPayment");
const express=require("express");
const app=express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

router.post("/", async (req, res) => {
    try {
     await User.findOne({email:req.body.email}).then(
      (user,err)=>{
                
                if(user){
                    console.log(user);
                    const newpayment = new Verifiedpayment({
                        email:req.body.email,
                        payment_id:req.body.payid,
                        order_id:req.body.orderid,
                        course_id:re.body.courseid
                    });
                    const freshpayment = newpayment.save();
                    res.send("created sucessfully");
                }
                else{
                    res.status(404).send("user not found");
                }
      }
      )
    } catch (err) {
      res.send(err.message).status(400);
    }
  
});

module.exports=router;