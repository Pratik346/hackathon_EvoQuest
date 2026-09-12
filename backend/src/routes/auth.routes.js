const express = require('express');
const router = express.Router();
const { register, login, logout, getMe } = require('../controllers/auth.controller');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { validateRegister, validateLogin } = require('../validators/auth.validator');
const { authLimiter } = require('../middleware/rateLimiter.middleware');
router.post('/register',authLimiter, validate(validateRegister), register);
router.post('/login',authLimiter,validate(validateLogin), login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

module.exports = router;