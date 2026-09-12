const jwt = require('jsonwebtoken');
const asyncHandler = require('../utils/asyncHandler');
const User = require('../models/User');
const env = require('../config/env');

const protect = asyncHandler(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'Not authenticated',
      errors: [],
    });
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'User no longer exists',
        errors: [],
      });
    }

    req.user = user;
    next();
  } catch (err) {
    // Intentionally caught and NOT rethrown: any failure here (expired token,
    // tampered signature, malformed JWT) should uniformly mean "not authenticated"
    // to the client — we never want to leak JWT internals in the response or crash
    // the request over an expected, routine condition (e.g. expired sessions).
    // Logging err.name/err.message server-side so real tampering attempts or
    // unexpected verify failures are still visible for debugging/monitoring.
    console.error('Auth token verification failed:', err.name, '-', err.message);

    return res.status(401).json({
      success: false,
      message: 'Invalid or expired token',
      errors: [],
    });
  }
});

module.exports = { protect };