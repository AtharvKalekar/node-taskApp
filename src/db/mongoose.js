const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/task-manager')
.then(()=>{
    console.log("Connected to Db");
})
.catch((err)=>{
    console.log("Error",err);
})



