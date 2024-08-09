import mongoose from "mongoose";

const Profile = new mongoose.Schema({
    doctor:{
        type:mongoose.SchemaTypes.ObjectId,
        ref:'doctor'

    },
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    qualification:{
        type:String
    },
    university:{
        type:String
    },
    email:{
        type:String
    },
    specilization:{
        type:String
    },
    about:{
        type:String
    },
    gender:{
        type:String
    },
    price:{
      type:String
    },
    Avathar:{
        type:String
    }
});


const Doctor = mongoose.model('Profile',Profile);

export default Doctor