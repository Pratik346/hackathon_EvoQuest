import { groupByDay, formatDate } from "../../utils/formatDate";
import Skeleton from "../common/Skeleton";
import EmptyState from "../common/EmptyState";

const ICONS = {
  quest_completed: "⚔️",
  level_up: "🔥",
  achievement_unlocked: "🏆",
  item_purchased: "🛒",
};

export default function ActivityTimeline({ activities, loading }) {
  if (loading) {
    return (
      <div className="space-y-2">
        {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12" />)}
      </div>
    );
  }

  if (!activities.length) {
    return <EmptyState icon="📜" title="No activity yet" subtitle="Complete a quest to start your history." />;
  }

  const grouped = groupByDay(activities);

  return (
    <div className="space-y-6">
      {Object.entries(grouped).map(([day, entries]) => (
        <div key={day}>
          <div className="text-xs text-gray-500 font-semibold mb-2">{day}</div>
          <div className="space-y-2">
            {entries.map((a) => (
              <div key={a.id} className="flex items-center gap-3 bg-gray-900 border border-gray-800 rounded-lg p-3">
                <div className="text-xl">{ICONS[a.type] || "📌"}</div>
                <div className="flex-1">
                  <div className="text-sm">{a.message}</div>
                  <div className="text-[10px] text-gray-500">{formatDate(a.createdAt)}</div>
                </div>
                {(a.xpEarned > 0 || a.goldEarned > 0) && (
                  <div className="text-xs text-right text-gray-400">
                    {a.xpEarned > 0 && <div>+{a.xpEarned} XP</div>}
                    {a.goldEarned > 0 && <div>+{a.goldEarned} Gold</div>}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}