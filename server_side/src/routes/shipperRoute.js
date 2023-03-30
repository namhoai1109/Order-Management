const router = require('express').Router()
const controller = require('../controllers/shipperController')

router.post('/register', controller.register)