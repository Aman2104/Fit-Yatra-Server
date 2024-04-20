const User = require('../models/UserModel');
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const randomstring = require('randomstring');
const JWT_SECRET = process.env.mysecretkey
let otpMap = {};

// NodeMailer
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.email,
        pass: process.env.pass,
    },
});


exports.sendOTP = async (req, res) => {
    try {
        const { email } = req.body;
        const isAlreadyRegisteredEmail = await User.findOne({ email });

        if (isAlreadyRegisteredEmail) {
            res.status(400).send({ "data": "user already available" });
            return;
        }

        const otp = randomstring.generate({ length: 6, charset: 'numeric' });

        otpMap[email] = otp;

        const mailOptions = {
            from: 'verifyemailsender@gmail.com',
            to: email,
            subject: 'OTP Verification',
            text: `Your OTP for verification is: ${otp}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(500).send(error.toString());
            }
            res.status(200).send('OTP sent successfully');
        });
    } catch (err) {
        res.status(500).send({ "error": "Internal Server Error" });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        const email = req.body.email;
        const userEnteredOTP = req.body.otp;
        if (otpMap[email] == userEnteredOTP) {
            res.status(200).json({isSuccessful:true});
        } else {
            res.status(401).send('Invalid OTP. Please try again.');
        }
    } catch (err) {
        res.status(200).send({ 'error': "Internal Server Error" });
    }
};

exports.createUser = async (req, res) => {
    try {
        const { name, email, password, image } = req.body;
        const isAlreadyRegisteredEmail = await User.findOne({ email });

        if (isAlreadyRegisteredEmail) {
            res.status(200).send({ "data": "user already available" });
            return;
        }
        const secPassword = await bcryptjs.hash(password, 10);

        const user = await User.create({
            name, email, image, password: secPassword
        });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })

        res.status(200).send({"token":token})

    } catch (err) {
        res.status(400).send({ "Error": "Internal Server Error" })

    }
};

exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email ) {
            return res.status(400).send({ "Error": "Email is required" });
        }
        
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send({ "Error": "Invalid username or email" });
        }

        const validPass = await bcryptjs.compare(password, user.password)
        if (!validPass) {
            return res.status(400).send({ "Error": "Invalid password" });
        }
        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' })
        res.status(200).send({"token":token})
    } catch (err) {
        res.status(400).send({ "Error": "Internal Server Error" })

    }
};

exports.getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user);
    } catch (error) {
        res.status(500).send("Internal Server Error Occured");
    }
};
