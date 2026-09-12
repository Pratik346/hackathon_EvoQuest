import LevelBadge from "./LevelBadge";
import XPBar from "./XPBar";
import AttributeCard from "./AttributeCard";

export default function CharacterCard({ character }) {
  if (!character) return null;

  const {
    level,
    xp,
    xpToNextLevel,
    gold,
    attributes,
    currentStreak,
  } = character;

  const attributeNames = [
    "intelligence",
    "strength",
    "discipline",
    "vitality",
  ];

  return (
    <div className="bg-gray-900 border border-purple-700 rounded-xl p-5 space-y-4">
      <div className="flex items-center gap-4">
        <LevelBadge level={level} />

        <div className="flex-1">
          <XPBar
            xp={xp}
            xpToNextLevel={xpToNextLevel}
          />
        </div>
      </div>

      <div className="flex justify-between text-sm">
        <span>💰 {gold} Gold</span>
        <span>🔥 {currentStreak} day streak</span>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {attributeNames.map((name) => (
          <AttributeCard
            key={name}
            name={name}
            value={attributes?.[name] ?? 0}
          />
        ))}
      </div>
    </div>
  );
}