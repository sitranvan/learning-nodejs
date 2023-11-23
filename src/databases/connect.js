const { Sequelize } = require('sequelize')
const sequelize = new Sequelize('ecommerce', 'root', '', {
    logging: false,
    host: 'localhost',
    port: 3306,
    dialect: 'mysql'
})

module.exports = sequelize
