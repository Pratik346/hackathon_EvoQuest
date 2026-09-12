const asyncHandler = require('../utils/asyncHandler');
const { registerUser, findUserByEmailWithPassword } = require('../services/auth.service');
const { generateToken, setTokenCookie } = require('../utils/generateToken');
const { getXpRequiredForLevel } = require('../utils/calculateLevel');

// @route POST /auth/register
exports.register = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const user = await registerUser({ name, email, password });
  const token = generateToken(user._id);
  setTokenCookie(res, token);

  res.status(201).json({
    success: true,
    message: 'Registration successful',
    data: {
      user: { id: user._id, name: user.name, email: user.email },
      character: user.toCharacterJSON(getXpRequiredForLevel(user.level)),
    },
  });
});

// @route POST /auth/login
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await findUserByEmailWithPassword(email);
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({
      success: false,
      message: 'Invalid email or password',
      errors: [],
    });
  }

  const token = generateToken(user._id);
  setTokenCookie(res, token);

  res.status(200).json({
    success: true,
    message: 'Login successful',
    data: {
      user: { id: user._id, name: user.name, email: user.email },
    },
  });
});

// @route POST /auth/logout
exports.logout = asyncHandler(async (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    success: true,
    message: 'Logout successful',
    data: null,
  });
});

// @route GET /auth/me
exports.getMe = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: 'User fetched successfully',
    data: {
      user: { id: req.user._id, name: req.user.name, email: req.user.email },
    },
  });
});