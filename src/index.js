const express = require('express')

const handleRouter = require('./routers')
const errorMiddleware = require('./middlewares/errorMiddleware')
const morgan = require('morgan')
const sequelize = require('./databases/connect')
const Role = require('./models/Role')
const { roles } = require('./constants/role')
const path = require('path')
const bodyParser = require('body-parser')
const MongoDB = require('./databases/connectDB')
require('./models/relationship')
const app = express()
const port = 3000

app.use(express.json())
// app.use(bodyParser.json())
// app.use(bodyParser.urlencoded({ extended: true }))
app.use(morgan('dev'))

const uploadsDirectory = path.join(__dirname, 'uploads')

app.use('/uploads', express.static(uploadsDirectory))

// Connect mongodb
// connect DB
MongoDB.connectDB()
// Connect database
sequelize
    .sync()
    .then(() => {
        console.log('Connected database successfully')
    })
    .then(() => {
        // insert data roles
        Role.bulkCreate(roles, {
            ignoreDuplicates: true
        }).then(() => {
            console.log('Created roles')
        })
    })
    .catch(() => {
        console.log('Failed to connect database')
    })

// Handle routes
handleRouter(app)
// Error middleware
app.use(errorMiddleware)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
