const { DataTypes } = require('sequelize')
const sequelize = require('../databases/connect')
const User = require('./User')

const Address = sequelize.define('Address', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    city: {
        type: DataTypes.STRING,
        allowNull: true
    },
    province: {
        type: DataTypes.STRING,
        allowNull: true
    },
    zip: {
        type: DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: User,
            key: 'id'
        }
    }

    // Trường hợp custom foreign là email nếu mặc định key là id thì không cần định nghĩa
    // userEmail: {
    //     type: DataTypes.STRING,
    //     allowNull: false,
    //     references: {
    //         model: User,
    //         key: 'email'
    //     }
    // }
})

module.exports = Address
