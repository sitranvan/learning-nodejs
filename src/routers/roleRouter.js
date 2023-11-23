const { Router } = require('express')
const validator = require('../middlewares/validator')
const roleSchema = require('../validations/roleSchema')
const roleController = require('../controllers/roleController')

const roleRouter = Router()

roleRouter.patch('/', validator(roleSchema.makeRole), roleController.makeOwner)

module.exports = roleRouter
