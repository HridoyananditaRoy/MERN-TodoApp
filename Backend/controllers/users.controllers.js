const bcrypt = require('bcrypt');
const User = require('../models/users.models'); // Ensure path is correct
const jwt = require('jsonwebtoken'); 
const nodemailer = require('nodemailer');
const crypto = require('crypto');


const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Signup failed", error: error.message });
  }
};

const SECRET_KEY = process.env.JWT_SECRET || "your-secret-key"; // fallback

const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(400).json({ message: "User Not Found" });
    }

    const isPassword = await bcrypt.compare(password, existingUser.password);
    if (!isPassword) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // ✅ Generate token
    const token = jwt.sign({ id: existingUser._id }, SECRET_KEY, {
      expiresIn: "7d", // optional
    });

    // ✅ Send token in response
    res.status(200).json({
      message: "Login successful",
      token,
      user: existingUser,
    });

  } catch (error) {
    res.status(500).json({ message: "Login failed", error: error.message });
  }
};


const sendOtp = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'Email not found' });

  const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
  const expires = Date.now() + 5 * 60 * 1000; // 5 min

  user.otp = { code: otpCode, expiresAt: expires };
  await user.save();

  // Configure your SMTP
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    to: email,
    subject: 'Your OTP Code',
    text: `Your OTP is ${otpCode}. It is valid for 5 minutes.`,
  });

  res.status(200).json({ message: 'OTP sent to email' });
};

const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  const user = await User.findOne({ email });
  if (!user || !user.otp || user.otp.code !== otp) {
    return res.status(400).json({ message: 'Invalid OTP' });
  }

  if (user.otp.expiresAt < Date.now()) {
    return res.status(400).json({ message: 'OTP expired' });
  }

  // OTP is valid — clear it and authenticate
  user.otp = undefined;
  await user.save();

  // Send JWT or mark email as verified
  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

  res.status(200).json({ message: 'OTP verified', token });
};


module.exports = {
    signup,
    login,
    sendOtp,
    verifyOtp
};
