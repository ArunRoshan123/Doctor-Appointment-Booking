import mongoose from 'mongoose';

const CreditCardSchema = new mongoose.Schema({
    name: { type: String },
    cardnumber: { type: String },
    expireymonth: { type: String },
    expiryyear: { type: String },
    cvv: { type: String }
});

const InsuranceSchema = new mongoose.Schema({
    insuranceName: { type: String },
    number:{type:Number},
    person:{type:String},
    mobileNumber:{type:String},
    email:{type:String},
    expirydate:{type:String},
    nomineename:{type:String},
    nomineeage:{type:String},
    totalsum:{type:String}
});

const BookSchema = new mongoose.Schema({
    patient:{type:mongoose.SchemaTypes.ObjectId, ref:'patientModel'},
    doctor:{type:mongoose.SchemaTypes.ObjectId,ref:'doctor'},
    amount:{type:String},
    date: { type: Date },
    time: { type: String },
    firstname: { type: String },
    lastname: { type: String },
    email: { type: String },
    phone: { type: String },
    reason: { type: String },
    description: { type: String },
    Address: { type: String },
    report: { type: String },
    emergency:{type:Boolean },
    paymentmethod:{type:String},
    payment: { type: [CreditCardSchema, InsuranceSchema] } 
});

const Book = mongoose.model('Book', BookSchema);

export default Book;
