// backend/controllers/AuthController.js
const User = require('../models/UserModel'); // your model file exports the model
const { createSecretToken } = require('../util/SecretToken');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const COOKIE_NAME = process.env.COOKIE_NAME || 'token';

module.exports.Signup = async (req, res) => {
  try {
    const { email, password, username, name, phone } = req.body;
    if (!email || !password || !username) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    const user = await User.create({ 
      email, 
      password, 
      username,
      name: name || username,
      phone: phone || ''
    });

    const token = createSecretToken(user._id);

    // set cookie - httpOnly recommended for security
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 3 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      success: true,
      message: 'User signed up successfully',
      user: { id: user._id, email: user.email, username: user.username, name: user.name, phone: user.phone },
      token // optional: return token in JSON too (useful for mobile clients)
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports.Login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ success: false, message: 'Incorrect email or password' });

    const auth = await bcrypt.compare(password, user.password);
    if(!auth) return res.status(400).json({ success: false, message: 'Incorrect email or password' });

    const token = createSecretToken(user._id);

    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 3 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
      success: true,
      message: 'User logged in successfully',
      user: { id: user._id, email: user.email, username: user.username, name: user.name, phone: user.phone },
      token
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

module.exports.Logout = (req, res) => {
  res.clearCookie(COOKIE_NAME);
  res.json({ success: true, message: 'Logged out' });
};