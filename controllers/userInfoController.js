const UserInfo = require('../models/UserInfoModel');

exports.createUserInfo = async (req, res) => {
    try {
        const userId = req.user.id;
        req.body.user = userId;
        const userInfo = await UserInfo.create(req.body);
        res.status(201).json(userInfo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        const userInfo = await UserInfo.findOne({ user: userId }).populate('user', 'name email image');
        if (userInfo) {
            res.json(userInfo);
        } else {
            res.status(404).json({ message: 'User info not found' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateUserInfo = async (req, res) => {
    try {
        const userId = req.params.userId;
        let userInfo = await UserInfo.findOne({ user: userId });
        if (userInfo) {
            userInfo = await UserInfo.findOneAndUpdate({ user: userId }, req.body, { new: true });
            res.json(userInfo);
        } else {
            res.status(404).json({ message: 'User info not found' });
        }
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
