// XP required to complete the CURRENT level (not cumulative).
// Matches problem statement examples: Level1->100, Level2->400, Level3->900, Level4->1600
const getXpRequiredForLevel = (level) => level * level * 100;

// Applies an XP gain to a user's current level/xp, handling multi-level-ups
// in a single completion (e.g. epic quest could theoretically jump 2 levels).
const applyXpGain = (currentLevel, currentXp, xpGained) => {
  let level = currentLevel;
  let xp = currentXp + xpGained;
  let leveledUp = false;
  const previousLevel = currentLevel;

  let required = getXpRequiredForLevel(level);
  while (xp >= required) {
    xp -= required;
    level += 1;
    leveledUp = true;
    required = getXpRequiredForLevel(level);
  }

  return {
    level,
    xp,
    leveledUp,
    previousLevel: leveledUp ? previousLevel : null,
    newLevel: leveledUp ? level : null,
    xpToNextLevel: required,
  };
};

module.exports = { getXpRequiredForLevel, applyXpGain };