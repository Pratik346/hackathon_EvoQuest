const { isValidEmail } = require('../utils/validators');

const validateRegister = (body) => {
  const errors = [];
  if (!body.name || body.name.trim() === '') {
    errors.push({ field: 'name', message: 'Name is required' });
  }
  if (!body.email || !isValidEmail(body.email)) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }
  if (!body.password || body.password.length < 8) {
    errors.push({ field: 'password', message: 'Password must be at least 8 characters' });
  }
  return errors;
};

const validateLogin = (body) => {
  const errors = [];
  if (!body.email || !isValidEmail(body.email)) {
    errors.push({ field: 'email', message: 'Valid email is required' });
  }
  if (!body.password) {
    errors.push({ field: 'password', message: 'Password is required' });
  }
  return errors;
};

module.exports = { validateRegister, validateLogin };