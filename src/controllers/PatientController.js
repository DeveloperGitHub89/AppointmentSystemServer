import { StatusCodes } from 'http-status-codes';
import PatientModel from '../models/PatientModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import { patientValidationSchema } from '../validation-schemas/PatientSchema.js';

export async function savePatient(request, response) {
    try {
        const { error, value } = patientValidationSchema.validate(request.body)
        if (error) {
            response.status(StatusCodes.BAD_REQUEST).json(error);
        }
        else {
            request.body=value;
            request.body['dob']=new Date(request.body.dob);
            request.body['password']=bcrypt.hashSync(request.body.password,12)
            const patient=new PatientModel(request.body);
            const savedPatient=await patient.save();
            response.status(StatusCodes.CREATED).json({savedPatient});
        }

    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Error in saving patient' });
    }
}

export async function getPatientById(request, response) {
    try {
        const patient = await PatientModel.findById(request.params.id);
        response.status(StatusCodes.OK).json(patient);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Error in fetching patient' });
    }
}

export async function login(request, response) {
    try {
        const patient = await PatientModel.findOne({ phone: request.body.phone });
        if (patient) {
            if (bcrypt.compareSync(request.body.password, patient.password)) {
                const token = jwt.sign({ patientId: patient._id }, process.env.PATIENT_PRIVATE_KEY);
                response.status(StatusCodes.OK).json({ token });
            }
            else {
                response.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid password' });
            }
        }
        else {
            response.status(StatusCodes.BAD_REQUEST).json({ message: 'Invalid Ph' })
        }
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
            .json({ message: 'Error in login' });
    }
}