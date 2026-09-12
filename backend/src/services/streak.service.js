// Returns updated { currentStreak, longestStreak } given the user's last
// completion timestamp and "now". Streak logic: same calendar day = no change,
// consecutive calendar day = +1, gap of 2+ days = reset to 1.

const isSameDay = (a, b) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isNextDay = (prev, now) => {
  const nextDay = new Date(prev);
  nextDay.setDate(nextDay.getDate() + 1);
  return isSameDay(nextDay, now);
};

const calculateStreak = (lastCompletedAt, currentStreak, longestStreak) => {
  const now = new Date();

  if (!lastCompletedAt) {
    const newStreak = 1;
    return { currentStreak: newStreak, longestStreak: Math.max(longestStreak, newStreak) };
  }

  if (isSameDay(lastCompletedAt, now)) {
    // Already completed a quest today — streak unchanged
    return { currentStreak, longestStreak };
  }

  if (isNextDay(lastCompletedAt, now)) {
    const newStreak = currentStreak + 1;
    return { currentStreak: newStreak, longestStreak: Math.max(longestStreak, newStreak) };
  }

  // Gap of 2+ days — streak broken
  const newStreak = 1;
  return { currentStreak: newStreak, longestStreak: Math.max(longestStreak, newStreak) };
};

module.exports = { calculateStreak };