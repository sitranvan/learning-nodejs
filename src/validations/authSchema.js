const Joi = require('joi')

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(20).required()
})

const register = Joi.object({
    username: Joi.string().min(3).max(20).required(),
    password: Joi.string().min(6).max(20).required(),
    email: Joi.string().email().required()
})

const verifyOtp = Joi.object({
    email: Joi.string().email().required(),
    otp: Joi.string().required()
})

const changePassword = Joi.object({
    oldPassword: Joi.string().required(),
    newPassword: Joi.string().required()
})

const forgotPassword = Joi.object({
    email: Joi.string().email().required()
})
const verifyForgotToken = Joi.object({
    token: Joi.string().required()
})

const resetPassword = Joi.object({
    email: Joi.string().email().required(),
    token: Joi.string().required(),
    newPassword: Joi.string().required()
})
module.exports = { register, login, verifyOtp, changePassword, forgotPassword, verifyForgotToken, resetPassword }
