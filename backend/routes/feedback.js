const router =require("express").Router();
const bodyParser=require("body-parser");
const Feedback=require("../models/feedback");
const express=require("express");
const app=express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));


router.post("/", async (req, res) => {
      try {
        const newFeedback = new Feedback({
            name:req.body.name,
            email:req.body.email,
            contact:req.body.contact,
            subject:req.body.subject,
            message:req.body.message
        });
        const freshfeedback = await newFeedback.save();
  
        res.send("created sucessfully");
      } catch (err) {
        res.send(err.message).status(400);
      }
    
});

router.get("/",(req,res)=>{
  Feedback.find()
  .then((Feedback) => res.json(Feedback))
  .catch((err) => res.status(400).json("Error: " + err));
});

// router.get("/:email", async (req, res) => {
//   try{
//     const feedback = await Feedback.findOne({ email: req.params.email });
//   if (feedback) {
//     res.send(feedback);
//   } else {
//     res.status(404).json("user not found");
//   }
//   }
//   catch(err){
//      res.sendStatus(400).json(err);
//   }
// });




module.exports = router;

