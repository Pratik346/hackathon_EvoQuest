export default function InventoryItem({ entry }) {
  const { item, purchasedAt } = entry;
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-center space-y-1">
      <div className="text-3xl">{item.icon}</div>
      <div className="font-bold text-sm">{item.name}</div>
      <div className="text-xs uppercase text-gray-500">{item.type}</div>
      <div className="text-[10px] text-gray-500">
        Acquired {new Date(purchasedAt).toLocaleDateString()}
      </div>
    </div>
  );
}