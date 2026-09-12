const asyncHandler = require('../utils/asyncHandler');
const Item = require('../models/Item');
const { purchaseItem } = require('../services/economy.service');

// @route GET /shop/items
exports.getShopItems = asyncHandler(async (req, res) => {
  const items = await Item.find();
  res.status(200).json({
    success: true,
    message: 'Shop items fetched successfully',
    data: { items },
  });
});

// @route POST /shop/purchase
exports.purchase = asyncHandler(async (req, res) => {
  const { itemId } = req.body;

  if (!itemId) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: [{ field: 'itemId', message: 'itemId is required' }],
    });
  }

  try {
    const result = await purchaseItem(req.user, itemId);
    res.status(200).json({
      success: true,
      message: 'Item purchased successfully',
      data: {
        item: { id: result.item._id, name: result.item.name, price: result.item.price },
        remainingGold: result.remainingGold,
        inventoryItem: { id: result.inventoryItem._id, purchasedAt: result.inventoryItem.createdAt },
      },
    });
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, message: err.message, errors: [] });
  }
});