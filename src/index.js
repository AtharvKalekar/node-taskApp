const express = require('express');
const app = express();
const port = 8060;
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const router = new express.Router()
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
 
app.listen(port,(err)=>{
    if(!err){
        console.log("Server is runnning on port",port);
    }
    else{
        console.log("Error",err);
    }
})