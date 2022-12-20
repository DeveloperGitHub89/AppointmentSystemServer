import Joi from "joi";

export const patientValidationSchema=Joi.object({
    name:Joi.string().required(),
    dob:Joi.string().required(),
    gender:Joi.string().required(),
    email:Joi.string().email().required(),
    password:Joi.string().min(4).max(8).required(),
    phone:Joi.string().length(10).required(),
    address:Joi.string().required()
})