const errorMiddleware = (req,res,next)=>{
    throw new Error('Please upload a imge type file only')
}