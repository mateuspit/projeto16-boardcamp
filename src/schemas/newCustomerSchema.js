import Joi from "joi";

export const newCustomerSchema = Joi.object({
    name: Joi.string().required().min(1),
    phone: Joi.string().min(10).max(11).required(),
    cpf: Joi.string().required().length(11),
    birthday: Joi.string().regex(/^\d{4}-\d{2}-\d{2}$/).required()
});