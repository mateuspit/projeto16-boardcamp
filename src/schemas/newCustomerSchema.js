import Joi from "joi";

export const newCustomerSchema = Joi.object({
    name: Joi.string().required().min(1),
    phone: Joi.string().min(10).max(11).required(),
    cpf: Joi.string().required().length(11),
    birthday: Joi.string().pattern(/^([0-9]{4})-(0[1-9]|1[0-2])-([0-2][1-9]|3[0-1])$/).required()
    //string().pattern(/^([0-9]{4})-(0[1-9]|1[0-2])-([0-2][1-9]|3[0-1])$/)
});