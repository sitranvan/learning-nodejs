const Joi = require('joi')

const create = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    amount: Joi.number().required(),
    categoryId: Joi.number().required()
})

const update = Joi.object({
    name: Joi.string(),
    description: Joi.string(),
    price: Joi.number(),
    amount: Joi.number(),
    categoryId: Joi.number()
})

module.exports = {
    create,
    update
}
