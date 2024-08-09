import mongoose from "mongoose";

const patientprofileModel = new mongoose.Schema({
    patient:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'patientModel'
    },
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    email:{
        type:String
    },
    age:{
        type:String
    },
    address:{
        type:String
    },
    gender:{
        type:String
    },
    insurance:{
     type:Boolean
    },
    insuranceName: { type: String },
    number:{type:Number},
    person:{type:String},
    mobileNumber:{type:String},
    expirydate:{type:String},
    nomineename:{type:String},
    nomineeage:{type:String},
    totalsum:{type:String},
    Avathar:{
        type:String
    }
});

const patientprofile = mongoose.model('patientprofileModel',patientprofileModel);

export default patientprofile
