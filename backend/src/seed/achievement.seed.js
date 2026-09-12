const Achievement = require('../models/Achievement');

const ACHIEVEMENTS = [
  { key: 'first_flame', name: 'First Flame', description: 'Complete your first quest', icon: '🔥' },
  { key: 'quest_hunter', name: 'Quest Hunter', description: 'Complete 10 quests', icon: '⚔️' },
  { key: 'unstoppable', name: 'Unstoppable', description: 'Reach a 7-day streak', icon: '🔥' },
  { key: 'scholar', name: 'Scholar', description: 'Earn 500 Intelligence XP', icon: '🧠' },
  { key: 'treasure_hunter', name: 'Treasure Hunter', description: 'Earn 1,000 Gold', icon: '💰' },
  { key: 'rising_hero', name: 'Rising Hero', description: 'Reach Level 5', icon: '👑' },
];

const seedAchievements = async () => {
  for (const a of ACHIEVEMENTS) {
    await Achievement.updateOne({ key: a.key }, { $setOnInsert: a }, { upsert: true });
  }
  console.log('Achievements seeded');
};

module.exports = { seedAchievements, ACHIEVEMENTS };