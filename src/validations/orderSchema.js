const Joi = require('joi')

const create = Joi.object({
    note: Joi.string(),
    products: Joi.array()
        .items(
            Joi.object({
                id: Joi.number().required(),
                quantity: Joi.number().required()
            })
        )
        .required()
})

module.exports = {
    create
}
