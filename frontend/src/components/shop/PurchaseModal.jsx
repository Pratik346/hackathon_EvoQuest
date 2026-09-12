import Modal from "../common/Modal";
import Button from "../common/Button";

export default function PurchaseModal({ item, gold, open, onClose, onConfirm, busy }) {
  if (!item) return null;
  const remaining = gold - item.price;

  return (
    <Modal open={open} onClose={onClose} title="Confirm Purchase">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="text-3xl">{item.icon}</div>
          <div>
            <div className="font-bold">{item.name}</div>
            <div className="text-xs text-gray-400">{item.description}</div>
          </div>
        </div>
        <div className="text-sm text-gray-300">
          Cost: 💰 {item.price} · Remaining after purchase: 💰 {remaining}
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} disabled={busy}>
            {busy ? "Purchasing..." : "Confirm"}
          </Button>
        </div>
      </div>
    </Modal>
  );
}