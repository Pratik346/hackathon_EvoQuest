export function formatXP(xp) {
  return xp.toLocaleString();
}

export function xpPercent(xp, xpToNextLevel) {
  if (!xpToNextLevel) return 0;
  return Math.min(100, Math.round((xp / xpToNextLevel) * 100));
}