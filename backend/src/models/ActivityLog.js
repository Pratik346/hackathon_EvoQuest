const mongoose = require('mongoose');
const { ACTIVITY_TYPES } = require('../utils/constants');

const activityLogSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    type: { type: String, enum: ACTIVITY_TYPES, required: true },
    message: { type: String, required: true },
    xpEarned: { type: Number, default: 0 },
    goldEarned: { type: Number, default: 0 },
  },
  { timestamps: true }
);

activityLogSchema.index({ user: 1, createdAt: -1 });

module.exports = mongoose.model('ActivityLog', activityLogSchema);