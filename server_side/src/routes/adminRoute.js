const router = require('express').Router()
const controller = require('../controllers/adminController')
const { authorizeUser } = require('../middlewares/auth')

router.post('/staffs', authorizeUser('admin'), controller.registerStaff)
router.delete('/staffs/:id', authorizeUser('admin'), controller.deleteStaff)
router.post('/account-status/:id', authorizeUser('admin'), controller.updateStatusAccount)
router.get('/staffs/:id', authorizeUser('admin'), controller.getStaff)
router.get('/staffs', authorizeUser('admin'), controller.getAllStaff)
router.get('/accounts', authorizeUser('admin'), controller.getAllAccount)
router.get('/shippers', authorizeUser('admin'), controller.getActiveShippers)
router.get('/active-shippers', authorizeUser('admin'), controller.getActiveShippers)
router.get('/partners', authorizeUser('admin'), controller.getAllPartners)

module.exports = router
