const express = require('express');
const router = express.Router();
const { getShopItems, purchase } = require('../controllers/shop.controller');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { validatePurchase } = require('../validators/shop.validator');
router.get('/items', protect, getShopItems);
router.post('/purchase', protect,validate(validatePurchase),purchase);

module.exports = router;