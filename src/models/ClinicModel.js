import mongoose from 'mongoose';

const clinicSchema= new mongoose.Schema({
    name:{type:String, required:true},
    address:{type:String, required:true}
});

const ClinicModel = mongoose.model('Clinic',clinicSchema);
export default ClinicModel;
