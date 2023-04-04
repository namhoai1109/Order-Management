const router = require('express').Router();
const controller = require('../controllers/adminController');
const { authorizeUser } = require('../middlewares/auth');

router.post('/register-staff', authorizeUser('admin'), controller.registerStaff);
router.delete('/delete-staff/:id', authorizeUser('admin'), controller.deleteStaff);
router.post('/update-accountStatus/:id', authorizeUser('admin'), controller.updateStatusAccount);
router.get('/get-staff/:id', authorizeUser('admin'), controller.getStaff);
router.get('/get-staffs', authorizeUser('admin'), controller.getAllStaff);
router.get('/get-shippers', authorizeUser('admin'), controller.getAllShipper);




module.exports = router;
