import Joi from "joi"

export const querSchema = Joi.object({
    offset: Joi.number().integer().positive().min(1),
    limit: Joi.number().integer().positive().min(1),
    name: Joi.string(),
    cpf: Joi.string(),
    customerId: Joi.number().integer().positive().min(1),
    gameId: Joi.number().integer().positive().min(1),
    order: Joi.string()
    .valid("id", "name", "phone","cpf","birthday","image","stockTotal","pricePerDay"),
    desc: Joi.string().valid("true"),
    status: Joi.string().valid("open", "closed"),
    startDate: Joi.string().pattern(/^([0-9]{4})-(0[1-9]|1[0-2])-([0-2][1-9]|3[0-1])$/)
});