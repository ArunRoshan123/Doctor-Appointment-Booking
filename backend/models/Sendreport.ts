import mongoose  from "mongoose";

const sendreports = new mongoose.Schema({
    doctor:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'doctor'
    },
    patient:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'patientModel'
    },
    reports:{
        type:String
    },
    date:{
        type:Date
    },
    Reason: { type: String, required: true } 
})


const Sendreport = mongoose.model('sendreports',sendreports);


export default Sendreport