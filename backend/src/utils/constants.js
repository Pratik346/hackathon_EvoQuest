const CATEGORIES = ['coding', 'study', 'fitness', 'wellness', 'reading', 'creative'];

const DIFFICULTIES = ['easy', 'medium', 'hard', 'epic'];

const ATTRIBUTES = ['intelligence', 'strength', 'discipline', 'vitality'];

const ACTIVITY_TYPES = ['quest_completed', 'level_up', 'achievement_unlocked', 'item_purchased'];

const ITEM_TYPES = ['theme', 'avatar', 'badge', 'boost'];

// Category -> Attribute mapping (from problem statement)
const CATEGORY_ATTRIBUTE_MAP = {
  coding: 'intelligence',
  study: 'intelligence',
  fitness: 'strength',
  wellness: 'discipline',
  reading: 'discipline',
  creative: 'discipline', // adjust if problem statement clarifies further
};

// Difficulty -> base rewards (backend-controlled, frontend cannot override)
const DIFFICULTY_REWARDS = {
  easy: { xp: 20, gold: 10 },
  medium: { xp: 50, gold: 20 },
  hard: { xp: 100, gold: 40 },
  epic: { xp: 250, gold: 100 },
};

module.exports = {
  CATEGORIES,
  DIFFICULTIES,
  ATTRIBUTES,
  ACTIVITY_TYPES,
  ITEM_TYPES,
  CATEGORY_ATTRIBUTE_MAP,
  DIFFICULTY_REWARDS,
};