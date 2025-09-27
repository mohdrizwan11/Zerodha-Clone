// backend/middleware/authMiddleware.js
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

const COOKIE_NAME = process.env.COOKIE_NAME || 'token';

async function getUserFromToken(token) {
  if (!token) return null;
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_KEY || process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    return user || null;
  } catch (err) {
    return null;
  }
}

// Protect for API calls: sets req.user if token valid
async function protect(req, res, next) {
  try {
    // Prefer Authorization header (Bearer), fallback to cookie
    let token = null;
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    } else if (req.cookies && req.cookies[COOKIE_NAME]) {
      token = req.cookies[COOKIE_NAME];
    }

    if (!token) {
      return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
    }

    const user = await getUserFromToken(token);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Not authorized, token invalid' });
    }

    req.user = user; // attach user to request
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ success: false, message: 'Not authorized' });
  }
}

// Lightweight verification endpoint (used by your Home page in article)
async function userVerification(req, res) {
  try {
    const token = (req.cookies && req.cookies[COOKIE_NAME]) || null;
    if (!token) return res.json({ status: false });

    jwt.verify(token, process.env.TOKEN_KEY || process.env.JWT_SECRET, async (err, data) => {
      if (err) return res.json({ status: false });

      const user = await User.findById(data.id).select('-password');
      if (!user) return res.json({ status: false });

      return res.json({ status: true, user: user.username });
    });
  } catch (err) {
    console.error(err);
    return res.json({ status: false });
  }
}

module.exports = { protect, userVerification };