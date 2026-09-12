import { useEffect } from "react";

export default function AchievementPopup({ achievement, onClose }) {
  useEffect(() => {
    if (!achievement) return;
    const t = setTimeout(onClose, 3500);
    return () => clearTimeout(t);
  }, [achievement, onClose]);

  if (!achievement) return null;

  return (
    <div className="fixed top-6 right-6 z-50 bg-gray-900 border-2 border-yellow-500 rounded-xl p-4 shadow-2xl animate-bounce max-w-xs">
      <div className="flex items-center gap-3">
        <div className="text-3xl">{achievement.icon}</div>
        <div>
          <div className="text-xs text-yellow-500 font-bold">🏆 Achievement Unlocked!</div>
          <div className="font-bold">{achievement.name}</div>
          <div className="text-xs text-gray-400">{achievement.description}</div>
        </div>
      </div>
    </div>
  );
}