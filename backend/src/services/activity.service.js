const ActivityLog = require('../models/ActivityLog');

const logActivity = async ({ userId, type, message, xpEarned = 0, goldEarned = 0 }) => {
  return ActivityLog.create({ user: userId, type, message, xpEarned, goldEarned });
};

module.exports = { logActivity };