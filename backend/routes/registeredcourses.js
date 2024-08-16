var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
const RegisteredCourse=require("../models/registeredcourses");
const User=require("../models/user");
const registeredcourses = require('../models/registeredcourses');
const app=express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

router.post("/:email",async(req,res)=>{
    try{   
           User.findOne({email:req.params.email})
           .then(async(user)=>{
            if(user){
                registeredcourses.findOne({email:req.params.email}).then(async(regisemail)=>{
                            if(regisemail){
                                res.status(200).json({meassage: "user already registered "});
                            }
                            else{
                                const newregisteredCourse =new RegisteredCourse({
                                    email:req.params.email
                                  });
                                  const freshcourse =await newregisteredCourse.save();
                                  res.status(200).json({message: "sucessfully registered"});
                          }
                }) ;   
            }
          })
    }
    catch(err){
            res.status(400).send(err);
    }
});

router.put("/:email",async(req,res)=>{
    try{
     RegisteredCourse.findOneAndUpdate({email:req.params.email},{
            $push:{
                 courses:req.body.courseid
            }
        }).then((course)=>{
           if(course){
            res.status(200).send("sucessfully enrolled");
           }
           else{
            res.status(404).send("email not found");

           }
        })
    }
    catch(err){
        res.status(400).send(err);
    }
});

router.get("/:email",async(req,res)=>{
    try{
          registeredcourses.findOne({email:req.params.email}).
          then((courses)=>{
                 if(courses){
                    res.status(200).send(courses);
                 }
                 else{
                    res.status(404).send("email not found");
                 }
                 
                
          });
    }
    catch(err){
        res.status(400).send(err);

    }
})


module.exports = router;