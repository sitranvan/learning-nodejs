const catchMiddleware = require('../middlewares/catchMiddleware')
const Category = require('../models/Category')
const Product = require('../models/Product')
const ErrorResponse = require('../response/ErrorResponse')

class CategoryController {
    getAll = catchMiddleware(async (req, res, next) => {
        const categories = await Category.findAll()
        res.status(200).json({
            success: true,
            data: categories
        })
    })

    create = catchMiddleware(async (req, res, next) => {
        const { name, slug } = req.body
        await Category.create({ name, slug })

        res.status(200).json({
            success: true,
            message: 'Create Category Success'
        })
    })

    delete = catchMiddleware(async (req, res, next) => {
        const { id } = req.params

        const productsInCategory = await Product.findAll({ where: { categoryId: id } })
        if (productsInCategory.length > 0) {
            throw new ErrorResponse(400, 'Category has products')
        }

        const category = await Category.destroy({
            where: {
                id
            }
        })
        if (!category) {
            throw new ErrorResponse(404, 'Category not found')
        }

        res.status(200).json({
            success: true,
            message: 'Delete Category Success'
        })
    })

    update = catchMiddleware(async (req, res, next) => {
        const { name, slug } = req.body
        const { id } = req.params

        // check if category
        const category = await Category.findOne({ where: { id } })
        if (!category) {
            throw new ErrorResponse(404, 'Category not found')
        }

        await Category.update({ name, slug }, { where: { id } })

        res.status(200).json({
            success: true,
            message: 'Update Category Success'
        })
    })
}

module.exports = new CategoryController()
