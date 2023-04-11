const router = require('express').Router()
const { authorizeUser } = require('../middlewares/auth')
const controller = require('../controllers/shipperController')

router.post('/register', controller.register)
router.get('/get-shipper/:username', authorizeUser('shipper'), controller.getShipper)

module.exports = router
