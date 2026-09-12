import { useEffect, useState } from "react";

import { getAchievements } from "../api/achievements.api";
import { useApiRequest } from "../hooks/useApiRequest";
import { useGame } from "../hooks/useGame";

import AchievementCard from "../components/achievements/AchievementCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";
import EmptyState from "../components/common/EmptyState";

const FILTERS = ["ALL", "UNLOCKED", "LOCKED"];

function StatBox({ icon, value, label, tone = "purple" }) {
  const toneClasses = {
    purple: "border-purple-700 bg-purple-950/30",
    cyan: "border-cyan-700 bg-cyan-950/30",
    orange: "border-orange-700 bg-orange-950/30",
    yellow: "border-yellow-700 bg-yellow-950/30",
  };

  return (
    <div
      className={`rounded-xl border p-4 ${
        toneClasses[tone] || toneClasses.purple
      }`}
    >
      <div className="text-2xl">{icon}</div>

      <div className="mt-2 text-2xl font-bold text-white">
        {value}
      </div>

      <div className="text-sm text-gray-400">
        {label}
      </div>
    </div>
  );
}

function JourneyStage({ level, title, description, unlocked }) {
  return (
    <div
      className={`rounded-xl border p-4 transition ${
        unlocked
          ? "border-purple-700 bg-purple-950/30"
          : "border-gray-800 bg-gray-900/50 opacity-50"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-full font-bold ${
            unlocked
              ? "bg-purple-600 text-white"
              : "bg-gray-800 text-gray-500"
          }`}
        >
          {unlocked ? "✓" : level}
        </div>

        <div>
          <h3 className="font-bold text-white">
            {title}
          </h3>

          <p className="text-sm text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function AchievementsPage() {
  const { data, loading, error, run } = useApiRequest(getAchievements);

  const { character } = useGame();

  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    run();
  }, [run]);

  const achievements = data?.achievements ?? [];

  const unlockedAchievements = achievements.filter(
    (achievement) => achievement.unlocked
  );

  const lockedAchievements = achievements.filter(
    (achievement) => !achievement.unlocked
  );

  const completionPercentage =
    achievements.length > 0
      ? Math.round(
          (unlockedAchievements.length / achievements.length) * 100
        )
      : 0;

  const filteredAchievements =
    filter === "ALL"
      ? achievements
      : filter === "UNLOCKED"
      ? unlockedAchievements
      : lockedAchievements;

  const level = character?.level ?? 1;
  const longestStreak = character?.longestStreak ?? 0;

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl p-6">
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl space-y-8 p-4 sm:p-6">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Achievements
        </h1>

        <p className="mt-1 text-gray-400">
          Track your accomplishments and progress through your journey.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <StatBox
          icon="🏆"
          value={unlockedAchievements.length}
          label="Unlocked"
          tone="purple"
        />

        <StatBox
          icon="🎯"
          value={achievements.length}
          label="Total achievements"
          tone="cyan"
        />

        <StatBox
          icon="🔥"
          value={longestStreak}
          label="Best streak"
          tone="orange"
        />

        <StatBox
          icon="📈"
          value={`${completionPercentage}%`}
          label="Completion"
          tone="yellow"
        />
      </div>

      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white">
            Journey Stages
          </h2>

          <p className="text-sm text-gray-400">
            Keep leveling up to unlock new stages.
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <JourneyStage
            level="01"
            title="The Beginning"
            description="Start your adventure and complete your first quests."
            unlocked={level >= 1}
          />

          <JourneyStage
            level="05"
            title="Rising Hero"
            description="Reach Level 5 and prove your consistency."
            unlocked={level >= 5}
          />

          <JourneyStage
            level="10"
            title="Seasoned Adventurer"
            description="Reach Level 10 and become a seasoned adventurer."
            unlocked={level >= 10}
          />

          <JourneyStage
            level="20"
            title="Legend"
            description="Reach Level 20 and earn legendary status."
            unlocked={level >= 20}
          />
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex flex-wrap gap-2">
          {FILTERS.map((item) => (
            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                filter === item
                  ? "bg-purple-600 text-white"
                  : "bg-gray-900 text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {filteredAchievements.length === 0 ? (
          <EmptyState
            icon="🏆"
            title="No achievements found"
            subtitle={
              filter === "UNLOCKED"
                ? "Complete quests and challenges to unlock achievements."
                : "There are no achievements in this category yet."
            }
          />
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredAchievements.map((achievement) => (
              <AchievementCard
                key={achievement._id}
                achievement={achievement}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}