import mongoose from "mongoose";

const patientSchema=new mongoose.Schema({
    name:{type:String,required:true},
    dob:{type:Date,required:true},
    gender:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:String,required:true},
    address:{type:String,required:true}
});

const PatientModel = mongoose.model('Patient',patientSchema);
export default PatientModel;