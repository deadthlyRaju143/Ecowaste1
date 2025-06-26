const express = require('express');
const router = express.Router();
const WasteRequest = require('../models/WasteRequest');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'secretkey';

function auth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Invalid token' });
  }
}

router.post('/submit', auth, async (req, res) => {
  try {
    const newRequest = new WasteRequest({
      ...req.body,
      userId: req.userId,
    });
    await newRequest.save();
    res.status(201).json({ message: 'Request submitted successfully' });
  } catch (err) {
    console.error('Submit error:', err);
    res.status(500).json({ error: 'Failed to submit request' });
  }
});

router.get('/my-requests', auth, async (req, res) => {
  try {
    const requests = await WasteRequest.find({ userId: req.userId }).sort({ date: -1 });
    res.json(requests);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

module.exports = router;
