const mongoose = require("mongoose");

const HealthDataSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId
    },
    exercises: [{
        exerciseName: String,
        time: Number
    }],
    meals: [{
        dishName: String,
        quantity: Number
    }],
    stepCount: {
        type:Number
    },
    calorieIntake: {
        type:Number
    },
    calorieBurn: {
        type:Number
    },
    date: { type: Date, default: Date.now },
});

const HealthData = mongoose.model('HealthData', HealthDataSchema);

module.exports = HealthData;
