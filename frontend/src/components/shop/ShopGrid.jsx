import ShopItem from "./ShopItem";
import Skeleton from "../common/Skeleton";
import EmptyState from "../common/EmptyState";

export default function ShopGrid({ items, loading, gold, onBuy }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => <Skeleton key={i} className="h-40" />)}
      </div>
    );
  }

  if (!items.length) {
    return <EmptyState icon="🏪" title="Shop is empty" subtitle="Check back later for new items." />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map((item) => (
        <ShopItem key={item.id} item={item} canAfford={gold >= item.price} onBuy={onBuy} />
      ))}
    </div>
  );
}