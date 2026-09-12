export default function AchievementCard({ achievement }) {
  const { name, description, icon, unlocked, unlockedAt } = achievement;

  return (
    <div
      className={`rounded-xl p-4 border text-center space-y-1 ${
        unlocked
          ? "bg-gray-900 border-yellow-500"
          : "bg-gray-900/40 border-gray-800 opacity-50 grayscale"
      }`}
    >
      <div className="text-3xl">{icon}</div>
      <div className="font-bold text-sm">{name}</div>
      <div className="text-xs text-gray-400">{description}</div>
      {unlocked && unlockedAt && (
        <div className="text-[10px] text-yellow-500">
          Unlocked {new Date(unlockedAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}