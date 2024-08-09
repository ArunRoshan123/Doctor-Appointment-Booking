import jwt from 'jsonwebtoken'
import { Request,Response,NextFunction } from 'express';

interface CustomRequest extends Request {
    doctorid?: string; // Define the doctorid property as optional
}

const verifytoken = async(req:CustomRequest,res:Response,next:NextFunction)=>{
    const token =  req.cookies.doctortoken;
    
    if(!token){
        return res.status(400).json({
            success:false,
            Mmessage:"Unauthorized: Login first doctors"
        })
    }

    jwt.verify(token,'doctor',(err:any,decode:any)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                success:false,
                message:"Unauthorized: Login first doctors"
            })
        }else{
            req.doctorid  = decode.doctorid,
            next()
        }
    })
} 

export default verifytoken