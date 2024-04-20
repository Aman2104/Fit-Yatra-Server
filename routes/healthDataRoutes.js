const express = require('express');
const router = express.Router();
const healthDataController = require('../controllers/healthDataController');
const fetchUser = require("../middleware/fetchUser");

router.post('/today', fetchUser, healthDataController.addOrUpdateHealthData);
router.get('/today', fetchUser, healthDataController.getTodayHealthData);
router.get('/last7days/stepCounts', fetchUser, healthDataController.getLast7DaysStepCounts);
router.get('/last7days/calorieBurn', fetchUser, healthDataController.getLast7DaysCalorieBurn);
router.get('/last7days/calorieIntake', fetchUser, healthDataController.getLast7DaysCalorieIntake);

module.exports = router;
