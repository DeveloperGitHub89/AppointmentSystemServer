import { StatusCodes } from "http-status-codes";
import AppointmentModel from "../models/AppointmentModel.js";
import DoctorModel from "../models/DoctorModel.js";

export async function saveAppointment(request,response){
    try {
        const appointment=new AppointmentModel(request.body);
        const savedApointment=await appointment.save();
        response.status(StatusCodes.CREATED).json(savedApointment);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Error in saving appointment' });
    }
}

export async function bookAppointment(request,response){
    try {
       await AppointmentModel.findByIdAndUpdate(request.params.id,{patientId:request.params.patientId})
       response.status(StatusCodes.NO_CONTENT).json();
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Error in booking appointment' });
    }
}

export async function getAppointments(request,response){
    try {
       const doctors=await DoctorModel
       .find({clinicId:request.params.clinicId},{_id:1});

        const appointments=await AppointmentModel
        .find({doctorId:{$in:doctors.map(d=>d._id)}});

        response.status(StatusCodes.OK).json(appointments);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({ message: 'Error in fetching appointments' }); 
    }
}