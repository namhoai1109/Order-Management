const router = require('express').Router()
const controller = require('../controllers/partnerController')

router.post('/register', controller.register)

module.exports = router