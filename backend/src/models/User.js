const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { ATTRIBUTES } = require('../utils/constants');
const { isValidEmail } = require('../utils/validators');
const attributeSchema = {};
ATTRIBUTES.forEach((attr) => {
  attributeSchema[attr] = { type: Number, default: 0, min: 0 };
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: 100,
    },
 email: {
  type: String,
  required: [true, 'Email is required'],
  unique: true,
  trim: true,
  lowercase: true,
  validate: {
    validator: isValidEmail,
    message: 'Please provide a valid email',
  },
},
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: 8,
      select: false, // never returned by default
    },

    // ---- Embedded character/progression state ----
    level: { type: Number, default: 1 },
    xp: { type: Number, default: 0 },
    gold: { type: Number, default: 0 },
    attributes: {
      type: attributeSchema,
      default: () => ATTRIBUTES.reduce((acc, a) => ({ ...acc, [a]: 0 }), {}),
    },
    currentStreak: { type: Number, default: 0 },
    longestStreak: { type: Number, default: 0 },
    lastQuestCompletedAt: { type: Date, default: null }, // used for streak calc
  },
  { timestamps: true }
);

// Hash password before save
// Hash password before save
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Instance method to compare password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

// Shape matching the CHARACTER route contract exactly
userSchema.methods.toCharacterJSON = function (xpToNextLevel) {
  return {
    level: this.level,
    xp: this.xp,
    xpToNextLevel,
    gold: this.gold,
    attributes: this.attributes,
    currentStreak: this.currentStreak,
    longestStreak: this.longestStreak,
  };
};

module.exports = mongoose.model('User', userSchema);