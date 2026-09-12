
import QuestCard from "./QuestCard";
import Skeleton from "../common/Skeleton";
import EmptyState from "../common/EmptyState";

export default function QuestList({
  quests,
  loading,
  onComplete,
  onEdit,
  onDelete,
}) {
  if (loading) {
    return (
      <div className="grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  if (!quests.length) {
    return (
      <EmptyState
        icon="🗒️"
        title="No quests yet"
        subtitle="Create your first quest to start earning XP."
      />
    );
  }

  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {quests.map((quest) => (
        <QuestCard
          key={quest._id}
          quest={quest}
          onComplete={onComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

