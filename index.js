import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { configureDb } from './src/configs/DbConfig.js';
import patientRouter from './src/routers/PatientRouter.js';
import clinicRouter from './src/routers/ClinicRouter.js';
import doctorRouter from './src/routers/DoctorRouter.js';
import appointmentRouter from './src/routers/AppointmentRouter.js';

const app = express();

app.use(cors());

app.use(express.json());
app.use('/patient',patientRouter);
app.use('/clinic',clinicRouter);
app.use('/doctor',doctorRouter);
app.use('/appointments',appointmentRouter);
app.listen(process.env.SERVER_PORT,()=>{
    configureDb();
    console.log(`Server listening on port ${process.env.SERVER_PORT}`);
});