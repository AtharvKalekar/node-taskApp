const User = require('../models/user');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('../models/user')
const {sendWelcomeEmail} = require('../emails/account')

const signUp = async (req, res)=>{
    //Check Exisiting
    const {name, email, password,age} = req.body;
    try {
        const existingUser = await User.findOne({email:email})
        if(existingUser){
            return res.status(400).send({message:"User already Exists"})
        }

       //Hash Password
       const hashPassword = await bcrypt.hash(password,8)

       //Create the User
       const newUser = new User({
        name,
        email,
        password:hashPassword,
        age:age || 0
       })
       
       //Save user
       await newUser.save()
       sendWelcomeEmaild(newUser.email, newUser.name)
       //Token Generate
        const token = jwt.sign({email:newUser.email, id:newUser._id},'thisismysecretkey')
        res.status(200).send({message:'User is Created',newUser,token})
    
    } catch (error) {
        res.status(400).send({message:error})
    }  
}

const signIn = async(req,res)=>{
    const {email, password} = req.body
    try {
        const existingUser = await User.findOne({email:email})

        //Exisiting User
        if(!existingUser){
            return res.status(400).send({message:"User is not present, please sign up"})
        }
    
        //Match Password
        const matchPassword =await bcrypt.compare(password,existingUser.password)
        if(!matchPassword){
            return res.status(400).send({message:"Incorredct Password"})
        }
    
        //Token Generation
        const token = jwt.sign({email:email,id:existingUser._id},'thisismysecretkey')
        res.status(200).send({message:"Login in Successfully", existingUser, token})
    }
    catch (error) {
       res.status(400).send(error) 
    }
}
module.exports = {signUp, signIn}