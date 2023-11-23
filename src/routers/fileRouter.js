const { Router } = require('express')
const MongoDB = require('../databases/connectDB')
const ErrorResponse = require('../response/ErrorResponse')

const fileRouter = Router()
fileRouter.get('/:filename', async (req, res, next) => {
    const { filename } = req.params
    const file = await MongoDB.gfs.find({ filename }).toArray()
    if (!file || !file.length) {
        return next(new ErrorResponse(404, 'File not found'))
    }
    MongoDB.gfs.openDownloadStreamByName(filename).pipe(res)
})

module.exports = fileRouter
