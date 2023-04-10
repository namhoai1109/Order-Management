const router = require('express').Router()
const controller = require('../controllers/customerController')
const { authorizeUser } = require('../middlewares/auth')

router.post('/register', controller.register)
router.post('/password', authorizeUser('customer'), controller.updatePassword)
router.get('/profile', authorizeUser('customer'), controller.viewProfile)
router.get('/partners', authorizeUser('customer'), controller.getPartners)
router.get('/partner/dishes/:partnerId', authorizeUser('customer'), controller.getDishes)
router.post('/order', authorizeUser('customer'), controller.createOrder)

module.exports = router
