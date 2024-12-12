const mongoose = require('mongoose');

// Define the schema for the User
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minlength: 3, 
  },
  email: {
    type: String,
    required: true,
    unique: true, 
    trim: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  },
  password: {
    type: String,
    required: true,
    minlength: 6, // Minimum length for password
  },
}, { timestamps: true }); // Add createdAt and updatedAt fields automatically

// Create and export the User model
const User = mongoose.model('User', userSchema);

module.exports = User;