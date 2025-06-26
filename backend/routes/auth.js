const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 🔐 Verify token middleware
function verifyToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

// ✅ Register
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: 'Email already registered' });

    const hashed = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashed });
    await newUser.save();

    // Send welcome email
    await sendEmail(email, 'Welcome to EcoWaste!', `Hi ${name}, welcome to EcoWaste!`);

    res.status(201).json({ message: 'Registered successfully' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error during registration' });
  }
});

// ✅ Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Invalid credentials' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error during login' });
  }
});

// ✅ Get user profile
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error fetching user' });
  }
});

// ✅ Forgot password
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: 'Email not registered' });

    const token = crypto.randomBytes(32).toString('hex');
    user.resetToken = token;
    user.tokenExpire = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `http://localhost:3000/reset-password/${token}`;
    await sendEmail(email, 'Reset Your Password', `Click to reset: ${resetLink}`);
    res.json({ message: 'Reset email sent' });
  } catch (err) {
    console.error('Forgot password error:', err);
    res.status(500).json({ error: 'Error sending reset email' });
  }
});

// ✅ Reset password
router.post('/reset-password/:token', async (req, res) => {
  const { password } = req.body;
  try {
    const user = await User.findOne({
      resetToken: req.params.token,
      tokenExpire: { $gt: Date.now() },
    });

    if (!user) return res.status(400).json({ error: 'Invalid or expired token' });

    user.password = await bcrypt.hash(password, 10);
    user.resetToken = undefined;
    user.tokenExpire = undefined;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    console.error('Reset error:', err);
    res.status(500).json({ error: 'Failed to reset password' });
  }
});

module.exports = router;
