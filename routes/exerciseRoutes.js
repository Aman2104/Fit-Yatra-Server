const express = require('express');
const router = express.Router();
const exerciseController = require('../controllers/exerciseController');

// POST route to create an exercise
router.post('/exercises', exerciseController.createExercise);

// GET route to fetch all exercises
router.get('/exercises', exerciseController.getAllExercises);

// GET route to fetch a specific exercise by ID
router.get('/exercises/:id', exerciseController.getExerciseById);

module.exports = router;
