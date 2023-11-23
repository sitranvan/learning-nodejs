const jwt = require('jsonwebtoken')
const ErrorResponse = require('../response/ErrorResponse')

const jwtAuth = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new ErrorResponse(401, 'Unauthorized')
    }
    const token = authHeader.split(' ')[1]
    if (!token) throw new ErrorResponse(401, 'Unauthorized')

    try {
        const user = jwt.verify(token, 'secret-key')
        req.user = user
    } catch (err) {
        throw new ErrorResponse(401, 'Unauthorized')
    }
    next()
}

module.exports = jwtAuth
