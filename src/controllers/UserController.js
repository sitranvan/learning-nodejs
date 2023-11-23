const catchMiddleware = require('../middlewares/catchMiddleware')
const Address = require('../models/Address')
const User = require('../models/User')

class UserController {
    update = catchMiddleware(async (req, res, next) => {
        const { city, province, address, zip, phone } = req.body
        const { id: userId } = req.user

        // check if user has an address
        // if so, update it
        // if not, create one
        const isExistedAddress = await Address.findOne({ where: { userId } })

        if (isExistedAddress) {
            await isExistedAddress.update({
                city,
                province,
                address,
                zip,
                phone
            })
        } else {
            await Address.create({
                city,
                province,
                address,
                zip,
                phone,
                userId
            })
        }

        res.json({
            success: true,
            message: 'Address updated successfully'
        })
    })

    getMe = catchMiddleware(async (req, res, next) => {
        const { id: userId } = req.user
        const user = await User.findByPk(userId, {
            attributes: {
                exclude: ['password']
            },
            include: [
                {
                    model: Address,
                    attributes: ['city', 'address'],
                    attributes: {
                        exclude: ['address']
                    },
                    as: 'address'
                }
            ]
        })
        res.status(200).json({
            success: true,
            data: user
        })
    })
}

module.exports = new UserController()
