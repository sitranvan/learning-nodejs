const catchMiddleware = require('../middlewares/catchMiddleware')
const Order = require('../models/Order')
const OrderProduct = require('../models/OrderProduct')
const Product = require('../models/Product')
const ErrorResponse = require('../response/ErrorResponse')

class OrderController {
    getAll = catchMiddleware(async (req, res, next) => {
        const { id: userId, roleId } = req.user

        let orders = []

        // Customer
        if (roleId == 2) {
            orders = await Order.findAll({
                where: {
                    userId
                },
                include: [
                    {
                        model: Product,
                        as: 'products'
                    }
                ]
            })
        }

        // Owner
        if (roleId == 3) {
            orders = await Order.findAll({
                include: [
                    {
                        model: Product,
                        as: 'products'
                    }
                ]
            })
        }

        res.status(200).json({
            success: true,
            data: orders
        })
    })

    getById = catchMiddleware(async (req, res, next) => {
        const { id: userId } = req.user
        const { id: orderId } = req.params
        const order = await Order.findOne({
            where: {
                id: orderId,
                userId
            },
            include: [
                {
                    model: Product,
                    as: 'products'
                }
            ]
        })

        if (!order) {
            throw new ErrorResponse(404, 'Order not found')
        }

        res.status(200).json({
            success: true,
            data: order
        })
    })

    create = catchMiddleware(async (req, res, next) => {
        const { note, products } = req.body
        const { id: userId } = req.user

        const order = await Order.create({ note, userId })

        Promise.all(
            products.map(async (product) => {
                await OrderProduct.create({
                    orderId: order.id,
                    productId: product.id,
                    quantity: product.quantity
                })
            })
        )
        // const productIds = products.map((product) => product.id)
        // const productQuantities = products.map((product) => product.quantity)
        // await order.addProducts(productIds, {
        //     through: {
        //         quantity: productQuantities
        //     }
        // })

        res.status(200).json({
            success: true,
            message: 'Order created successfully'
        })
    })

    delete = catchMiddleware(async (req, res, next) => {
        const { id } = req.params

        const order = await Order.destroy({
            where: {
                id
            }
            // Áp dụng cho xóa cứng không phải xóa mềm
            // include: [Product],
            // force: true
        })
        const orderProduct = await OrderProduct.destroy({
            where: {
                orderId: id
            }
        })
        if (!order) {
            throw new ErrorResponse(404, 'Order not found')
        }

        if (!orderProduct) {
            throw new ErrorResponse(404, 'Order Product not found')
        }

        res.status(200).json({
            success: true,
            message: 'Order deleted successfully'
        })
    })

    cancelOrder = catchMiddleware(async (req, res, next) => {
        const { id: userId, roleId } = req.user
        const { id } = req.params
        const { reason } = req.body

        const order = await Order.findOne({
            where: {
                id
            }
        })

        if (!order) {
            throw new ErrorResponse(404, 'Order not found')
        }

        const roleArrays = ['pending', 'approved']
        if (!roleArrays.includes(order.status)) {
            throw new ErrorResponse(403, 'You can not cancel this order')
        }

        const { userId: orderUserId } = order
        if (roleId == 2 && orderUserId != userId) {
            throw new ErrorResponse(403, 'You are not allowed to cancel this order')
        }

        if (roleId == 2 && order.status != 'pending') {
            throw new ErrorResponse(403, 'You can not cancel this order')
        }

        order.status = 'canceled'
        order.canceledBy = userId
        order.canceledAt = new Date()
        order.canceledReason = reason
        await order.save()

        res.status(200).json({
            success: true,
            message: 'Update order successfully'
        })
    })

    deliveryOrder = catchMiddleware(async (req, res, next) => {
        const { id } = req.params
        const order = await Order.findOne({
            where: { id }
        })
        if (!order) {
            throw new ErrorResponse(404, 'Order not found')
        }
        order.status = 'delivery'
        await order.save()

        res.status(200).json({
            success: true,
            message: 'Order delivery'
        })
    })

    doneOrder = catchMiddleware(async (req, res, next) => {
        const { id } = req.params
        const order = await Order.findOne({
            where: { id }
        })
        if (!order) {
            throw new ErrorResponse(404, 'Order not found')
        }
        order.status = 'done'
        order.receivedAt = new Date()
        await order.save()

        res.status(200).json({
            success: true,
            message: 'Order done'
        })
    })
}

module.exports = new OrderController()
