const { Router } = require('express')

const jwtAuth = require('../middlewares/jwtAuth')
const authorize = require('../middlewares/authorize')
const couponController = require('../controllers/CouponController')

const couponRouter = Router()

couponRouter.get('/', jwtAuth, authorize(2), couponController.getCoupon)
// couponRouter.post('/', jwtAuth, authorize(2), couponController.create)
// couponRouter.delete('/:id', jwtAuth, authorize(3), couponController.delete)
// couponRouter.patch('/:id', jwtAuth, authorize(3), couponController.update)

module.exports = couponRouter
