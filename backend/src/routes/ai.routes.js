const express = require('express');
const router = express.Router();
const { getAdvisorRecommendations } = require('../controllers/ai.controller');
const { protect } = require('../middleware/auth.middleware');

router.post('/advisor', protect, getAdvisorRecommendations);

module.exports = router;