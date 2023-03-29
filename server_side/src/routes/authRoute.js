const router = require('express').Router()
const controller = require('../controllers/authController')

router.post('/login', controller.login)
router.get('/confirmation/:confirmCode', controller.validate)

module.exports = router
