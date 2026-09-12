export default function AIAnalysis({ analysis }) {
  if (!analysis) return null;
  return (
    <div className="bg-purple-950/40 border border-purple-700 rounded-xl p-4 text-sm text-gray-200">
      🧙 {analysis}
    </div>
  );
}