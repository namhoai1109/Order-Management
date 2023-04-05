const router = require('express').Router()
const controller = require('../controllers/partnerController')
const { authorizeUser } = require('../middlewares/auth')
const { upload } = require('../middlewares/multer')

router.post('/register', controller.register)
// router.get('/get-contract/:accessCode', controller.getContract)
router.post('/add-dish', authorizeUser('partner'), upload('image', 'array', 5), controller.addDish)
router.get('/get-dishes', authorizeUser('partner'), controller.getAllDishes)

module.exports = router
