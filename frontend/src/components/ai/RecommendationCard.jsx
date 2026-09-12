const ICONS = { intelligence: "🧠", strength: "💪", discipline: "🧘", vitality: "❤️" };

export default function RecommendationCard({ recommendation }) {
  const { title, category, difficulty, attribute, reason } = recommendation;
  return (
    <div className="bg-gray-900 border border-purple-700 rounded-xl p-4 space-y-1">
      <div className="flex justify-between items-center">
        <span className="font-bold text-sm">{title}</span>
        <span className="text-xs uppercase text-purple-400">{difficulty}</span>
      </div>
      <div className="text-xs text-gray-500">{category} · {ICONS[attribute]} {attribute}</div>
      <p className="text-xs text-gray-400 pt-1">{reason}</p>
    </div>
  );
}