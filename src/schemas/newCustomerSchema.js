import Joi from "joi";

const newCustomerSchema = Joi.object({
    name: Joi.string().required()
});