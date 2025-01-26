const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  address: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  offerPrice: {
    type: Number,
    min: 0,
  },
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Pre-save middleware to update `updatedAt`
roomSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Hotel = mongoose.model('Hotel', roomSchema);

module.exports = Hotel;