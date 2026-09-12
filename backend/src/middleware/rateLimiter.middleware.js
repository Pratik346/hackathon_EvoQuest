const rateLimit = require('express-rate-limit');

// General API limiter — generous, just stops abuse
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 min
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many requests, please try again later', errors: [] },
});

// Tighter limiter for auth routes — slows brute-force login/register attempts
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many auth attempts, please try again later', errors: [] },
});

// Very tight limiter for quest completion — makes rapid-fire scripted abuse impractical
// even though duplicate-completion is already blocked at the DB level (Day 5).
const questCompleteLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 min
  max: 30,
  standardHeaders: true,
  legacyHeaders: false,
  message: { success: false, message: 'Too many quest completions, slow down', errors: [] },
});

module.exports = { generalLimiter, authLimiter, questCompleteLimiter };