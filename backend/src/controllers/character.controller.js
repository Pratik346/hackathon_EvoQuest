const asyncHandler = require('../utils/asyncHandler');
const { getXpRequiredForLevel } = require('../utils/calculateLevel');

// @route GET /character
exports.getCharacter = asyncHandler(async (req, res) => {
  const user = req.user;

  res.status(200).json({
    success: true,
    message: 'Character fetched successfully',
    data: user.toCharacterJSON(getXpRequiredForLevel(user.level)),
  });
});