const { Router } = require('express')
const validator = require('../middlewares/validator')

const userSchema = require('../validations/userSchema')

const jwtAuth = require('../middlewares/jwtAuth')
const userController = require('../controllers/UserController')

const userRouter = Router()

userRouter.patch('/address', validator(userSchema.updateUser), jwtAuth, userController.update)
userRouter.get('/me', jwtAuth, userController.getMe)
module.exports = userRouter
