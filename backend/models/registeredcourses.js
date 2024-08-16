const mongoose=require("mongoose");

const RegisteredCourseSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    courses:{
        type:Array,
    }
});

module.exports=mongoose.model("RegisteredCourse",RegisteredCourseSchema);