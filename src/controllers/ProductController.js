const catchMiddleware = require('../middlewares/catchMiddleware')
const Category = require('../models/Category')
const Product = require('../models/Product')
const ErrorResponse = require('../response/ErrorResponse')

class ProductController {
    getAll = catchMiddleware(async (req, res) => {
        const products = await Product.findAll({
            include: {
                model: Category,
                as: 'categories'
            }
        })
        res.status(200).json({
            success: true,
            data: products
        })
    })

    create = catchMiddleware(async (req, res) => {
        console.log('file', req.file)
        // const { name, description, price, amount, categoryId } = req.body
        // const filename = req?.file.filename
        // await Product.create({
        //     name,
        //     description,
        //     price,
        //     amount,
        //     photo: filename,
        //     categoryId
        // })
        // res.status(200).json({
        //     success: true,
        //     message: 'Product created successfully'
        // })
    })

    delete = catchMiddleware(async (req, res) => {
        const { id } = req.params
        const product = await Product.destroy({
            where: {
                id
            }
        })
        if (!product) {
            throw new ErrorResponse(404, 'Product not found')
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        })
    })

    update = catchMiddleware(async (req, res) => {
        const { name, description, price, amount, categoryId } = req.body
        const { id } = req.params
        const product = await Product.findOne({ where: { id } })
        if (!product) {
            throw new ErrorResponse(404, 'Product not found')
        }
        await Product.update(
            {
                name,
                description,
                price,
                amount,
                categoryId
            },
            { where: { id } }
        )
        res.status(200).json({
            success: true,
            message: 'Product updated successfully'
        })
    })
}

module.exports = new ProductController()
