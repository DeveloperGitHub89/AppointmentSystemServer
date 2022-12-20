import mongoose from 'mongoose';

const doctorSchema=new mongoose.Schema({
    name: {
            type: String,
            required: true
    },
    email: {
            type: String,
            required: true
    },
    phone: {
            type: String,
            required: true
    },
    password: {
            type: String,
            required: true
    },
    experience:{
        type: Number,
        required: true
    },
    qualification: {
        type: String,
        required: true
    },
    treatmentType:{
        type: String,
        required: true
    },
    clinicId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Clinic"
      }

});

const DoctorModel = mongoose.model('Doctor',doctorSchema);

export default DoctorModel;
