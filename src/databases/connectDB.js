const mongoose = require('mongoose')

class MongoDB {
    static connectDB() {
        mongoose.connect('mongodb://127.0.0.1:27017/upload').then(() => {
            console.log('Connected to MongoDB successfully')
        })
        const conn = mongoose.connection
        conn.once('open', () => {
            this.gfs = new mongoose.mongo.GridFSBucket(conn.db, {
                bucketName: 'uploads'
            })
        })
    }
}

module.exports = MongoDB
