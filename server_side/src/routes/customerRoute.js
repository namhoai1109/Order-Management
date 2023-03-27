const router = require('express').Router()
const controller = require('../controllers/customerController')
const { authorizeUser } = require('../middlewares/auth')

router.get('/', authorizeUser('customer'), controller.getAll)
router.post('/', controller.register)

module.exports = router
