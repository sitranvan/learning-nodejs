const catchMiddleware = require('../middlewares/catchMiddleware')
const User = require('../models/User')
const ErrorResponse = require('../response/ErrorResponse')

class RoleController {
    makeOwner = catchMiddleware(async (req, res, next) => {
        const { userId } = req.body

        // check existed user
        const user = await User.findOne({ where: { id: userId } })
        if (!user) {
            throw new ErrorResponse(404, 'User not found')
        }

        await User.update(
            {
                roleId: 3
            },
            {
                where: {
                    id: userId
                }
            }
        )

        res.status(200).json({
            success: true,
            message: 'Make Owner Success'
        })
    })
}

module.exports = new RoleController()
