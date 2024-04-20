const express = require('express');
const fetchUser = require('../middleware/fetchUser')
var router = express.Router();
const authController = require('../controllers/authController');

router.post('/send-otp', authController.sendOTP);
router.post('/verify-otp', authController.verifyOTP);
router.post('/createuser', authController.createUser);
router.post('/login', authController.loginUser);
router.post('/getuser', fetchUser, authController.getUser);


module.exports = router