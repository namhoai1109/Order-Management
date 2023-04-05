const multer = require('multer')
const path = require('path')
const { createReturnObject } = require('../utils/returnObjectUtil')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../../public/uploads'))
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + req.account.username + '-' + path.extname(file.originalname))
  }
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
    cb(null, true)
  } else {
    cb(null, new Error('File type is not supported'))
  }
}

// fieldName is the name of the field in the form
// options is the type of file upload: single, array
// if options is array, count is required
const upload = (fieldName, options, count) => {
  if (!fieldName || !options) {
    throw new Error('fieldName and options are required')
  }
  if (options !== 'single' && options !== 'array' && options !== 'fields') {
    throw new Error('options must be single, array or fields')
  }
  if (options === 'array' && !count) {
    throw new Error('count is required when options is array')
  }

  return (req, res, next) => {
    const upload = multer({ storage, fileFilter })[options](fieldName, count)
    upload(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        res.status(400).send(createReturnObject(null, 'Error uploading file', err.message, 400))
        return
      } else if (err) {
        res.status(400).send(createReturnObject(null, 'Error uploading file', err.message, 400))
        return
      }
      next()
    })
  }
}

exports.upload = upload
