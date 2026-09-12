const express = require('express');
const router = express.Router();
const { getInventory } = require('../controllers/inventory.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getInventory);

module.exports = router;