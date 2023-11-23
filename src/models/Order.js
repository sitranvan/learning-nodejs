const { DataTypes } = require('sequelize')
const sequelize = require('../databases/connect')
const User = require('../models/User')
const Coupon = require('./Coupon')

const Order = sequelize.define(
    'Order',
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        // status: pending, approved, delivered, done, cancelled
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: 'pending'
        },
        receivedAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        note: {
            type: DataTypes.STRING,
            allowNull: true
        },
        canceledAt: {
            type: DataTypes.DATE,
            allowNull: true
        },
        canceledReason: {
            type: DataTypes.STRING,
            allowNull: true
        },
        canceledBy: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: User,
                key: 'id'
            }
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: User,
                key: 'id'
            }
        },
        couponId: {
            type: DataTypes.INTEGER,
            references: {
                model: Coupon,
                key: 'id'
            }
        }
    },
    {
        paranoid: true
    }
)

module.exports = Order
