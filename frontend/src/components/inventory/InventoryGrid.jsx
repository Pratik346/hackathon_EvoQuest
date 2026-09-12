import InventoryItem from "./InventoryItem";
import Skeleton from "../common/Skeleton";
import EmptyState from "../common/EmptyState";

export default function InventoryGrid({ items, loading }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-32" />)}
      </div>
    );
  }

  if (!items.length) {
    return <EmptyState icon="🎒" title="Inventory is empty" subtitle="Visit the shop to pick up your first item." />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {items.map((entry) => <InventoryItem key={entry.id} entry={entry} />)}
    </div>
  );
}