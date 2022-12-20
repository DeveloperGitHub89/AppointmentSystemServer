import { StatusCodes } from "http-status-codes";
import ClinicModel from "../models/ClinicModel.js";

export async function saveClinic(request, response) {
    try {
        const clinic=new ClinicModel(request.body);
        const savedClinic=await clinic.save();
        response.status(StatusCodes.CREATED).json(savedClinic);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({message:'Error in saving clinic'});
    }
}
export async function getAllClinics(request,response) {
    try {
        const clinics=await ClinicModel.find();
        response.status(StatusCodes.OK).json(clinics);
    } catch (error) {
        response.status(StatusCodes.INTERNAL_SERVER_ERROR)
        .json({message:'Error in fetching clinic'});
    }

}