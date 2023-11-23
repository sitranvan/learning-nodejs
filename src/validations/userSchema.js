const Joi = require('joi')

const phonePattern = /^(?:\+84|0)[1-9]\d{8}$/

const updateUser = Joi.object({
    city: Joi.string(),
    province: Joi.string(),
    address: Joi.string(),
    zip: Joi.string(),
    phone: Joi.string().pattern(phonePattern)
})
module.exports = { updateUser }
