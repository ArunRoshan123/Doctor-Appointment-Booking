import jwt from 'jsonwebtoken'
import { Request,Response,NextFunction } from 'express'


interface PatientRequest extends Request {
    patientid?: string; // Define the patientid property as optional
}




const verifytoken =async (req:PatientRequest,res:Response,next:NextFunction) => {
    const token = req.cookies.patienttoken;

    if(!token){
        return res.status(400).json({
            success:false,
            message:"Unauthorized: Login first token no"
        })
    }
    
    jwt.verify(token,'patient',(err:any,decode:any)=>{
        if(err){
            console.log(err)
            return res.status(400).json({
                success:false,
                message:"Unauthorized: Login first error"
            })
        }else{
            req.patientid = decode.patientid
            next()
        }
    })
};


export default verifytoken