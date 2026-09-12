export default function ShopItem({ item, canAfford, onBuy }) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 text-center space-y-2">
      <div className="text-3xl">{item.icon}</div>
      <div className="font-bold text-sm">{item.name}</div>
      <div className="text-xs text-gray-400">{item.description}</div>
      <div className="text-xs uppercase text-gray-500">{item.type}</div>
      <button
        onClick={() => onBuy(item)}
        disabled={!canAfford}
        className={`w-full py-1.5 rounded-lg text-sm font-semibold ${
          canAfford ? "bg-yellow-600 hover:bg-yellow-700" : "bg-gray-700 cursor-not-allowed opacity-50"
        }`}
      >
        💰 {item.price}
      </button>
    </div>
  );
}