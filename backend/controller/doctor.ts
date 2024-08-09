import { Router } from "express";
import { Request,Response,NextFunction } from "express";
import multer from "multer";
import model from "../models/doctor";
import { v4 as uuidv4 } from "uuid";
import path from 'path';
import Doctor from "../models/Profile";
import Book from "../models/Book";
import mongoose from "mongoose";
import Sendreport from "../models/Sendreport";
import feedbackform from "../models/Feedback";
import patient from "../models/Patient";
import patientprofile from "../models/Patientprofile";
import cookies from 'cookie-parser';
import verifytoken from "./Doctortoken";
import jwt from 'jsonwebtoken'
const {validate,
    registerValidation,
    login,
    profile,sendreportss
} = require('../validation/doctor')

const router = Router();



//doctor register

router.post('/register',validate(registerValidation),async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {firstname,lastname,email,password} = req.body;
        const checkdoctor = await model.findOne({email:email});
        if(checkdoctor){
            return res.status(400).json({
                succcess:false,
                message:"email already exists "
            })
        }
        const newdoctor = await model.create({
            email:email,
            password:password,
            firstname:firstname,
            lastname:lastname
        })
        if(newdoctor){
            return res.status(201).json({
                success:true,
                message:"successfull register"
            })
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})


//doctor login
router.post('/login',validate(login),async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,password} = req.body;
        const doctor = await model.findOne({email:email,password:password});
        if(!doctor){
            return res.status(404).json({
                success:false,
                message:"invalid credentials"
            })
        }else{
            const doctorid = doctor._id
         const token = jwt.sign({doctorid:doctorid},"doctor",{expiresIn:"1hr"});
          res.cookie('doctortoken',token,{
            httpOnly:true
         });
        
            return res.status(200).json({
                success:true,
                message:"Login Successfully",
                doctor:doctor
            })
        }

    }catch(error){
        console.log(error);
        return res.status(500).json({
            succes:false,
            message:"internal server error"
        })
    }
})




const storage = multer.diskStorage({
    destination:'doctor',
    filename:(req:any,file:any,cb:any)=>{
        const unisuffix = uuidv4();
        const fileextension = path.extname(file.originalname);
        cb(null,file.fieldname+ '-' + unisuffix+fileextension)

    }
})

const fileFilter = (req:any, file:any, cb:any) => {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error(`The avatar must be an image in JPG or PNG format only`));
    }
};

const uploads = multer({ storage: storage, fileFilter: fileFilter });



