// routes/userInfoRoutes.js
const express = require('express');
const router = express.Router();
const userInfoController = require('../controllers/userInfoController');
const fetchUser = require("../middleware/fetchUser");

// POST route to create user info
router.post('/userinfo', fetchUser, userInfoController.createUserInfo);

// GET route to get user info
router.get('/userinfo/:userId', userInfoController.getUserInfo);

// PUT route to update user info
router.put('/userinfo/:userId', userInfoController.updateUserInfo);

module.exports = router;
