const { Router } = require('express')
const validator = require('../middlewares/validator')
const orderSchema = require('../validations/orderSchema')
const jwtAuth = require('../middlewares/jwtAuth')
const orderController = require('../controllers/OrderController')
const authorize = require('../middlewares/authorize')
const cancelSchema = require('../validations/cancelSchema')

const orderRouter = Router()

orderRouter.get('/:id', jwtAuth, authorize(2), orderController.getById)
orderRouter.get('/', jwtAuth, authorize(2, 3), orderController.getAll)
orderRouter.post('/', validator(orderSchema.create), jwtAuth, authorize(2), orderController.create)
orderRouter.delete('/:id', jwtAuth, authorize(3), orderController.delete)
orderRouter.patch(
    '/cancel/:id',
    validator(cancelSchema.cancelled),
    jwtAuth,
    authorize(2, 3),
    orderController.cancelOrder
)
orderRouter.patch('/delivery/:id', jwtAuth, authorize(3), orderController.deliveryOrder)
orderRouter.patch('/done/:id', jwtAuth, authorize(3), orderController.doneOrder)

module.exports = orderRouter
