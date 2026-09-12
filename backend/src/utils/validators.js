// src/utils/validators.js
const isValidEmail = (email) => {
  if (typeof email !== 'string') return false;
  if (email.length > 254) return false;

  const atIndex = email.indexOf('@');
  if (atIndex <= 0 || atIndex !== email.lastIndexOf('@')) return false;

  const local = email.slice(0, atIndex);
  const domain = email.slice(atIndex + 1);

  if (/\s/.test(local) || /\s/.test(domain)) return false;

  const dotIndex = domain.lastIndexOf('.');
  if (dotIndex <= 0 || dotIndex === domain.length - 1) return false;

  return true;
};

module.exports = { isValidEmail };