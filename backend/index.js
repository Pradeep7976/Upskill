const express=require("express");
const bodyParser=require("body-parser");
const app=express();
const mongoose=require("mongoose");
const CourseRoute=require("./routes/course");
const authRoute=require("./routes/user");
const FeedbackRoute=require("./routes/feedback");
const PaymentRoute=require("./routes/payment");
const verifiedPayment=require("./routes/verifiedPayment");
const registeredCourses=require("./routes/registeredcourses");
const sendMail=require("./routes/mail");
let cors = require("cors");

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended:true
}));
var corsOptions = {
    origin: ['*','http://localhost:3001'],
    methods : ['GET','POST','PUT','DELETE'],
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions)); 
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

mongoose.connect("mongodb+srv://solutions:Bigbuddy%403005@cluster0.tn11oln.mongodb.net/?retryWrites=true&w=majority",(err)=>{
    if(err){
        console.log(err);
    }
    else{
        console.log("Sucessfully connected to Mongo DB");
    }
})




app.get("/",(req,res)=>{
res.send("hello");
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use("/api/mail",sendMail);
app.use("/api/registeredcourses",registeredCourses);
app.use("/api/verifypayment",verifiedPayment);
app.use("/api/payment",PaymentRoute);
app.use("/api/courses",CourseRoute);
app.use("/api/auth",authRoute);
app.use("/api/feedback",FeedbackRoute);
app.listen(3000,()=>{
    console.log("Server running on port 3000");
})