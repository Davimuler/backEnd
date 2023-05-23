import mongoose from "mongoose";

const TestSchema=new mongoose.Schema({
    fullName:{
        type:String ,
        required:true
    },
    email:{
        type:String,
        required: true,
        unique:true
    }

},{
    timestamps:true,
})

export default mongoose.model('Test',TestSchema);