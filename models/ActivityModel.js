const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema({
  activity: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  cure: {
    type: [String],
    enum: ['Lordosis', 'Kyphosis', 'Flatback', 'Forward head'],
    required: true
  },
  backgroundImage: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Activity = mongoose.model('Activity', activitySchema);

module.exports = Activity;
