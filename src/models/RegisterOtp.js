const { Schema, model } = require('mongoose')

const RegisterOtp = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        otp: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
)

// tạo index để sử lí hết hạn tính thời gian từ khi tạo và 300s sao sẽ tự động remove
RegisterOtp.index({ createdAt: 1 }, { expireAfterSeconds: 5 })
module.exports = model('RegisterOtp', RegisterOtp)
