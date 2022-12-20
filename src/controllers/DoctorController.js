import { StatusCodes } from "http-status-codes";
import DoctorModel from "../models/DoctorModel.js";
import bcrypt from 'bcrypt';

export async function saveDoctor(request,response){
    try {
        request.body['password']=bcrypt.hashSync(request.body.password,12)
        const doctor=new DoctorModel(request.body);
        const savedDoctor=await doctor.save();
        response.status(StatusCodes.CREATED).json(savedDoctor);
    } catch (error) {
        console.log(error);
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({message:'Error in saving doctor'});
    }
}

export async function login(request,response){
    try {
        const doctor=await DoctorModel.findOne({phone: request.body.phone});
        if(doctor){
            if (bcrypt.compareSync(request.body.password, doctor.password)) {
                const token=jwt.sign({doctorId:doctor._id},process.env.DOCTOR_PRIVATE_KEY); 
                response.status(StatusCodes.OK).json({token});
            }
            else{
                response.status(StatusCodes.BAD_REQUEST).json({message:'Invalid password'});
            }
        }
        else{
            response.status(StatusCodes.BAD_REQUEST).json({message: 'Invalid Ph'})
        }
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({message:'Error in login'});
    }
}

export async function getAllDoctors(request,response){
    try {
        const doctors=await DoctorModel.find();
        response.status(StatusCodes.OK).json(doctors);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({message:'Error in fetching doctors'});
    }
}