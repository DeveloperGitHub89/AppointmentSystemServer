import express from 'express';
import { getAllDoctors, login, saveDoctor } from '../controllers/DoctorController.js';

const doctorRouter=express.Router();

doctorRouter.post('/',saveDoctor);
doctorRouter.post('/login',login);
doctorRouter.get('/',getAllDoctors);

export default doctorRouter;