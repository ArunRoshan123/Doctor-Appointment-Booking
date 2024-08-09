import mongoose from "mongoose";

const feedbacks = new mongoose.Schema({
    patient:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'patientModel'
    },
    doctor:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'doctor'
    },
    appointment:{
        type:mongoose.Types.ObjectId,
        ref:'Book'
    },
    rating:{
        type:Number
    },
    text:{
        type:String
    },
    date:{
        type:Date
    }
})

const feedbackform = mongoose.model('feedbacks',feedbacks)

export default feedbackform