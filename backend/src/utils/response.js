// Shared helpers so every controller returns identically-shaped JSON,
// reducing copy-paste drift across 20+ endpoints.

const success = (res, statusCode, message, data = null) => {
  return res.status(statusCode).json({ success: true, message, data });
};

const failure = (res, statusCode, message, errors = []) => {
  return res.status(statusCode).json({ success: false, message, errors });
};

module.exports = { success, failure };