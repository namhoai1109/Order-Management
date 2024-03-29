const router = require('express').Router()
const controller = require('../controllers/staffController')
const { authorizeUser } = require('../middlewares/auth')

router.get('/get-partners', authorizeUser('staff'), controller.getAllPartners)
router.get('/get-shippers', authorizeUser('staff'), controller.getAllShipper)
router.get('/get-active-shippers', authorizeUser('staff'), controller.getActiveShippers)

router.post('/generate-contract/:taxCode', authorizeUser('staff'), controller.generateContract)
router.put('/confirm-contract/:taxCode', authorizeUser('staff'), controller.confirmContract)

module.exports = router
