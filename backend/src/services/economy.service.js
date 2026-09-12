const Item = require('../models/Item');
const Inventory = require('../models/Inventory');
const { logActivity } = require('./activity.service');

const purchaseItem = async (user, itemId) => {
  const item = await Item.findById(itemId);
  if (!item) {
    const err = new Error('Item not found');
    err.statusCode = 404;
    throw err;
  }

  const alreadyOwned = await Inventory.findOne({ user: user._id, item: item._id });
  if (alreadyOwned) {
    const err = new Error('Item already owned');
    err.statusCode = 400;
    throw err;
  }

  // Price comes from DB, never from the request body — frontend cannot manipulate this.
  if (user.gold < item.price) {
    const err = new Error('Insufficient gold');
    err.statusCode = 400;
    throw err;
  }

  user.gold -= item.price;
  await user.save();

  const inventoryItem = await Inventory.create({ user: user._id, item: item._id });

  await logActivity({
    userId: user._id,
    type: 'item_purchased',
    message: `Purchased ${item.name}`,
    goldEarned: -item.price,
  });

  return { item, remainingGold: user.gold, inventoryItem };
};

module.exports = { purchaseItem };