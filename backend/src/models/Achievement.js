const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true }, // stable identifier for logic checks
  name: { type: String, required: true },
  description: { type: String, required: true },
  icon: { type: String, required: true },
});

module.exports = mongoose.model('Achievement', achievementSchema);