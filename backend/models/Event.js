const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
  },

  date: {
    type: Date,
    required: true,
  },

  location: {
    type: String,
    required: true,
  },

  participants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],

  status: {
    type: String,
    enum: ['upcoming', 'completed'],
    default: 'upcoming',
  }
}, {
  timestamps: true,
});

module.exports = mongoose.model('Event', EventSchema);
