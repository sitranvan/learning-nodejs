const { Router } = require('express')

const validator = require('../middlewares/validator')
const productSchema = require('../validations/productSchema')
const productController = require('../controllers/ProductController')
const jwtAuth = require('../middlewares/jwtAuth')
const authorize = require('../middlewares/authorize')
const upload = require('../middlewares/upload')
const mongoUpload = require('../middlewares/mongoUpload')

const productRouter = Router()

productRouter.get('/', productController.getAll)
productRouter.post(
    '/',
    jwtAuth,
    authorize(2),
    // validator(productSchema.create),
    upload.single('photo'),
    productController.create
)
productRouter.delete('/:id', jwtAuth, authorize(3), productController.delete)
productRouter.patch('/:id', jwtAuth, authorize(3), validator(productSchema.update), productController.update)

module.exports = productRouter
