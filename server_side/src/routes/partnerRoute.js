const router = require('express').Router()
const controller = require('../controllers/partnerController')
const { authorizeUser } = require('../middlewares/auth')
const { upload } = require('../middlewares/multer')

router.post('/register', controller.register)
// router.get('/get-contract/:accessCode', controller.getContract)
router.post('/add-dish', authorizeUser('partner'), upload('image', 'array', 5), controller.addDish)
router.get('/get-dishes', authorizeUser('partner'), controller.getAllDishes)
router.get('/orders', authorizeUser('partner'), controller.viewOrders)
router.put('/orders/confirm-order/:orderCode', authorizeUser('partner'), controller.confirmOrder)

module.exports = router
