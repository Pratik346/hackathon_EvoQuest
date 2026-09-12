import { memo } from "react";
import { DIFFICULTY_COLORS } from "../../utils/constants";
import CompleteQuestButton from "./CompleteQuestButton";

function QuestCard({ quest, onComplete, onEdit, onDelete }) {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 space-y-2 transition-transform hover:scale-[1.02]">
      <div className="flex justify-between items-start">
        <h3 className="font-bold">{quest.title}</h3>

        <span
          className="text-xs px-2 py-0.5 rounded-full font-semibold"
          style={{
            backgroundColor: `${DIFFICULTY_COLORS[quest.difficulty]}22`,
            color: DIFFICULTY_COLORS[quest.difficulty],
          }}
        >
          {quest.difficulty.toUpperCase()}
        </span>
      </div>

      <p className="text-sm text-gray-400">{quest.description}</p>

      <div className="text-xs text-gray-500">
        {quest.category} · +{quest.xpReward} XP · +{quest.goldReward} Gold
      </div>

      <div className="flex justify-between items-center pt-2">
        <div className="flex gap-2 text-xs">
          <button
            onClick={() => onEdit(quest)}
            className="text-blue-400"
          >
            Edit
          </button>

          <button
            onClick={() => onDelete(quest._id)}
            className="text-red-400"
          >
            Delete
          </button>
        </div>

        <CompleteQuestButton
          questId={quest._id}
          completed={quest.completed}
          onComplete={onComplete}
        />
      </div>
    </div>
  );
}

export default memo(QuestCard);