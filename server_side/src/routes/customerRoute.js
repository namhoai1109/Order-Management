const router = require('express').Router()
const controller = require('../controllers/customerController')
const { authorizeUser } = require('../middlewares/auth')

router.post('/register', controller.register)
router.post('/password', authorizeUser('customer'), controller.updatePassword)
router.get('/', authorizeUser('customer'), controller.viewProfile)

module.exports = router
