const express = require('express');
const router = express.Router();
const activityController = require('../controllers/activityController');

// POST a new activity
router.post('/activities', activityController.createActivity);

// GET activities by cure
router.get('/activities/:cure', activityController.getActivitiesByCure);

module.exports = router;



