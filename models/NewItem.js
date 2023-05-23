import mongoose from "mongoose";

const NewItemSchema = new mongoose.Schema({
    fullName:{
        type:String ,
        unique:true,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String
    },
    characteristics:{
        type:Array,
        default:[],
    },
    viewCounts:{
        type:Number,
        default: 0
    },
    section:{
        type:String,

    },
    image: {
        data: Buffer,
        contentType: String
    }
},{
    timestamps:true,
});



export default mongoose.model('NewItem',NewItemSchema);