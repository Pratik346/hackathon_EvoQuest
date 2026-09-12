const mongoose = require('mongoose');
const { CATEGORIES, DIFFICULTIES } = require('../utils/constants');

const questSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
      maxlength: 150,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
      default: '',
    },
    category: {
      type: String,
      enum: CATEGORIES,
      required: [true, 'Category is required'],
    },
    difficulty: {
      type: String,
      enum: DIFFICULTIES,
      required: [true, 'Difficulty is required'],
    },
    xpReward: { type: Number, required: true },
    goldReward: { type: Number, required: true },
    attribute: { type: String, required: true },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

questSchema.index({ user: 1, completed: 1 });

module.exports = mongoose.model('Quest', questSchema);