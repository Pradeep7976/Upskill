const mongoose=require("mongoose");

const CourseSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    img:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
    },
    rating:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    duration:{
         type:String,
         required:true,
    },
    lectures:{
        type:Number,
        required:true,
    },
    tags:{
        type:String,
        required:true,
    },
    instructor:{
        type:String,
        required:true,
    },
    free:{
        type:Boolean,
        required:true
    }

});

module.exports=mongoose.model("Course",CourseSchema);