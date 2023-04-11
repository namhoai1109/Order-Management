const router = require('express').Router()
const { authorizeUser } = require('../middlewares/auth')
const controller = require('../controllers/shipperController')

router.post('/register', controller.register)
router.get('/profile', authorizeUser('shipper'), controller.viewProfile)
router.get('/orders', authorizeUser('shipper'), controller.getOrders)
router.put('/confirm-order/:orderCode', authorizeUser('shipper'), controller.confirmOrder)
router.put('/deliver-order/:orderCode', authorizeUser('shipper'), controller.deliverOrder)

module.exports = router
