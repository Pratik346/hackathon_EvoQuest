const mongoose = require('mongoose');
const { ITEM_TYPES } = require('../utils/constants');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  type: { type: String, enum: ITEM_TYPES, required: true },
  icon: { type: String, required: true },
});

module.exports = mongoose.model('Item', itemSchema);