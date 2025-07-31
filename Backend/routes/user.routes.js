// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const { signup, login, sendOtp, verifyOtp } = require('../controllers/users.controllers');

// Use POST for login (not GET)
router.post('/signup', signup);
router.post('/login', login);
router.post('/send-otp', sendOtp);
router.post('/verify-otp', verifyOtp);



module.exports = router;
