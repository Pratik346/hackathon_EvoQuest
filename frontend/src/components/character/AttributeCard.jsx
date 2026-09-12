const ICONS = { intelligence: "🧠", strength: "💪", discipline: "🧘", vitality: "❤️" };

export default function AttributeCard({ name, value }) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-3 text-center">
      <div className="text-2xl">{ICONS[name]}</div>
      <div className="text-xs text-gray-400 capitalize">{name}</div>
      <div className="font-bold">{value}</div>
    </div>
  );
}