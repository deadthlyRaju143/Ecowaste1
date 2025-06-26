const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Event = require('../models/Event');
const User = require('../models/User');
const defaultEvents = require('../data/defaultEvents');
const sendEmail = require('../utils/sendEmail'); // ✅ Make sure this path is correct

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// 🔐 JWT middleware
function auth(req, res, next) {
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

// ✅ Add new event
router.post('/add', auth, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const event = new Event({
      title,
      description,
      date: new Date(date),
      location,
      status: 'upcoming',
    });
    await event.save();
    res.status(201).json({ message: 'Event added successfully', event });
  } catch (err) {
    console.error('Add event error:', err);
    res.status(500).json({ error: 'Failed to add event' });
  }
});

// ✅ Fetch upcoming events and seed defaults if empty
router.get('/upcoming', async (req, res) => {
  try {
    console.log('📥 Incoming GET /upcoming');
    let allEvents = await Event.find({ status: 'upcoming' });

    if (allEvents.length === 0) {
      console.log('🌱 No upcoming events. Seeding default events...');
      await Event.insertMany(
        defaultEvents.map((event) => ({
          ...event,
          date: new Date(event.date),
          status: 'upcoming',
        }))
      );
      allEvents = await Event.find({ status: 'upcoming' });
    }

    const now = new Date();
    const upcomingEvents = allEvents.filter((event) => new Date(event.date) >= now);
    console.log('🎯 Filtered upcoming events:', upcomingEvents);
    res.json(upcomingEvents);
  } catch (err) {
    console.error('Fetch upcoming events error:', err);
    res.status(500).json({ error: 'Failed to fetch upcoming events' });
  }
});

// ✅ Participate in an event and send email
router.post('/participate/:eventId', auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.eventId);
    if (!event) return res.status(404).json({ error: 'Event not found' });

    if (event.participants.includes(req.userId)) {
      return res.status(400).json({ error: 'Already participating in this event' });
    }

    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    event.participants.push(req.userId);
    await event.save();

    const subject = `✅ Participation Confirmed: ${event.title}`;
    const html = `
      <h2>Hello ${user.name},</h2>
      <p>You’ve successfully joined the <strong>${event.title}</strong> event!</p>
      <ul>
        <li><strong>📍 Location:</strong> ${event.location}</li>
        <li><strong>📅 Date:</strong> ${new Date(event.date).toLocaleDateString()}</li>
        <li><strong>🕒 Time:</strong> ${new Date(event.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</li>
      </ul>
      <p><strong>Guide Instructions:</strong> Please reach the location 10 minutes early. Our local guide will be available at the venue to coordinate.</p>
      <p>Thank you for contributing to a cleaner and greener world! 🌱</p>
      <br>
      <p><em>– EcoWaste Team</em></p>
    `;

    await sendEmail({
      to: user.email,
      subject,
      html,
    });

    res.json({ message: 'Joined event successfully. Confirmation email sent.' });
  } catch (err) {
    console.error('Participation error:', err);
    res.status(500).json({ error: 'Failed to join event' });
  }
});

// ✅ Fetch user's participated events
router.get('/my-events', auth, async (req, res) => {
  try {
    const events = await Event.find({ participants: req.userId }).sort('-date');
    res.json(events);
  } catch (err) {
    console.error('Fetch my events error:', err);
    res.status(500).json({ error: 'Failed to fetch your events' });
  }
});

// ✅ Fetch completed events
router.get('/completed', async (req, res) => {
  try {
    const allEvents = await Event.find({ status: 'completed' }).sort('-date');
    const now = new Date();
    const completed = allEvents.filter((event) => new Date(event.date) < now);
    res.json(completed);
  } catch (err) {
    console.error('Completed events error:', err);
    res.status(500).json({ error: 'Failed to fetch completed events' });
  }
});

module.exports = router;