const router = require('express').Router()
const controller = require('../controllers/partnerController')

router.get('/', controller.register)

module.exports = router