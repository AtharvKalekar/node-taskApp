const express = require('express')
const router = new express.Router()
const Task = require('../models/task')
const auth = require('../middleware/auth')

router.post('/tasks',auth, async(req,res)=>{
    try {
    const task = new Task({
        ...req.body,
        owner:req.userId
    })
   
        //const task = new Task(req.body)
        await task.save()
        res.status(200).send({message:"Task is stored in DB"})
    } catch (error) {
        res.status(400).send({message:error})
    }
})
//Task associated with the user
router.get('/tasks',auth,async(req,res)=>{
    try {
        const tasks = await Task.find({owner:req. userId})
        res.status(200).send(tasks)
    } catch (error) {
        res.status(400).send({message:error})
    }
})
 
router.patch('/tasks/:id', auth, async (req,res)=>{
    try {
        const taskId = req.params.id;
        await Task.findByIdAndUpdate(taskId,req.body,{new:true})
        res.status(200).send({message:"Task is updated"})
    } catch (error) {
        res.status(400).send({message:error})
    }
})

router.delete('/task/:id', async (req,res)=>{
    try {
        const delTask = req.params.id
        await Task.findByIdAndDelete(delTask)
        if(!delTask){
            return res.status(400).send({message:"User is not present"})
        }
        res.status(200).send({message:"Task is deleted"})
        
    } catch (error) {
        res.status(400).send({message:error})
    }
})

module.exports = router
