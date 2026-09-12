import { useEffect, useState } from "react";

export default function LevelUpOverlay({ event, onDone }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!event) return;
    setVisible(true);

    const t = setTimeout(() => {
      setVisible(false);
      onDone();
    }, 2200);

    return () => clearTimeout(t);
  }, [event, onDone]);

  if (!event) return null;

  return (
    <div
      className={`fixed inset-0 z-[60] flex items-center justify-center bg-black/80 transition-opacity ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="text-center">
        <div className="text-6xl mb-2 animate-pulse">🔥</div>

        <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-neon-purple to-neon-pink">
          LEVEL UP!
        </div>

        <div className="text-xl mt-2">
          {event.previousLevel} →{" "}
          <span className="text-neon-cyan">
            {event.newLevel}
          </span>
        </div>
      </div>
    </div>
  );
}