const router = require('express').Router()
const controller = require('../controllers/customerController')
const { authorizeUser } = require('../middlewares/auth')

router.post('/register', controller.register)
router.post('/password', authorizeUser('customer'), controller.updatePassword)
router.get('/profile', authorizeUser('customer'), controller.viewProfile)
router.get('/delete-order/:id', authorizeUser('customer'), controller.deleteOrder)


module.exports = router
