import { Router } from "express";
import { Request,Response,NextFunction } from "express";
import patient from "../models/Patient";
import multer from 'multer';
import path from 'path'
import {v4 as uuidv4} from 'uuid';
import patientprofile from "../models/Patientprofile";
import Doctor from "../models/Profile";
import Book from "../models/Book";
import model from "../models/doctor";
import mongoose, { connect } from "mongoose";
import Sendreport from "../models/Sendreport";
import feedbackform from "../models/Feedback";
import jwt from 'jsonwebtoken'
const {validate,
    registerValidation,
    login,
    profile
} = require('../validation/Patient');
import verifytoken from "./Patienttoken";



const router = Router();

//newpatients register
router.post('/register',validate(registerValidation),async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {firstname,lastname,email,password} = req.body;
        const patients = await patient.findOne({email:email});
        if(patients){
            return res.status(400).json({
                succcess:false,
                message:"email already exists "
            })
        }
        const newpatients = await patient.create({
            email:email,
            password:password,
            firstname:firstname,
            lastname:lastname
        })
        if(newpatients){
            return res.status(201).json({
                success:true,
                message:"successfull register",
                newpatients
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


//patients login
router.post('/login',validate(login),async(req:Request,res:Response,next:NextFunction)=>{
    try{
        const {email,password} = req.body;
        const patients = await patient.findOne({email:email,password:password});
        if(!patients){
            return res.status(404).json({
                success:false,
                message:"invalid credentials"
            })
        }else{
            const patientid = patients._id
            const token = jwt.sign({patientid:patientid},'patient',{expiresIn:'1hr'})
            res.cookie('patienttoken',token,{
                httpOnly:true
            })
            return res.status(200).json({
                success:true,
                message:"Login Successfully",
                patient:patients
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
    destination:'patient',
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



//buildprofile
// router.post('/profile/:id',uploads.single('Avathar'),validate(profile),async(req:Request,res:Response,next:NextFunction)=>{
//     const id  = req.params.id;
//     try{
//         const doctor = await patient.findById(id);
//         if(!doctor){
//             return res.status(404).json({
//                 success:false,
//                 message:"no doctor found in thid id"
//             })
//         }

//        const checkpatient = await patientprofile.findOne({patient:id});
//        if(checkpatient){
//         return res.status(400).json({
//             success:false,
//             message:"profile already build"
//         })
//        }

//         const {firstname,lastname,email,age,address} = req.body;
//         const newprofile = await patientprofile.create({
//             patient:id,
//             firstname:firstname,
//             lastname:lastname,
//             email:email,
//             age:age,
//             address:address,
//             Avathar:req.file?.filename
//         });
//         if(newprofile){
//             return res.status(201).json({
//                 success:true,
//                 message:"sucessfull build profile",
//                 newprofile:newprofile
//             })
//         }


//     }catch(error){
//         console.log(error);
//         return res.status(500).json({
//             success:false,
//             message:"internal server error"
//         })
//     }
// });





interface profile{
    firstname:string,
    lastname:string,
    email:string,
    age:string,
    address:string,
    insuranceName:string,
    number:string,
    person:string,
    mobileNumber:string,
    expirydate:string,
    nomineename:string,
    nomineeage:string,
    totalsum:string,
    insurance:boolean

}





router.post('/profile/:id',  uploads.single('Avathar'), validate(profile), async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;

    try {
        // Check if patient exists
        const patients = await patient.findById(id);
        if (!patients) {
            return res.status(404).json({
                success: false,
                message: "No patient found with this id"
            });
        };

        // Destructure request body
        const { firstname, lastname, email, age, address, insurance, insuranceName, number, person, mobileNumber, expirydate, nomineename, nomineeage, totalsum }: profile = req.body;

        // Create patient profile data
        let newProfileData: any = {
            patient: id,
            firstname,
            lastname,
            email,
            age,
            address,
            Avathar: req.file?.filename,
            insurance // Include insurance field
        };

        // If insurance is true, include insurance details
        if (insurance) {
            newProfileData = {
                ...newProfileData,
                insuranceName,
                number,
                person,
                mobileNumber,
                expirydate,
                nomineename,
                nomineeage,
                totalsum
            };
        }
        
        // Create new patient profile
        const newProfile = await patientprofile.create(newProfileData);
        console.log(newProfile);

        // Send response
        return res.status(201).json({
            success: true,
            message: "Successfully built profile",
            newProfile
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});












// router.post('/profile/:id', uploads.single('Avathar'), validate(profile), async (req: Request, res: Response, next: NextFunction) => {
//     const id = req.params.id;

//     try {
//         // Check if patient exists
//         const patients = await patient.findById(id);
//         if (!patients) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No patient found with this id"
//             });
//         };
        

//         // Destructure request body
//         const { firstname, lastname, email, age, address, insurance, insuranceName, number, person, mobileNumber, expirydate, nomineename, nomineeage, totalsum }: profile = req.body;

//         // Create patient profile based on insurance status
//         let newProfileData: any = {
//             patient: id,
//             firstname,
//             lastname,
//             email,
//             age,
//             address,
//             Avathar: req.file?.filename
//         };

//         if (insurance && insurance === true) {
//             newProfileData = {
//                 ...newProfileData,
//                 insuranceName,
//                 number,
//                 person,
//                 mobileNumber,
//                 expirydate,
//                 nomineename,
//                 nomineeage,
//                 totalsum
//             };
//         }
        
//         // Create new patient profile
//         const newProfile = await patientprofile.create(newProfileData);
//         console.log(newProfile)

//         // Send response
//         return res.status(201).json({
//             success: true,
//             message: "Successfully built profile",
//             newProfile
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// });


router.get('/profile/:id',async(req:Request,res:Response,next:NextFunction)=>{
    const id = req.params.id;
    try{
        const patients = await patient.findById(id);
        if(!patients){
            return res.status(404).json({
                success:false,
                message:"no patient found with the id"
            })
        }
        const profile = await patientprofile.findOne({patient:id})
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




//get the doctors
router.get('/doctors/:id',async(req:Request,res:Response,next:NextFunction)=>{
    const id = req.params.id;
    try{
        const user = await patient.findById(id);
        if(!user){
            return res.status(404).json({
                success:false,
                message:"no patient found in this id"
            })
        }
        const doctors = await Doctor.find().exec();
        if(doctors.length === 0){
            return res.status(404).json({
                success:false,
                message:"no doctors found"
            })
        }else{
            return res.status(200).json({
                success:true,
                doctors:doctors
            })
        }


    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
});




interface FilterQuery {
    gender?: string;
    specilization?: string;
    minPrice?: number; // Change to number to represent the minimum price
    maxPrice?: number; // Change to number to represent the maximum price
    firstname?: string;
}

router.get('/filterdoctor/:id',  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id; // Extracting ID from params

    try {
        const patients = await patient.findById(id);
        if (!patients) {
            return res.status(404).json({
                success: false,
                message: "No patient with this id"
            });
        }

        const { gender, specilization, minPrice, maxPrice, firstname }: FilterQuery = req.query;

        if (gender || specilization || minPrice || maxPrice || firstname) {
            const query: any = {};

            if (gender) query.gender = gender;
            if (specilization) query.specilization = specilization;
            if (minPrice) query.price = { $gte: minPrice }; // Use $gte for greater than or equal to minPrice
            if (maxPrice) query.price = { ...query.price, $lte: maxPrice }; // Use $lte for less than or equal to maxPrice
            if (firstname) query.name = firstname;

            const doctors = await Doctor.find(query);
           if(doctors.length === 0){
            return res.status(404).json({
                success:false,
                message:"No Doctor found"
            })
           }
            return res.status(200).json({
                success: true,
                doctors: doctors
            });
        } else {
            return res.status(400).json({
                success: false,
                message: "Please provide at least one filtering criteria"
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









const storages = multer.diskStorage({
    destination:'reports',
    filename:(req:any,file:any,cb:any)=>{
        const unisuffix = uuidv4();
        const fileextension = path.extname(file.originalname);
        cb(null,file.fieldname+ '-' + unisuffix+fileextension)

    }
})



const upload = multer({ storage: storages });





//let payment: { method: string; name?: string; number?: number; person?: string; mobileNumber?: string; email?: string; expirydate?: string; nomineename?: string; nomineeage?: string; totalsum?: string } | null = null;





//booking doctor
// router.post('/bookdoctor/:patientid/:doctorid', upload.single('report'), async (req, res, next) => {
//     const patientId = req.params.patientid;
//     const doctorId = req.params.doctorid;
//     const { date, time, firstname, lastname, email, phone, reason, description,
//         address, emergency, paymentMethod, name, cardnumber, expireymonth,insuranceName,
//         expiryyear, cvv, totalsum, number, person, mobileNumber, expirydate, nomineename, nomineeage } = req.body;

//     try {
//         // Check if patient exists
//         const patients = await patient.findById(patientId);
//         if (!patients) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No patient found with this id"
//             });
//         }

//         // Check if doctor exists
//         const doctor = await model.findById(doctorId);
//         if (!doctor) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No doctor found with this id"
//             });
//         }

//         // Check if doctor price exists
//         const doctors = await Doctor.findOne({ doctor: doctorId });
//         if (!doctors) {
//             return res.status(404).json({
//                 success: false,
//                 message: "No doctor found with this id"
//             });
//         }

//         // Initialize payment property
//         let payment: { method: string;insuranceName?:string, name?: string; cardnumber?: string; expireymonth?: string; expiryyear?: string; cvv?: string; } | { method: string; insuranceName?:string; number?: number; person?: string; mobileNumber?: string; email?: string; expirydate?: string; nomineename?: string; nomineeage?: string; totalsum?: string; } | null = null;

//         // Assign payment details based on payment method
//         if (paymentMethod === 'card') {
//             if (!name || !cardnumber || !expireymonth || !expiryyear || !cvv) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Please provide all required card details"
//                 });
//             }
//             payment = { method: paymentMethod, name, cardnumber, expireymonth, expiryyear, cvv };

//         } else if (paymentMethod === 'insurance') {
//             if (!insuranceName || !number || !person || !mobileNumber || !email || !expirydate || !nomineename || !nomineeage || !totalsum) {
//                 return res.status(400).json({
//                     success: false,
//                     message: "Please provide all required insurance details"
//                 });
//             }
//             payment = { method: paymentMethod, insuranceName, number, person, mobileNumber, email, expirydate, nomineename, nomineeage, totalsum };

//         } else {
//             return res.status(400).json({
//                 success: false,
//                 message: "Invalid payment method"
//             });
//         }

//         // Create a new appointment booking
//         const booking = new Book({
//             amount: doctors.price,
//             date,
//             time,
//             firstname,
//             lastname,
//             email,
//             phone,
//             reason,
//             description,
//             address,
//             report: req.file ? req.file.filename : null,
//             emergency,
//             paymentmethod: paymentMethod,
//             patient: patientId,
//             doctor: doctorId,
//             payment: [payment] // Assigning the initialized payment object
//         });

//         // Save the booking
//         await booking.save();
        
//         return res.status(201).json({
//             success: true,
//             message: "Appointment booked successfully",
//             booking
//         });
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({
//             success: false,
//             message: "Internal server error"
//         });
//     }
// });


//new book
router.post('/bookdoctor/:patientid/:doctorid',  upload.single('report'), async (req, res, next) => {
    const patientId = req.params.patientid;
    const doctorId = req.params.doctorid;
    const { date, time, firstname, lastname, email, phone, reason, description,
        address, emergency, paymentMethod, name, cardnumber, expireymonth, insuranceName,
        expiryyear, cvv, totalsum, number, person, mobileNumber, expirydate, nomineename, nomineeage } = req.body;

    try {
        // Check if patient exists
        const patients = await patientprofile.findOne({patient:patientId});
        console.log(patients)
        if (!patients) {
            return res.status(404).json({
                success: false,
                message: "First Build Profile Then Book Doctor"
            });
        }

        // Check if doctor exists
        const doctor = await model.findById(doctorId);
        if (!doctor) {
            return res.status(404).json({
                success: false,
                message: "No doctor found with this id"
            });
        }

        // Check if doctor price exists
        const doctorPrice = await Doctor.findOne({ doctor: doctorId });
        if (!doctorPrice) {
            return res.status(404).json({
                success: false,
                message: "No doctor found with this id"
            });
        }

        // Check if insurance chosen and patient has insurance
        if (paymentMethod === 'insurance') {
            if (!patients.insurance) {
                return res.status(400).json({
                    success: false,
                    message: "Patient is not eligible for insurance payment"
                });
            }
        }

        // Check if emergency and report uploaded
        if (emergency && !req.file) {
            return res.status(400).json({
                success: false,
                message: "Your details does not match criteria for using emergency case"
            });
        }

        // Initialize payment property
        let payment = null;
        let payments: { method: string; insuranceName?: string; name?: string; cardnumber?: string; expireymonth?: string; expiryyear?: string; cvv?: string; } | { method: string; insuranceName?: string; number?: number; person?: string; mobileNumber?: string; email?: string; expirydate?: string; nomineename?: string; nomineeage?: string; totalsum?: string; } | null = null;


        // Assign payment details based on payment method
        if (paymentMethod === 'card') {
            if (!name || !cardnumber || !expireymonth || !expiryyear || !cvv) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide all required card details"
                });
            }
            payments = { method: paymentMethod, name, cardnumber, expireymonth, expiryyear, cvv };

        } else if (paymentMethod === 'insurance') {
            if (!insuranceName || !number || !person || !mobileNumber || !email || !expirydate || !nomineename || !nomineeage || !totalsum) {
                return res.status(400).json({
                    success: false,
                    message: "Please provide all required insurance details"
                });
            }
            payments = { method: paymentMethod, insuranceName, number, person, mobileNumber, email, expirydate, nomineename, nomineeage, totalsum };
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid payment method"
            });
        }

        // Create a new appointment booking
        const booking = new Book({
            amount: doctorPrice.price,
            date,
            time,
            firstname,
            lastname,
            email,
            phone,
            reason,
            description,
            address,
            report: req.file ? req.file.filename : null,
            emergency,
            paymentmethod: paymentMethod,
            patient: patientId,
            doctor: doctorId,
            payment: [payment] // Assigning the initialized payment object
        });

        // Save the booking
        await booking.save();

        return res.status(201).json({
            success: true,
            message: "Appointment booked successfully",
            booking
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});













//get the book the doctor
router.get('/myappointment/:id',async(req:Request,res:Response,next:NextFunction)=>{
    const id = req.params.id;
    try{
        const patients = await patient.findById(id);
        if(!patients){
            return res.status(404).json({
                success:false,
                message:"no patient found with the id"
            })
        }
        
        

        const appointment = await Book.find({ patient: id }).populate('doctor');

        
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


//view the report
router.post('/feedback/:patientid/:doctorid',async(req:Request,res:Response,next:NextFunction)=>{
    const patientid = req.params.patientid;
    const doctorid = req.params.doctorid;
    try{
        const patient = await Book.findOne({patient:patientid , doctor:doctorid});
        if(!patient){
            return res.status(404).json({
                success:false,
                message:"no appointment "
            })
        }
       
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error"
        })
    }
})


//get the reports
router.get('/reports/:id',async(req:Request,res:Response,next:NextFunction)=>{
    const id = req.params.id;
    try{
        const patients= await patient.aggregate([
            {
                $match:{
                    _id:new mongoose.Types.ObjectId(id)
                }
            }
        ])
        if(!patients){
            return res.status(404).json({
                success:false,
                message:"no patient found in this id"
            })
        }
       const reports = await Sendreport.aggregate([
        {$match:{
            patient: new mongoose.Types.ObjectId(id)
        }}
       ]);
       if(reports.length === 0){
        return res.status(404).json({
            success:false,
            message:"no reports found with the patient"
        })
       }
       return res.status(200).json({
        success:true,
        report:reports
       })
    }catch(error){
        console.log(error)
    }
})


//old appointment
router.get('/lastappointment/:id',  async (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    try {
        // Check if the patient exists
        const patients = await patient.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(id)
                }
            }
        ]);
        if (!patients || patients.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No patient found with this id"
            });
        }

        // Get the current date and time
        const currentdate = new Date();
        const date = currentdate.toISOString().split('T')[0]; 
        const time = currentdate.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' }); 
        console.log(date)
        console.log(time)
        // Find the last appointment for the patient
        const lastAppointment = await Book.aggregate([
            {
                $match: {
                    patient: new mongoose.Types.ObjectId(id),
                    date: { $lt: currentdate },
                    time: { $lte: time }
                }
            },
            {
                $sort: {
                    date: -1,
                    time: -1
                }
            },
            {
                $limit: 5
            },{
                $lookup:{
                    from:Doctor.collection.name,
                    localField:"doctor",
                    foreignField:"doctor",
                    as:'doctors'
                }
            }
        ]);
      console.log(lastAppointment)
        if (lastAppointment.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No appointments found"
            });
        }

        return res.status(200).json({
            success: true,
            lastAppointment: lastAppointment
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        });
    }
});




//give feedbackform


router.post('/feedbackform/:patientid/:doctorid/:bookid',  async (req: Request, res: Response, next: NextFunction) => {
    const patientId: string = req.params.patientid;
    const doctorId: string = req.params.doctorid;
    const bookid : string = req.params.bookid as string;

    try {
        // Check if patient exists
        const patientExists = await patient.findById(patientId);
        if (!patientExists) {
            return res.status(404).json({
                success: false,
                message: "No patient found with this ID"
            });
        }

        // Check if doctor exists
        const doctorExists = await model.findById(doctorId);
        if (!doctorExists) {
            return res.status(404).json({
                success: false,
                message: "No doctor found with this ID"
            });
        }
        const appointement = await Book.findOne({_id:bookid,patient:patientId});
        if(!appointement){
            return res.status(400).json({
                success:false,
                message:"no appointment found"
            })
        }

        const feedback = await feedbackform.findOne({patient:patientId,appointment:bookid});
        if(feedback){
            return res.status(400).json({
                success:false,
                message:"Feedback already Given"
            })
        }

        const { rating, text }: { rating: number, text: string } = req.body;

        // Validate rating
        if (typeof rating !== 'number' || rating < 1 || rating > 5) {
            return res.status(400).json({
                success: false,
                message: "Rating must be a number between 1 and 5"
            });
        }

        // Create new feedback
        const newFeedback = await feedbackform.create({
            patient: patientId,
            doctor: doctorId,
            rating: rating,
            text: text,
            appointment:bookid,
            date: Date.now()
        });

        if (newFeedback) {
            return res.status(201).json({
                success: true,
                message: 'Feedback successfully sent',
                newFeedback
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





router.get('/doctor/:id',verifytoken,async(req:Request,res:Response,next:NextFunction)=>{
    const id : string = req.params.id as string;
    try{
        const doctors = await Doctor.findOne({doctor:id})
        if(!doctors){
            return res.status(404).json({
                success:false,
                message:"no doctour found"
            })
        }else{
            return res.status(200).json({
                success:true,
                doctor:doctors
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









interface PatientRequest extends Request {
    patientid?: string; // Define the patientid property as optional
}

router.post('/logout/:id',   async (req: PatientRequest, res: Response, next: NextFunction) => {
    const id: string = req.params.id as string;
    try {
        const patients = await patient.findById(id);
        if (!patients) {
            return res.status(404).json({
                success: false,
                message: "Internal server error"
            });
        } else {
            res.clearCookie('patienttoken'); // Clear the patienttoken cookie
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



//transaction
router.get('/transaction/:id', async(req:Request,res:Response,next:NextFunction)=>{
    const id = req.params.id;
    try{
        const  doctor = await patient.findById(id);
        if(!doctor){
            return res.status(404).json({
                success:false,
                messgae:"no doctor found with this id"
            })
        }
        
        const appointment = await Book.aggregate([
            {
              $match: {
                patient: new mongoose.Types.ObjectId(id),
                
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








export default router








