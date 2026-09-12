const Achievement = require('../models/Achievement');
const UserAchievement = require('../models/UserAchievement');
const Quest = require('../models/Quest');
const { logActivity } = require('./activity.service');

// Checks all achievement conditions against the user's current state.
// Called after every quest completion. Returns array of newly unlocked achievements
// in the exact shape the API contract expects.
const checkAndUnlockAchievements = async (user) => {
  const alreadyUnlocked = await UserAchievement.find({ user: user._id }).select('achievement');
  const allAchievements = await Achievement.find();
  const unlockedIds = new Set(alreadyUnlocked.map((ua) => ua.achievement.toString()));

  const completedQuestCount = await Quest.countDocuments({ user: user._id, completed: true });

  const conditions = {
    first_flame: completedQuestCount >= 1,
    quest_hunter: completedQuestCount >= 10,
    unstoppable: user.currentStreak >= 7,
    scholar: user.attributes.intelligence >= 500,
    treasure_hunter: user.gold >= 1000,
    rising_hero: user.level >= 5,
  };

  const newlyUnlocked = [];

  for (const achievement of allAchievements) {
    const alreadyHas = unlockedIds.has(achievement._id.toString());
    const meetsCondition = conditions[achievement.key];

    if (!alreadyHas && meetsCondition) {
      await UserAchievement.create({ user: user._id, achievement: achievement._id });
      await logActivity({
        userId: user._id,
        type: 'achievement_unlocked',
        message: `Unlocked "${achievement.name}"`,
      });

      newlyUnlocked.push({
        id: achievement._id,
        name: achievement.name,
        description: achievement.description,
        icon: achievement.icon,
      });
    }
  }

  return newlyUnlocked;
};

module.exports = { checkAndUnlockAchievements };