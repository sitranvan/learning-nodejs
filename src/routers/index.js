const authorize = require('../middlewares/authorize')
const jwtAuth = require('../middlewares/jwtAuth')
const authRouter = require('./authRouter')
const categoryRouter = require('./categoryRouter')
const productRouter = require('./productRouter')
const orderRouter = require('./orderRouter')
const roleRouter = require('./roleRouter')
const userRouter = require('./userRouter')
const fileRouter = require('./fileRouter')
const couponRouter = require('./couponRouter')
const { rateLimit } = require('express-rate-limit')
const MongoStore = require('rate-limit-mongo')
const limiter = rateLimit({
    store: new MongoStore({
        uri: 'mongodb://127.0.0.1:27017/uploads',
        // should match windowMs
        expireTimeMs: 1 * 60 * 1000,
        errorHandler: console.error.bind(null, 'rate-limit-mongo')
        // see Configuration section for more options and details
    }),
    windowMs: 1 * 60 * 1000, // 1 minute
    limit: 60,
    message: 'Too many requests form this IP',
    handler: (req, res, next, options) => {
        res.status(options.statusCode).json({
            success: false,
            message: options.message
        })
    }
})

const handleRouter = (app) => {
    app.use('/auth', authRouter)
    app.use('/role', jwtAuth, authorize(1), roleRouter)
    app.use('/user', userRouter)
    app.use('/category', categoryRouter)
    app.use('/product', limiter, productRouter)
    app.use('/order', orderRouter)
    app.use('/file', fileRouter)
    app.use('/coupon', couponRouter)
}
module.exports = handleRouter