//build profile
router.post('/profile/:id', uploads.single('Avathar'), validate(profile), async(req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        const doctor = await model.findById(id);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "No doctor found with this id"
            });
        }
        const checkdoctor = await Doctor.findOne({ doctor: id });
        if (checkdoctor) {
            return res.status(400).json({
                success: false,
                message: "Profile already built"
            });
        }
        const { firstname, lastname, email, Qualification, specilization, about, gender, price, university } = req.body;
        const newprofile = await Doctor.create({
            doctor: id,
            firstname: firstname,
            lastname: lastname,
            qualification: Qualification,
            email: email,
            university: university,
            specilization: specilization,
            about: about,
            gender: gender,
            price: price,
            Avathar: req.file?.filename
        });
        if (newprofile) {
            return res.status(201).json({
                success: true,
                message: "Successfully built profile"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});




router.get('/profile/:id',async(req:Request,res:Response,next:NextFunction)=>{
    const id = req.params.id;
    try{
        const doctor = await model.findById(id);
        if(!doctor){
            return res.status(404).json({
                success:false,
                message:"no doctor found with this id"
            })
        }
        const profile = await Doctor.findOne({doctor:id});
        if(!profile){
            return res.status(404).json({
                success:false,
                message:"no profile found"
            })
        }
        return res.status(200).json({
            success:true,
            profile:profile
        })

    }catch(error){
        console.log(error)
    }
})













//view appointment
router.get('/appointment/:id', async(req:Request,res:Response,next:NextFunction)=>{
    const id = req.params.id;
    try{
        const  doctor = await model.findById(id);
        if(!doctor){
            return res.status(404).json({
                success:false,
                messgae:"no doctor found with this id"
            })
        }
        const currentDate = new Date()
        const dateWithoutTime = currentDate.toISOString().split('T')[0];
        console.log(dateWithoutTime); 
        const appointment = await Book.aggregate([
            {
              $match: {
                doctor: new mongoose.Types.ObjectId(id),
                date:{$gt:currentDate}
              }
            }
          ])
          console.log(appointment,'appointemnt')
        if(appointment.length === 0){
            return res.status(400).json({
                success:false,
                message:"no appointment found"
            })
        }else{
            return res.status(200).json({
                success:true,
                appointment:appointment
            })
        }
        
        

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})



//get the transction
router.get('/transaction/:id', async(req:Request,res:Response,next:NextFunction)=>{
    const id = req.params.id;
    try{
        const  doctor = await model.findById(id);
        if(!doctor){
            return res.status(404).json({
                success:false,
                messgae:"no doctor found with this id"
            })
        }
        
        const appointment = await Book.aggregate([
            {
              $match: {
                doctor: new mongoose.Types.ObjectId(id),
                
              }
            }
          ])
          console.log(appointment,'appointemnt')
        if(appointment.length === 0){
            return res.status(400).json({
                success:false,
                message:"no appointment found"
            })
        }else{
            return res.status(200).json({
                success:true,
                appointment:appointment
            })
        }
        
        

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})


router.get('/report/:id', async(req:Request,res:Response,next:NextFunction)=>{
    const id = req.params.id;
    try{
        const  doctor = await model.findById(id);
        if(!doctor){
            return res.status(404).json({
                success:false,
                messgae:"no doctor found with this id"
            })
        }
        const currentDate = new Date()
        const dateWithoutTime = currentDate.toISOString().split('T')[0];
        console.log(dateWithoutTime); 
        const currentTime = currentDate.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
        console.log(currentTime);
        const appointment = await Book.aggregate([
            {
              $match: {
                doctor: new mongoose.Types.ObjectId(id),
                date:{$lte:currentDate},
                time:{$lt:currentTime}
              }
            },
            {
                $sort:{
                    date:-1
                }
            }
          ])
          console.log(appointment,'appointemnt')
        if(appointment.length === 0){
            return res.status(400).json({
                success:false,
                message:"no appointment found"
            })
        }else{
            return res.status(200).json({
                success:true,
                appointment:appointment
            })
        }
        
        

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})



const report = multer.diskStorage({
    destination:'sendreport',
    filename:(req:any,file:any,cb:any)=>{
        const unisuffix = uuidv4();
        const fileextension = path.extname(file.originalname);
        cb(null,file.fieldname+ '-' + unisuffix+fileextension)

    }
})

const sendreport = multer({storage:report})


//send report 
router.post('/report/:doctorid/:patientid',  sendreport.single('reports'), async (req: Request, res: Response, next: NextFunction) => {
    const doctorid = req.params.doctorid;
    const patientid = req.params.patientid;
    try {
        // Check if the doctor exists
        const doctor = await model.findById(doctorid);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "No doctor found with the id"
            });
        }

        // Use aggregation to check if the patient exists for the given doctor
        const patientExists = await Book.aggregate([
            {
                $match: {
                    doctor: new mongoose.Types.ObjectId(doctorid),
                    patient: new mongoose.Types.ObjectId(patientid)
                }
            },
            {
                $project: {
                    _id: 1
                }
            }
        ]);

        if (!patientExists) {
            return res.status(404).json({
                success: false,
                message: "No patient found with this id for the given doctor"
            });
        }
        const {Reason} = req.body;
        // Create and save the report
        const sendreports = await Sendreport.create({
            doctor: doctorid,
            patient: patientid,
            reports: req.file?.filename,
            date: Date.now(),
            Reason:Reason
        });

        return res.status(201).json({
            success: true,
            message: "Report sent successfully",
            sendreports
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});




//view the feedback 
router.get('/feedbacks/:id', async(req:Request,res:Response,next:NextFunction)=>{
    const id = req.params.id;
    try{
        const doctor = await model.findById(id);
        if(!doctor){
          return res.status(404).json({
            success:false,
            message:"no doctor found with this id"
          })
        }
        const feedbacks = await feedbackform.aggregate([
            {
                $match:{
                    doctor: new mongoose.Types.ObjectId(id)
                }
            },{
                $lookup:{
                    from:Doctor.collection.name,
                    localField:'doctor',
                    foreignField:'doctor',
                    as: 'Doctors'

                }
            },{
                $lookup:{
                    from:patient.collection.name,
                    localField:'patient',
                    foreignField:'_id',
                    as: 'patients'
                }
            },{
                $lookup:{
                    from:Book.collection.name,
                    localField:'appointment',
                    foreignField:'_id',
                    as: "details"
                }
            },{
                $sort:{
                    Date:1
                }
            }
        ]);
        if(feedbacks.length === 0){
            return res.status(404).json({
                success:false,
                message:"no feedback found"
            })
        }
        return res.status(200).json({
            success:true,
            feedbacks
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})









interface CustomRequest extends Request {
    doctorid?: string; // Define the doctorid property as optional
}
//logout
router.post('/logout/:id',   async (req: CustomRequest, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    try {
        const doctor = await model.findById(id);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "No doctor found"
            });
        } else {
            res.clearCookie('doctortoken'); // Clear the 'doctortoken' cookie
            return res.status(200).json({
                success: true,
                message: "Logout Success"
            });
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});


export default router