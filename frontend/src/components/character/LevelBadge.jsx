export default function LevelBadge({ level }) {
  return (
    <div className="w-14 h-14 rounded-full bg-purple-700 flex items-center justify-center font-bold text-lg border-2 border-purple-400">
      {level}
    </div>
  );
}