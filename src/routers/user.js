const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../middleware/auth')
const { signUp, signIn } = require('../controllers/userController')
const  mongoose  = require('mongoose')
const multer = require('multer')

const upload = multer({
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            return cb(new Error('Please upload a ipeg image'))
        }
        cb(undefined,true)
    }
})

router.post('/users/signup',signUp);

router.post('/users/signin',signIn);

//logout
router.get('/users/logout', auth, async (req,res)=>{
    try {
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        await req.user.save()
    } catch (error) {
        res.status(500).send()
    }
})

//Get only current user
router.get('/users/me',auth, async(req,res)=>{
    try {
        const user = await User.findById(req.userId)
        if(!user){
            return req.status(400).send({message:"Unable to find the user"})
        }
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send({message:error})
    }
})

//Get user by id
router.get('/users/:id',async(req,res)=>{
    try {
        const userid = await req.params.id; 
        const user = await User.findById(userid)
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send({message:error})
    }
})

router.patch('/users/me', auth, async (req, res) => {
    try {
        const userId = req.userId;
        const objectId = new mongoose.Types.ObjectId(userId);

        console.log("User id:", userId);
        console.log("Object id:", objectId);

        const updateUser = await User.findByIdAndUpdate(objectId, req.body, { new: true });

        if (!updateUser) {
            return res.status(404).send({ message: "User not found" });
        }

        res.status(200).send({ message: "User updated successfully", updateUser });
    } catch (error) {
        console.error("Error:", error);
        res.status(400).send({ message: error.message });
    }
});

router.delete('/users/me',auth, async(req,res)=>{
    try {
        const delUser = await User.findByIdAndDelete(req.userId)
        if(!delUser){
            return res.status(400).send({message:"No user  present"})
        }
        res.status(200).send({message:"User deleted successfully"})
    } catch (error) {
        res.status(400).send({message:error})
    }
})

router.post('/users/me/avatar', auth, upload.single('images'), async (req, res) => {
    req.user.avatar = req.file.buffer;
    await req.user.save();
    res.send({ message: "Avatar uploaded successfully" });
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message });
});


module.exports = router