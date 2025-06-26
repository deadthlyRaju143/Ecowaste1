const mongoose = require('mongoose');

const WasteRequestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // set true if login is mandatory
  },
  wasteType: {
    type: String,
    required: true,
    enum: ['Organic', 'Recyclable', 'General', 'Hazardous']
  },
  date: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    default: ''
  }
}, { timestamps: true }); // adds createdAt and updatedAt

module.exports = mongoose.model('WasteRequest', WasteRequestSchema);
