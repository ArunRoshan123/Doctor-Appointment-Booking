import mongoose from "mongoose";


const doctor = new mongoose.Schema({
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


let model = mongoose.model('doctor',doctor );


export default model