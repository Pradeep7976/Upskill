const router =require("express").Router();
const bodyParser=require("body-parser");
const Courses=require("../models/Course");
const express=require("express");
const app=express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));


router.post("/", async (req, res) => {
      try {
        const newcourse = new Courses({
            title:req.body.title,
            desc:req.body.desc,
            img:req.body.img,
            price:req.body.price,
            rating:req.body.rating,
            category:req.body.category,
            duration:req.body.duration,
            lectures:req.body.lectures,
            tags:req.body.tags,
            instructor:req.body.instructor,
            free:req.body.free
        });
        const freshcourse = await newcourse.save();
  
        res.send("created sucessfully");
      } catch (err) {
        res.send(err.message).status(400);
      }
    
});

router.get("/",(req,res)=>{
  Courses.find()
  .then((users) => res.json(users))
  .catch((err) => res.status(400).json("Error: " + err));
});

router.get("/:courseid", async (req, res) => {
  try{
    await Courses.findOne({ _id: req.params.courseid }).then((course,err)=>{
      if (course) {
        res.send(course);
      } else {
        res.status(404).json("course not found");
      }
    });
  
  }
  catch(err){
     res.sendStatus(400).json(err);
  }
});

router.get("/category/:category", async (req, res) => {
  try{
    await Courses.find({ category: req.params.category }).then((course,err)=>{
      if (course) {
        res.send(course);
      } else {
        res.status(404).json("course not found");
      }
    });
  }
  catch(err){
     res.sendStatus(400).json(err);
  }
});

router.get("/category/free", async (req, res) => {
  try{
    await Courses.find({free:true}).then((course)=>{
      if (course) {
        res.send(course);
      } else {
        res.status(404).json("no courses found");
      }
    });
 
  }
  catch(err){
     res.sendStatus(400).json(err);
  }
});


module.exports = router;

