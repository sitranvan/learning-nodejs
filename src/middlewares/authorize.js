const Role = require('../models/Role')
const User = require('../models/User')
const ErrorResponse = require('../response/ErrorResponse')
const catchMiddleware = require('./catchMiddleware')
const authorize = (...roles) =>
    catchMiddleware(async (req, res, next) => {
        const userId = req.user.id
        const user = await User.findByPk(userId, {
            include: {
                model: Role,
                as: 'roles'
            }
        })
        req.user.roleId = user.roleId
        if (!user) {
            throw new ErrorResponse(403, 'Forbidden')
        }

        if (!roles.includes(user.roleId)) {
            throw new ErrorResponse(403, 'Forbidden')
        }

        next()
    })

module.exports = authorize
