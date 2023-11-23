const User = require('./User')
const Address = require('./Address')
const Product = require('./Product')
const Category = require('./Category')
const Role = require('./Role')
const Order = require('./Order')
const OrderProduct = require('./OrderProduct')
const Coupon = require('./Coupon')

// User - Address
User.hasMany(Address, {
    foreignKey: 'userId',
    as: 'address'
})
Address.belongsTo(User, {
    foreignKey: 'userId'
})
// Product - Category
Category.hasMany(Product, {
    foreignKey: 'categoryId'
})
Product.belongsTo(Category, {
    foreignKey: 'categoryId',
    as: 'categories'
})

// User - Role
User.belongsTo(Role, {
    foreignKey: 'roleId',
    as: 'roles'
})

Role.hasMany(User, {
    foreignKey: 'roleId'
})

// Order - Product
Order.belongsToMany(Product, {
    through: OrderProduct,
    foreignKey: 'orderId',
    as: 'products'
})

Product.belongsToMany(Order, {
    through: OrderProduct,
    foreignKey: 'productId'
})

// Order - User
User.hasMany(Order, {
    foreignKey: 'userId'
})

Order.belongsTo(User, {
    foreignKey: 'userId'
})

// Coupon - Order
Order.hasMany(Coupon, {
    foreignKey: 'couponId'
})

Coupon.belongsTo(Order, {
    foreignKey: 'couponId'
})
