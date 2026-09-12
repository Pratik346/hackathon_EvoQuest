const User = require('../models/User');
const { getXpRequiredForLevel } = require('../utils/calculateLevel');

const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email: email.toLowerCase() });
  if (existing) {
    const err = new Error('Email already registered');
    err.statusCode = 400;
    throw err;
  }

  const user = await User.create({ name, email, password });
  return user;
};

const findUserByEmailWithPassword = async (email) => {
  return User.findOne({ email: email.toLowerCase() }).select('+password');
};

module.exports = { registerUser, findUserByEmailWithPassword };