import mongoose from "mongoose";

const patientModel = new mongoose.Schema({
    firstname:{
        type:String
    },
    lastname:{
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    }
});

const patient = mongoose.model('patientModel',patientModel);

export default patient