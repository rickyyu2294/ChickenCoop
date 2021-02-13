const Joi = require('Joi');

module.exports.coopSchema = Joi.object({
    coop: Joi.object({
        name: Joi.string().required(),
        image: Joi.string().allow('', null),
        description: Joi.string().allow('', null)
    }).required()
});