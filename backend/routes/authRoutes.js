// backend/routes/authRoutes.js
const express = require('express');
const router = express.Router();
const { Signup, Login, Logout } = require('../controllers/AuthController');
const { userVerification } = require('../middleware/authMiddleware');

// signup, login, logout
router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', Logout);

// verify cookie route (used by frontend home logic)
router.post('/verify', userVerification);

module.exports = router;