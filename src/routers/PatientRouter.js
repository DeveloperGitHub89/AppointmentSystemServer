import express from 'express';
import { getPatientById, login, savePatient } from '../controllers/PatientController.js';
import { verifyToken } from '../middlewares/VerifyToken.js';
import 'dotenv/config';

const patientRouter=express.Router();

patientRouter.post('/',savePatient);
patientRouter.get('/:id',getPatientById);
patientRouter.post('/login',login);

export default patientRouter;