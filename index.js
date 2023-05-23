import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import multer from 'multer'
import {loginValidation, postCreateValidation, registerValidation} from './Validations/validations.js'

import TestModel from './models/Test.js'

import UserModel from "./models/User.js"
import checkAuth from './utils/checkAuth.js'

import *as UserController from './controllers/UserController.js'
import *as PostController from './controllers/PostController.js'
import ItemModel from './models/Item.js'

import NewItemModel from "./models/NewItem.js";
import NewItem from "./models/NewItem.js";

import SectionModel from "./models/Sections.js"
import CouponModel from "./models/Coupon.js";


mongoose.set("strictQuery", false);
mongoose.connect('mongodb+srv://Davimuler:135792468@cluster0.zfojr0v.mongodb.net/blog?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(
    ()=>{
        console.log('DB OK')
    }
).catch((err)=>{
    console.log('DB error',err)
})

const app=express();


const imageSchema = new mongoose.Schema({
    name: String,
    image: {
        data: Buffer,
        contentType: String
    }
});

const Image = mongoose.model('Image', imageSchema);


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// const upload=multer({storage})

app.use(express.json())

app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});

app.use('/uploads',express.static('uploads'))


app.get('/',(req, res)=>{
    res.send('gello')
})

app.post('/section',async (req,res)=>{
        try{
            const doc=new SectionModel({
                sectionName:req.body.sectionName,
            })
            const section=await doc.save();
console.log(req.body.sectionName)
            res.json(section)
        }catch(err){

            res.status(500).json({
                message:'Error to create a new section'
            })
        }
    }
)
app.get('/sections',async (req,res)=>{
    try {
        const sections = await SectionModel.find({});
        if (!sections) {
            return res.status(404).json({
                message: 'No sections',
            });
        }
        res.json(sections);
    }catch (err){
        res.status(500).json({
            message: 'No access',
        });
    }
})

app.delete('/newItem',async (req, res)=>{
    try{
        const id = req.body.id;
         NewItem.deleteOne({ _id: id }, (err, result)=> {
            if (err) throw err;
            if (result.deletedCount === 0) {
                res.status(404).send("Object not found");
            } else {
                res.status(204).send();
            }
        });
    }catch(err){

    }
})

app.post('/newItem', upload.single('image'), async (req, res) => {

    try{

        const doc =NewItemModel({
            fullName:req.body.fullName,
            price:req.body.price,
            description:req.body.description,
            viewCounts:req.body.viewCounts,
            characteristics:JSON.parse(req.body.characteristics),
            section:req.body.section,
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }


        })
        const test=await doc.save();

        res.json(test)
    }catch(err){
        res.status(500).json({
            message:'Error to add image'
        })
    }

});


app.post('/test',async (req,res)=>{
        try{
            const doc=new TestModel({
                fullName:req.body.fullName,
                email:req.body.email
            })
            const test=await doc.save();

            res.json(test)
        }catch(err){
            res.status(500).json({
                message:'Error to create test'
            })
        }
    }
)

app.post('/coupon',async (req,res)=>{
        try{
            const doc=new CouponModel({
                Code:req.body.Code,
                Discount:req.body.Discount
            })
            const coupon=await doc.save();

            res.json(coupon)
        }catch(err){
            res.status(500).json({
                message:'Error to create coupon'
            })
        }
    }
)
app.get('/coupons', async (req,res)=>{
    try {
        const coupons = await CouponModel.find({});
        if (!coupons) {
            return res.status(404).json({
                message: 'No items',
            });
        }
        res.json(coupons);
    }catch (err){
        res.status(500).json({
            message: 'No access',
        });
    }
})
app.post('/couponGet', async (req,res)=>{
    try {
        const coupon = await CouponModel.find({ Code: req.body.Code });
        if (!coupon) {
            return res.status(404).json({
                message: 'No such coupon',
            });
        }
        res.json(coupon);
    }catch (err){
        res.status(500).json({
            message: 'No access',
        });
    }
})

// app.get('/post',PostController.getAll)
// app.get('/post/:id',PostController.getOne)
app.post('/post',postCreateValidation,PostController.create)

// app.post('/upload',upload.single('image'),(req,res)=>{
//
// })

app.post('/item',upload.single('image'),async(req, res)=>{
    try{
        const doc=new ItemModel({
            // fullName:req.body.fullName,
            // price:req.body.price,
            // description:req.body.description,
            // viewCounts:req.body.viewCounts,
            // characteristics:JSON.parse(req.body.characteristics),
            // section:req.body.section,
            image: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }

        })
        const item=await doc.save();

        res.json(item)
    }catch (err){
        res.status(500).json({
            message:'Error to create new item'})
    }
})



app.get('/images', async (req,res)=>{
    try {
        const images = await Image.find({});
        if (!images) {
            return res.status(404).json({
                message: 'No images',
            });
        }
        res.json(images);
    }catch (err){
        res.status(500).json({
            message: 'No access',
        });
    }
})


app.get('/items', async (req,res)=>{
    try {
        const items = await NewItemModel.find({});
        if (!items) {
            return res.status(404).json({
                message: 'No items',
            });
        }
        res.json(items);
    }catch (err){
        res.status(500).json({
            message: 'No access',
        });
    }
})

app.get('/auth/me',checkAuth,UserController.getMe)
app.get('/users',async(req, res)=>{
    try{
        const users = await UserModel.find({});

        if (!users) {
            return res.status(404).json({
                message: 'No users',
            });
        }
        // users.map(x => x * 2);
        // const { passwordHash, ...usersData } = users._doc;
        res.json(users);

    }catch (err) {
        res.status(500).json({
            message: 'No access',
        });
    }
})
app.put('/users', async (req, res) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.body.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({
            message: 'Error updating user',
            error: err.message,
        });
    }
});

app.put('/order', async (req, res) => {
    try {
        const updatedUser = await UserModel.findByIdAndUpdate(req.body.id,{ $push: { orders: req.body.newOrder } }, { new: true });
        res.json(updatedUser);
    } catch (err) {
        res.status(500).json({
            message: 'Error updating user',
            error: err.message,
        });
    }
});



app.post('/auth/login',loginValidation,UserController.login);

app.post('/auth/register',registerValidation,UserController.register)

app.listen(4444,(err)=>{
    if(err){
        return console.log(err)
    }
    return console.log('server OK')
})