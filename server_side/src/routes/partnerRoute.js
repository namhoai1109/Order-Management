const router = require('express').Router()
const controller = require('../controllers/partnerController')

router.post('/register', controller.register)
router.get('/get-contract/:accessCode', controller.getContract)

module.exports = router