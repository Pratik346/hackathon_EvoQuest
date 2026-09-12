const asyncHandler = require('../utils/asyncHandler');
const Inventory = require('../models/Inventory');
const { success } = require('../utils/response');

exports.getInventory = asyncHandler(async (req, res) => {
  const items = await Inventory.find({ user: req.user._id }).populate('item');

  return success(res, 200, 'Inventory fetched successfully', {
    items: items.map((i) => ({
      id: i._id,
      item: { id: i.item._id, name: i.item.name, type: i.item.type, icon: i.item.icon },
      purchasedAt: i.createdAt,
    })),
  });
});