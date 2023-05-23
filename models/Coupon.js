import mongoose from "mongoose";

const CouponSchema=new mongoose.Schema({
    Code:{
        type:String,
         required:true
    },
    Discount:{
        type:Number,
        required:true
    }

},{
    timestamps:true,
})

export default mongoose.model('Coupon',CouponSchema);