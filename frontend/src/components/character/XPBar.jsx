import { xpPercent } from "../../utils/formatXP";

export default function XPBar({ xp, xpToNextLevel }) {
  const percent = xpPercent(xp, xpToNextLevel);
  return (
    <div>
      <div className="flex justify-between text-xs text-gray-400 mb-1">
        <span>XP</span>
        <span>{xp} / {xpToNextLevel}</span>
      </div>
      <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}