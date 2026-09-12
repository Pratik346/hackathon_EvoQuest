const express = require('express');
const router = express.Router();
const { getCharacter } = require('../controllers/character.controller');
const { protect } = require('../middleware/auth.middleware');

router.get('/', protect, getCharacter);

module.exports = router;