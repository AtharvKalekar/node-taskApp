const mongoose = require('mongoose')
const validator = require('validator')
const Task = require('./task')

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
              throw new Error('Email is Invalid')
            }
        }
    },
    password:{
       type:String,
       require:true,
       minlength:7,
       trim:true,
       validate(value){
        if(value.toLowerCase().includes('password')){
            throw new Error('Password can not contain "password" ')
        }
       }
    },
    age:{
        type:Number,
        default:0,
        validate(value){
            if(value<0){
                throw new Error('Age can not be a negative number')
            }
        }
    },
    avatar:{
        type:Buffer
    }
},{
    timestamps:true
})

userSchema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})


//delet task 
userSchema.pre('remove',async function(next){
    try {
        const user = this
        console.log("Remving user:", user._id)
        const deletedTask = await Task.deleteMany({owner:user._id})
        console.log("Deleted Tasks:",deletedTask);
        next()
    } catch (error) {
        console.log("Error:",error);
        next(error)
    }
})


const User = mongoose.model('User',userSchema)
module.exports = User