import express from 'express';
import { bookAppointment, getAppointments, saveAppointment } from '../controllers/AppointmentController.js';

const appointmentRouter=express.Router();

appointmentRouter.post('/',saveAppointment);
appointmentRouter.put('/:id/patient/:patientId',bookAppointment);
appointmentRouter.get('/clinic/:clinicId',getAppointments)

export default appointmentRouter;