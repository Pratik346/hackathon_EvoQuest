import { useState } from "react";
import Button from "../common/Button";

export default function CompleteQuestButton({ questId, completed, onComplete }) {
  const [busy, setBusy] = useState(false);

  const handleClick = async () => {
    if (busy || completed) return; // guards against double-click firing twice
    setBusy(true);
    try {
      await onComplete(questId);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button onClick={handleClick} disabled={completed || busy} className="text-sm">
      {completed ? "✅ Completed" : busy ? "Completing..." : "Complete Quest"}
    </Button>
  );
}