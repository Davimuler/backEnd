import UserModel from "../models/User.js";

export const getMe=async (req,res)=>{
    try{
        const user=await UserModel.findById(req.userId)

        if(!user){
            return res.status(404).json({
                message:'User not found'
            });
        }

        const {passwordHash,...userData}=user._doc;
        res.json(userData);

    }catch(err){
        console.log(err)
        res.status(500).json({
            message:'No access 500'
        })
    }
}