export default function EmptyState({ icon = "📭", title, subtitle, action }) {
  return (
    <div className="text-center p-10 text-gray-400">
      <div className="text-4xl mb-2">{icon}</div>
      <p className="font-semibold text-white">{title}</p>
      {subtitle && <p className="text-sm mt-1">{subtitle}</p>}
      {action}
    </div>
  );
}