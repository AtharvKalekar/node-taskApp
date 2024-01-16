const jwt = require('jsonwebtoken')
const auth = async(req,res,next)=>{
    try {
        let token = req.headers.authorization
        if(token){
            console.log("token received:", token);
            token= token.split(" ")[1]
            let user = jwt.verify(token,'thisismysecretkey')
            req.token = token
            req.userId = user.id
        }
        else{
            console.log("No token provided");
            res.status(400).send({message:"Invalid User"})
        }
        next(); 
    } catch (error) {
        console.log("token verfication error", error);
        res.status(400).send({message:"Invalid User"})        
    }
}
module.exports = auth