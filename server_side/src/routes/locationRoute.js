const router = require('express').Router()
const controller = require('../controllers/locationController')

router.get('/', controller.getLocations)

module.exports = router