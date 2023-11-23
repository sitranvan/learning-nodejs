const catchMiddleware = require('../middlewares/catchMiddleware')

class CouponController {
    getCoupon = catchMiddleware(async (req, res) => {
        res.json({
            message: 'oke'
        })
    })
}

module.exports = new CouponController()
