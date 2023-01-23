import Joi from "joi";

export const movieSchema = Joi.object({
    name: Joi.string().required(),
    platform_id: Joi.number().required(),
    user_id: Joi.number().required(),
    genre_id: Joi.number().required(),
    status: Joi.string().valid("watched", "waiting").required()
})

export const userSchema = Joi.object({
    name: Joi.string().required(),
    cpf: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    phone: Joi.string().min(10).max(11).pattern(/^[0-9]+$/).allow("")
});