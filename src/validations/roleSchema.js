const Joi = require('joi')

const makeRole = Joi.object({
    userId: Joi.number().required()
})

module.exports = { makeRole }
