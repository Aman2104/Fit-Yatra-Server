const mongoose = require("mongoose");

const exerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: []
    },
    video: {
        type: String,
        default: []
    },
});

const Exercise = mongoose.model("Exercise", exerciseSchema);

module.exports = Exercise;
