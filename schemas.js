const Joi = require('Joi');

module.exports.coopSchema = Joi.object({
    coop: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().allow('', null),
    }).required()
});

module.exports.chickenSchema = Joi.object({
    chicken: Joi.object({
        name: Joi.string().required(),
        description: Joi.string().allow('').allow(null),
        gender: Joi.string().required(),
        birthdate: Joi.date().required(),
    }).required()
});