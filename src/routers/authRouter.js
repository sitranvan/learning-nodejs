const { Router } = require('express')
const validator = require('../middlewares/validator')
const authSchema = require('../validations/authSchema')
const authController = require('../controllers/AuthController')
const jwtAuth = require('../middlewares/jwtAuth')
const authRouter = Router()

authRouter.post('/register', validator(authSchema.register), authController.register)
authRouter.post('/login', validator(authSchema.login), authController.login)
authRouter.post('/verify', validator(authSchema.verifyOtp), authController.verifyOtp)
authRouter.patch('/change-password', jwtAuth, validator(authSchema.changePassword), authController.changePassword)
authRouter.post('/forgot-password', validator(authSchema.forgotPassword), authController.forgotPassword)
authRouter.post('/verify-token', validator(authSchema.verifyForgotToken), authController.verifyForgotToken)
authRouter.post('/reset-password', validator(authSchema.resetPassword), authController.resetPassword)

module.exports = authRouter
