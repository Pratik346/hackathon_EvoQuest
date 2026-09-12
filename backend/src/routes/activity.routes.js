const express = require('express');
const router = express.Router();
const { getActivity } = require('../controllers/activity.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getActivity);

module.exports = router;