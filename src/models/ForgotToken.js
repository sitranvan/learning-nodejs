const { Schema, model } = require('mongoose')

const ForgotToken = new Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true
        },
        token: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true
    }
)

// tạo index để sử lí hết hạn tính thời gian từ khi tạo và 300s sao sẽ tự động remove
// ForgotToken.index({ createdAt: 1 }, { expireAfterSeconds: 5 })
module.exports = model('ForgotToken', ForgotToken)
