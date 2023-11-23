const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const catchMiddleware = require('../middlewares/catchMiddleware')
const User = require('../models/User')
const ErrorResponse = require('../response/ErrorResponse')
const emailService = require('../services/EmailService')
const generateOtp = require('../utils/otp')
const RegisterOtp = require('../models/RegisterOtp')
const randomBytes = require('../utils/randomBytes')
const ForgotToken = require('../models/ForgotToken')

class AuthController {
    register = catchMiddleware(async (req, res) => {
        const { username, email, password } = req.body

        // check username
        const isExistedUsername = await User.findOne({ where: { username } })
        if (isExistedUsername) {
            throw new ErrorResponse(409, 'Username already exists')
        }

        // check email
        const isExistedEmail = await User.findOne({ where: { email } })
        if (isExistedEmail) {
            throw new ErrorResponse(409, 'Email already exists')
        }

        // hash password
        const hashedPassword = bcrypt.hashSync(password)

        // create user
        await User.create({
            username,
            email,
            password: hashedPassword
        })
        const otp = generateOtp()
        const registerOtp = new RegisterOtp({
            email,
            otp
        })
        // việc 1
        await registerOtp.save()
        // gửi mail

        // việc 2 send otp
        await emailService.sendMail({
            to: email,
            subject: 'Your OPT',
            html: `<h1>Your OPT Code: ${otp} </h1>`
        })

        // await Promise.all([
        //     registerOtp.save(),
        //     emailService.sendMail({
        //         to: email,
        //         subject: 'Your OPT',
        //         html: `<h1>Your OPT Code: ${otp} </h1>`
        //     })
        // ])

        res.status(201).json({
            success: true,
            message: 'User created successfully'
        })
    })

    login = catchMiddleware(async (req, res) => {
        const { email, password } = req.body
        // check user exists
        const user = await User.findOne({ where: { email } })
        if (!user) {
            throw new ErrorResponse(404, 'Unauthorized')
        }
        // check password
        const isMatch = bcrypt.compareSync(password, user.password)
        if (!isMatch) {
            throw new ErrorResponse(401, 'Unauthorized')
        }

        // create token
        const token = jwt.sign(
            {
                id: user.id
            },
            'secret-key',
            {
                expiresIn: 86400
            }
        )

        // send response
        res.status(200).json({
            success: true,
            token
        })
    })

    verifyOtp = catchMiddleware(async (req, res, next) => {
        const { otp, email } = req.body

        const user = await RegisterOtp.findOne({
            email
        })

        if (!user) {
            throw new ErrorResponse(401, 'Unauthorized')
        }
        if (user.otp !== otp) {
            throw new ErrorResponse(400, 'Can not verify otp')
        }

        // update user mysql
        await User.update(
            {
                isVerified: true
            },
            {
                where: {
                    email
                }
            }
        )

        // delete trong mongo
        await RegisterOtp.deleteOne({
            email
        })
        res.status(200).json({
            success: true,
            message: 'Verified otp successfully'
        })
    })

    changePassword = catchMiddleware(async (req, res, next) => {
        const { oldPassword, newPassword } = req.body
        const { id: userId } = req.user
        const user = await User.findByPk(userId)

        const isMatch = bcrypt.compareSync(oldPassword, user.password)

        if (!isMatch) {
            throw new ErrorResponse(400, 'Invalid password')
        }

        if (oldPassword === newPassword) {
            throw new ErrorResponse(400, 'New password must be different from old password')
        }

        const hashedPassword = bcrypt.hashSync(newPassword)
        await user.update({
            password: hashedPassword
        })
        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        })
    })

    forgotPassword = catchMiddleware(async (req, res, next) => {
        const { email } = req.body

        // vì email để unique nên chỉ tồn tại một email và 1 token trong bảng
        const existsToken = await ForgotToken.findOne({ email })
        if (existsToken) {
            throw new ErrorResponse(400, 'Please check your email address')
        }

        const user = await User.findOne({
            where: { email }
        })
        if (!user) {
            throw new ErrorResponse(404, 'User not found')
        }
        // generate forgot password token
        const token = randomBytes(32)

        // save token database
        const forgotPasswordToken = new ForgotToken({
            email,
            token
        })
        await forgotPasswordToken.save()

        // send mail
        // env CLIENT_URL = https://localhost:3000
        const link = `http://localhost:3000/forgot-password/${token}`
        await emailService.sendMail({
            to: email,
            subject: 'Forgot Password',
            html: `<h1> CLick <a href="${link}">Here</a> to reset password!</h1>`
        })

        res.status(200).json({
            success: true,
            message: 'Please check your email to reset password'
        })
    })

    verifyForgotToken = catchMiddleware(async (req, res, next) => {
        const { token } = req.body
        const tokenMongo = await ForgotToken.findOne({ token })

        if (!tokenMongo) {
            throw new ErrorResponse(400, 'Invalid token')
        }

        res.status(200).json({
            success: true,
            message: 'Verified token successfully',
            email: tokenMongo.email
        })
    })

    resetPassword = catchMiddleware(async (req, res, next) => {
        const { email, token, newPassword } = req.body

        // trường hợp hết hạn vì token phải luôn tồn tại trong thời gian update
        const tokenMongo = await ForgotToken.findOne({ token, email })

        if (!tokenMongo) {
            throw new ErrorResponse(400, 'Invalid token')
        }
        const hashedPassword = bcrypt.hashSync(newPassword)

        await User.update(
            {
                password: hashedPassword
            },
            {
                where: { email }
            }
        )

        await ForgotToken.deleteOne({
            email
        })
        res.status(200).json({
            success: true,
            message: 'Reset password successfully'
        })
    })
}

module.exports = new AuthController()
