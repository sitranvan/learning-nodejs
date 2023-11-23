const Joi = require('joi')

const cancelled = Joi.object({
    reason: Joi.string().required()
})

module.exports = { cancelled }
