// utils/authUtils.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '1h',  
  });
};

// Hash password
const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Compare password
const comparePassword = async (enteredPassword, storedPassword) => {
  return bcrypt.compare(enteredPassword, storedPassword);
};

module.exports = { generateToken, hashPassword, comparePassword };
