const express = require('express');
const router = express.Router();
const { getAchievements } = require('../controllers/achievement.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getAchievements);

module.exports = router;