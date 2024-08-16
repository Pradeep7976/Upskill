var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var middleware= require('../middleware/middleware');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
var User = require('../models/user');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcryptjs');

router.post('/login', function(req, res) {

  User.findOne({ email: req.body.email }, function (err, user) {
    if (err) return res.status(500).send('Error on the server.');
    if (!user) return res.status(404).send('No user found.');
        var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
    if (!passwordIsValid) return res.status(401).send({ auth: false, token: null });
    var token = jwt.sign({ id: user._id },"hey tis is secret", {
      expiresIn: 86400 
    });
    res.status(200).send({ auth: true, token: token,email:req.body.email });
  });

});

router.get('/logout', function(req, res) {
  res.status(200).send({ auth: false, token: null });
});

router.post('/register', function(req, res) {

  var hashedPassword = bcrypt.hashSync(req.body.password, 8);

  User.create({
    name : req.body.name,
    email : req.body.email,
    password : hashedPassword
  }, 
  function (err, user) {
    if (err) return res.status(400).send("There was a problem registering the user`.");  //if user already exists
    var token = jwt.sign({ id: user._id },"hey tis is secret", {
      expiresIn: 86400
    });

    res.status(200).send({ auth: true, token: token,email:req.body.email });
  });

});

router.put("/addcart/:userid",async(req,res)=>{
  var userid=req.params.userid;
 try{
  await User.findOneAndUpdate({_id:userid},{
    $push:{
      cart:req.body.courseid
    }
  });
  res.send("course added to cart");

}
 catch(err){
  res.send(400).json(err);
 }
});

router.put("/deletecart/:cartid",async(req,res)=>{
  var userid=req.body.userid;

  try{
      await User.findOneAndUpdate({_id:userid},{
        $pull:{
          cart:req.params.cartid
        }
    }
      ).then((user)=>{
          res.status(200).send(user);
      });
      res.status(404).send("user not found");
    
  }
  catch(err){
     res.status(400).send(err);
  }
});

module.exports = router;