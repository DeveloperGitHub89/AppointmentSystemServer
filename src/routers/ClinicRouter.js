import express from 'express';
import { getAllClinics, saveClinic } from '../controllers/ClinicController.js';

const clinicRouter=express.Router();

clinicRouter.get('/',getAllClinics);
clinicRouter.post('/',saveClinic);

export default clinicRouter;