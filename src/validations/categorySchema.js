const Joi = require('joi')

const create = Joi.object({
    name: Joi.string().required(),
    slug: Joi.string().required()
})

const update = Joi.object({
    name: Joi.string(),
    slug: Joi.string()
})

module.exports = {
    create,
    update
}
