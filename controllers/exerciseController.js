const Exercise = require('../models/ExerciseModel');

exports.createExercise = async (req, res) => {
    try {
        const { name, description, image, video } = req.body;
        const exercise = new Exercise({ name, description, image, video });
        await exercise.save();
        res.status(201).json(exercise);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllExercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();
        res.json(exercises);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getExerciseById = async (req, res) => {
    const { id } = req.params;
    try {
        const exercise = await Exercise.findById(id);
        if (!exercise) {
            return res.status(404).json({ error: 'Exercise not found' });
        }
        res.json(exercise);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};