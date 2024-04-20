const HealthData = require('../models/HealthDataModel');

exports.addOrUpdateHealthData = async (req, res) => {
    try {
        const userId = req.user.id;
        const { exercises, meals, stepCount, calorieIntake, calorieBurn } = req.body;
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
        let existingData = await HealthData.findOne({ userId, date: { $gte: startOfToday, $lte: endOfToday } });

        if (existingData) {
            exercises.forEach(exercise => {
                const existingExerciseIndex = existingData.exercises.findIndex(e => e.exerciseName.toLowerCase() === exercise.exerciseName.toLowerCase());
                if (existingExerciseIndex !== -1) {
                    existingData.exercises[existingExerciseIndex].time += exercise.time;
                } else {
                    existingData.exercises.push(exercise);
                }
            });

            meals.forEach(meal => {
                const existingMealIndex = existingData.meals.findIndex(m => m.dishName.toLowerCase() === meal.dishName.toLowerCase());
                if (existingMealIndex !== -1) {
                    existingData.meals[existingMealIndex].quantity += meal.quantity;
                } else {
                    existingData.meals.push(meal);
                }
            });

            existingData.stepCount += stepCount;
            existingData.calorieIntake += calorieIntake;
            existingData.calorieBurn += calorieBurn;

            await existingData.save();
            return res.status(200).json({ message: 'Health data updated successfully', data: existingData });
        }

        const healthData = new HealthData({
            userId,
            exercises,
            meals,
            stepCount,
            calorieIntake,
            calorieBurn,
            date: today
        });
        await healthData.save();
        res.status(201).json({ message: 'Health data added successfully' });
    } catch (err) {
        console.error('Error adding/updating health data:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getTodayHealthData = async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date();
        const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
        const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
        const todayData = await HealthData.findOne({ userId, date: { $gte: startOfToday, $lte: endOfToday } });
        res.status(200).json(todayData);
    } catch (err) {
        console.error('Error fetching today\'s health data:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getLast7DaysStepCounts = async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date();
        const startOfLast7Days = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
        const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
        const last7DaysStepCounts = await HealthData.find({ userId, date: { $gte: startOfLast7Days, $lte: endOfToday } }).select('stepCount date');
        res.status(200).json(last7DaysStepCounts);
    } catch (err) {
        console.error('Error fetching last 7 days step counts:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getLast7DaysCalorieBurn = async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date();
        const startOfLast7Days = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
        const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
        const last7DaysCalorieBurn = await HealthData.find({ userId, date: { $gte: startOfLast7Days, $lte: endOfToday } }).select('calorieBurn date');
        res.status(200).json(last7DaysCalorieBurn);
    } catch (err) {
        console.error('Error fetching last 7 days calorie burn:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};

exports.getLast7DaysCalorieIntake = async (req, res) => {
    try {
        const userId = req.user.id;
        const today = new Date();
        const startOfLast7Days = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
        const endOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate(), 23, 59, 59);
        const last7DaysCalorieIntake = await HealthData.find({ userId, date: { $gte: startOfLast7Days, $lte: endOfToday } }).select('calorieIntake date');
        res.status(200).json(last7DaysCalorieIntake);
    } catch (err) {
        console.error('Error fetching last 7 days calorie intake:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
};
