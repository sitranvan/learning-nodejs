const nodemailer = require('nodemailer')

class EmailService {
    constructor() {
        this.initTransporter()
    }

    initTransporter() {
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'it.sitranvan@gmail.com',
                pass: 'xqwy qipw rchj ahrr'
            }
        })
    }

    async sendMail({ to, subject, text, html }) {
        this.transporter.sendMail({
            from: 'it.sitranvan@gmail.com', // Địa chỉ người gửi
            to,
            subject,
            text,
            html
        })
    }
}

module.exports = new EmailService()
