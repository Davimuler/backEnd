import mongoose from "mongoose";

const SectionSchema = new mongoose.Schema({
   sectionName:{
        type:String ,
        unique:true,
        required:true
    }
},{
    timestamps:true,
});



export default mongoose.model('Section',SectionSchema);