const { Router } = require('express')
const categoryController = require('../controllers/CategoryController')
const validator = require('../middlewares/validator')
const categorySchema = require('../validations/categorySchema')
const jwtAuth = require('../middlewares/jwtAuth')
const authorize = require('../middlewares/authorize')

const categoryRouter = Router()

categoryRouter.get('/', jwtAuth, authorize(3), categoryController.getAll)
categoryRouter.post('/', jwtAuth, authorize(2), validator(categorySchema.create), categoryController.create)
categoryRouter.delete('/:id', jwtAuth, authorize(3), categoryController.delete)
categoryRouter.patch('/:id', jwtAuth, authorize(3), validator(categorySchema.update), categoryController.update)

module.exports = categoryRouter
