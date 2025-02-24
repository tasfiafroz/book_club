// models/Plant.js
const mongoose = require('mongoose');

const plantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Plant name is required
  },
  order: {
    type: Number,
    required: true, // Order is required for sorting
  },
  // Add additional fields as needed
  description: {
    type: String,
    default: '', // Optional description
  },
  imageUrl: {
    type: String,
    default: '', // Optional image URL
  },
  createdAt: {
    type: Date,
    default: Date.now, // Timestamp for when the plant was created
  },
});

const Plant = mongoose.model('Plant', plantSchema);

module.exports = Plant;