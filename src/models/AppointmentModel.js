import mongoose from 'mongoose';

const appointmentSchema= new mongoose.Schema({
    datetime:{
        type: Date,
        required: true,
    },
    doctorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Doctor',
        required: true,
    },
    patientId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Patient'
    }
});

const AppointmentModel= mongoose.model('Appointment',appointmentSchema);
export default AppointmentModel;
