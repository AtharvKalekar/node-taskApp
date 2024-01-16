const mongoose = require('mongoose')
const taskSchema = new mongoose.Schema({
    description:{
        type:String,
        require:true,
        trim:true
    },
    completed:{
        type:Boolean,
        require:true,
        default:false
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        require:true
    }
},{
    timestamps:true 
})

const Task = mongoose.model('Task',taskSchema)
module.exports = Task