const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    item: { type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true },
  },
  { timestamps: true }
);

inventorySchema.index({ user: 1, item: 1 }, { unique: true }); // can't buy the same item twice

module.exports = mongoose.model('Inventory', inventorySchema);