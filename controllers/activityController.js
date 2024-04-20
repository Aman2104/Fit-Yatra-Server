const Activity = require('../models/ActivityModel');

exports.createActivity = async (req, res) => {
    const { activity, cure, backgroundImage, image } = req.body;

    try {
        const newActivity = new Activity({
            activity: activity,
            cure: cure,
            backgroundImage: backgroundImage,
            image: image
        });

        const savedActivity = await newActivity.save();
        res.status(201).json({ message: "Activity added successfully", activity: savedActivity });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getActivitiesByCure = async (req, res) => {
    const cure = req.params.cure;
    try {
        const activities = await Activity.find({ cure: cure });
        res.json(activities);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
