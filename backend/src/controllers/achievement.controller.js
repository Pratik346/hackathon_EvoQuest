const asyncHandler = require('../utils/asyncHandler');
const Achievement = require('../models/Achievement');
const UserAchievement = require('../models/UserAchievement');

// @route GET /achievements
exports.getAchievements = asyncHandler(async (req, res) => {
  const allAchievements = await Achievement.find();
  const userUnlocks = await UserAchievement.find({ user: req.user._id });

  const unlockedMap = new Map(userUnlocks.map((ua) => [ua.achievement.toString(), ua.createdAt]));

  const achievements = allAchievements.map((a) => ({
    id: a._id,
    name: a.name,
    description: a.description,
    icon: a.icon,
    unlocked: unlockedMap.has(a._id.toString()),
    unlockedAt: unlockedMap.get(a._id.toString()) || null,
  }));

  res.status(200).json({
    success: true,
    message: 'Achievements fetched successfully',
    data: { achievements },
  });
});