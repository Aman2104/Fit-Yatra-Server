const mongoose = require("mongoose");

const userInfoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        enum: ['Male', 'Female']
    },
    postureProblems: {
        type: String,
        required:true
    },
    weight: {
        type: Number,
        required:true
    }
});


const UserInformation = mongoose.model("UserInformation", userInfoSchema);

module.exports = UserInformation;