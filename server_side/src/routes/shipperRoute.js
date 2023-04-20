const router = require('express').Router()
const { authorizeUser } = require('../middlewares/auth')
const controller = require('../controllers/shipperController')

router.post('/register', controller.register)
router.get('/profile', authorizeUser('shipper'), controller.viewProfile)
router.get('/orders/:process', authorizeUser('shipper'), controller.getOrders)
router.put('/orders/:orderCode', authorizeUser('shipper'), controller.updateOrder)
router.put('/deliver-order/:orderCode', authorizeUser('shipper'), controller.deliverOrder)

module.exports = router
