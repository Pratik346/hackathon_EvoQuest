import { useEffect, useMemo, useState } from "react";
import { getActivity } from "../api/activity.api";
import ActivityTimeline from "../components/activity/ActivityTimeline";
import ErrorMessage from "../components/common/ErrorMessage";
import Button from "../components/common/Button";

/*
|--------------------------------------------------------------------------
| EVOQUEST — JOURNEY LOG
|--------------------------------------------------------------------------
| Backend/API remains unchanged.
|
| Existing API:
|   getActivity({ page, limit })
|
| Existing activity component:
|   ActivityTimeline
|
| This page only changes the visual experience and adds frontend
| filtering/statistical presentation around the existing activity data.
|--------------------------------------------------------------------------
*/

const FILTERS = [
  {
    key: "all",
    label: "All Events",
    icon: "✦",
  },
  {
    key: "quest_completed",
    label: "Missions",
    icon: "⚔️",
  },
  {
    key: "level_up",
    label: "Level Up",
    icon: "⚡",
  },
  {
    key: "achievement_unlocked",
    label: "Milestones",
    icon: "🏆",
  },
  {
    key: "item_purchased",
    label: "Rewards",
    icon: "🪙",
  },
];

function Panel({ children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] backdrop-blur-xl ${className}`}
    >
      {children}
    </div>
  );
}

function CornerFrame() {
  return (
    <>
      <span className="absolute left-2 top-2 h-4 w-4 border-l border-t border-white/15" />
      <span className="absolute right-2 top-2 h-4 w-4 border-r border-t border-white/15" />
      <span className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-white/15" />
      <span className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-white/15" />
    </>
  );
}

function StatCard({
  icon,
  label,
  value,
  description,
  tone = "violet",
}) {
  const tones = {
    violet: {
      border: "border-violet-300/15",
      background: "bg-violet-300/5",
      text: "text-violet-200",
    },
    cyan: {
      border: "border-cyan-300/15",
      background: "bg-cyan-300/5",
      text: "text-cyan-200",
    },
    gold: {
      border: "border-yellow-300/15",
      background: "bg-yellow-300/5",
      text: "text-yellow-200",
    },
    orange: {
      border: "border-orange-300/15",
      background: "bg-orange-300/5",
      text: "text-orange-200",
    },
  };

  const current = tones[tone] || tones.violet;

  return (
    <div
      className={`rounded-2xl border ${current.border} ${current.background} p-5`}
    >
      <div className="flex items-center justify-between">
        <span className="text-2xl">
          {icon}
        </span>

        <span
          className={`text-[8px] uppercase tracking-[0.25em] ${current.text}`}
        >
          {label}
        </span>
      </div>

      <div className={`mt-4 font-serif text-3xl font-black ${current.text}`}>
        {value}
      </div>

      <p className="mt-1 text-[10px] leading-5 text-slate-600">
        {description}
      </p>
    </div>
  );
}

function EventIcon({ type }) {
  const icons = {
    quest_completed: "⚔️",
    level_up: "⚡",
    achievement_unlocked: "🏆",
    item_purchased: "🪙",
  };

  return icons[type] || "✦";
}

function EventTypeBadge({ type }) {
  const labels = {
    quest_completed: "Mission",
    level_up: "Level Up",
    achievement_unlocked: "Milestone",
    item_purchased: "Reward",
  };

  const colors = {
    quest_completed:
      "border-violet-300/15 bg-violet-300/5 text-violet-200",
    level_up:
      "border-cyan-300/15 bg-cyan-300/5 text-cyan-200",
    achievement_unlocked:
      "border-yellow-300/15 bg-yellow-300/5 text-yellow-200",
    item_purchased:
      "border-orange-300/15 bg-orange-300/5 text-orange-200",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1.5 text-[8px] font-bold uppercase tracking-widest ${
        colors[type] ||
        "border-white/10 bg-white/5 text-slate-500"
      }`}
    >
      {labels[type] || "Activity"}
    </span>
  );
}

function JourneySummary({ activities }) {
  const counts = useMemo(() => {
    return {
      missions: activities.filter(
        (item) => item.type === "quest_completed"
      ).length,

      levels: activities.filter(
        (item) => item.type === "level_up"
      ).length,

      milestones: activities.filter(
        (item) => item.type === "achievement_unlocked"
      ).length,

      rewards: activities.filter(
        (item) => item.type === "item_purchased"
      ).length,
    };
  }, [activities]);

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <StatCard
        icon="⚔️"
        value={counts.missions}
        label="Missions"
        description="Completed actions"
        tone="violet"
      />

      <StatCard
        icon="⚡"
        value={counts.levels}
        label="Level Ups"
        description="Progression moments"
        tone="cyan"
      />

      <StatCard
        icon="🏆"
        value={counts.milestones}
        label="Milestones"
        description="Unlocked achievements"
        tone="gold"
      />

      <StatCard
        icon="🪙"
        value={counts.rewards}
        label="Rewards"
        description="Items acquired"
        tone="orange"
      />
    </div>
  );
}

function ActivityHero({
  activities,
  totalPages,
}) {
  const total = activities.length;

  const latest = activities[0];

  return (
    <Panel className="mb-6">

      <CornerFrame />

      <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-500/10 blur-[100px]" />

      <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[100px]" />

      <div className="relative grid lg:grid-cols-[0.75fr_1.25fr]">

        {/* visual */}
        <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden border-b border-white/5 lg:border-b-0 lg:border-r">

          <div className="absolute h-64 w-64 rounded-full border border-violet-300/10" />

          <div className="absolute h-48 w-48 rounded-full border border-cyan-300/10 border-dashed" />

          <div className="absolute h-40 w-40 rounded-full bg-violet-500/10 blur-[70px]" />

          <div className="relative text-center">

            <div className="text-[120px] drop-shadow-[0_25px_40px_rgba(0,0,0,0.75)]">
              📜
            </div>

            <div className="mt-3 font-serif text-2xl font-black">
              Journey Log
            </div>

            <div className="mt-2 text-[8px] uppercase tracking-[0.4em] text-violet-200">
              Your story in motion
            </div>

          </div>

          <div className="absolute left-6 top-6">
            <div className="text-[8px] uppercase tracking-widest text-slate-700">
              CHRONICLE
            </div>
            <div className="mt-1 font-mono text-[8px] text-cyan-200">
              ONLINE
            </div>
          </div>

        </div>

        {/* summary */}
        <div className="p-7 md:p-9">

          <div className="flex items-start justify-between gap-5">

            <div>

              <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
                Adventure Chronicle
              </div>

              <h2 className="mt-2 font-serif text-3xl font-black">
                Every action leaves a mark.
              </h2>

              <p className="mt-3 max-w-xl text-xs leading-6 text-slate-600">
                Your journey log records the moments that shape your
                EvoQuest character — completed missions, progression,
                milestones and rewards.
              </p>

            </div>

            <div className="hidden rounded-2xl border border-cyan-300/10 bg-cyan-300/5 px-5 py-4 text-right sm:block">

              <div className="text-[8px] uppercase tracking-widest text-slate-700">
                Loaded events
              </div>

              <div className="mt-1 font-serif text-3xl font-black text-cyan-200">
                {total}
              </div>

            </div>

          </div>

          <div className="mt-7 grid grid-cols-2 gap-3">

            <div className="rounded-xl border border-white/5 bg-black/20 p-4">

              <div className="text-[8px] uppercase tracking-widest text-slate-700">
                Chronicle state
              </div>

              <div className="mt-2 flex items-center gap-2 text-sm font-bold">
                <span className="h-2 w-2 rounded-full bg-emerald-300 shadow-[0_0_12px_rgba(110,231,183,0.6)]" />
                Active
              </div>

            </div>

            <div className="rounded-xl border border-white/5 bg-black/20 p-4">

              <div className="text-[8px] uppercase tracking-widest text-slate-700">
                Pages available
              </div>

              <div className="mt-2 font-mono text-sm font-bold text-violet-200">
                {totalPages}
              </div>

            </div>

          </div>

          <div className="mt-6">
            <JourneySummary activities={activities} />
          </div>

          {latest ? (
            <div className="mt-6 rounded-2xl border border-violet-300/10 bg-violet-300/5 p-4">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/20 text-xl">
                  <EventIcon type={latest.type} />
                </div>

                <div className="min-w-0">
                  <div className="text-[8px] uppercase tracking-widest text-slate-700">
                    Latest moment
                  </div>

                  <div className="mt-1 truncate text-sm font-black">
                    {latest.title ||
                      latest.message ||
                      "A new moment was recorded."}
                  </div>
                </div>

              </div>

            </div>
          ) : null}

        </div>

      </div>

    </Panel>
  );
}

function EventLegend() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">

      {FILTERS.slice(1).map((filter) => (
        <div
          key={filter.key}
          className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5">
            {filter.icon}
          </div>

          <div>
            <div className="text-xs font-bold">
              {filter.label}
            </div>

            <div className="text-[8px] uppercase tracking-widest text-slate-700">
              Journey event
            </div>
          </div>
        </div>
      ))}

    </div>
  );
}

function FilterButton({
  active,
  icon,
  label,
  count,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-4 py-2.5 text-[8px] font-bold uppercase tracking-widest transition ${
        active
          ? "border-violet-300/30 bg-violet-500/15 text-violet-200"
          : "border-white/10 bg-white/[0.02] text-slate-600 hover:text-white"
      }`}
    >
      <span>{icon}</span>

      <span>{label}</span>

      {typeof count === "number" ? (
        <span className="font-mono opacity-60">
          {count}
        </span>
      ) : null}
    </button>
  );
}

export default function ActivityPage() {
  const [activities, setActivities] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const load = async (
    targetPage = 1,
    append = false
  ) => {
    setLoading(true);
    setError("");

    try {
      const res = await getActivity({
        page: targetPage,
        limit: 20,
      });

      const incoming =
        res?.data?.activities ?? [];

      setActivities((prev) =>
        append
          ? [...prev, ...incoming]
          : incoming
      );

      setTotalPages(
        res?.data?.pagination?.totalPages ?? 1
      );

      setPage(targetPage);
    } catch (e) {
      setError(
        e?.message ||
          "Unable to load your journey."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load(1);
  }, []);

  if (error) {
    return (
      <main className="min-h-screen bg-[#06111b] px-5 py-10 text-white md:px-8">
        <div className="mx-auto max-w-[1200px]">
          <ErrorMessage
            message={error}
            onRetry={() => load(1)}
          />
        </div>
      </main>
    );
  }

  const counts = {
    quest_completed: activities.filter(
      (item) =>
        item.type === "quest_completed"
    ).length,

    level_up: activities.filter(
      (item) =>
        item.type === "level_up"
    ).length,

    achievement_unlocked:
      activities.filter(
        (item) =>
          item.type ===
          "achievement_unlocked"
      ).length,

    item_purchased:
      activities.filter(
        (item) =>
          item.type ===
          "item_purchased"
      ).length,
  };

  const displayedActivities =
    filter === "all"
      ? activities
      : activities.filter(
          (item) =>
            item.type === filter
        );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#06111b] text-white">

      {/* =====================================================
          BACKGROUND
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0">

        <div className="absolute left-[-180px] top-[-160px] h-[600px] w-[600px] rounded-full bg-violet-700/10 blur-[150px]" />

        <div className="absolute right-[-180px] top-[25%] h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[150px]" />

        <div className="absolute bottom-[-180px] left-[28%] h-[600px] w-[600px] rounded-full bg-fuchsia-600/10 blur-[150px]" />

        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:30px_30px]" />

      </div>

      {/* =====================================================
          PAGE
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 py-8 md:px-8 md:py-10">

        {/* ===================================================
            HEADER
        ==================================================== */}

        <section className="mb-8">

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>

              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.4em] text-cyan-200">

                <span className="h-px w-8 bg-cyan-300/60" />

                Journey Log

              </div>

              <h1 className="mt-4 font-serif text-5xl font-black leading-[0.92] sm:text-6xl md:text-7xl">

                Your
                <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-200 bg-clip-text text-transparent">
                  Story.
                </span>

              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                Every mission completed, every level gained and every
                milestone unlocked becomes part of your personal history.
              </p>

            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-4">

              <div className="text-[8px] uppercase tracking-widest text-slate-700">
                Chronicle status
              </div>

              <div className="mt-2 flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-300" />

                <span className="text-xs font-bold text-emerald-200">
                  JOURNEY ACTIVE
                </span>
              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            HERO
        ==================================================== */}

        <ActivityHero
          activities={activities}
          totalPages={totalPages}
        />

        {/* ===================================================
            EVENT LEGEND
        ==================================================== */}

        <section className="mb-6">

          <div className="mb-4">

            <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
              Event Types
            </div>

            <h2 className="mt-2 font-serif text-2xl font-black">
              What shapes your story?
            </h2>

          </div>

          <EventLegend />

        </section>

        {/* ===================================================
            FILTERS
        ==================================================== */}

        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">

          <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">

            <div>

              <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-200">
                Journey Filter
              </div>

              <div className="mt-1 text-xs text-slate-600">
                Focus on a specific type of progress.
              </div>

            </div>

            <div className="flex flex-wrap gap-2">

              {FILTERS.map((item) => (
                <FilterButton
                  key={item.key}
                  active={filter === item.key}
                  icon={item.icon}
                  label={item.label}
                  count={
                    item.key === "all"
                      ? activities.length
                      : counts[item.key]
                  }
                  onClick={() =>
                    setFilter(item.key)
                  }
                />
              ))}

            </div>

          </div>

        </section>

        {/* ===================================================
            CHRONICLE
        ==================================================== */}

        <section>

          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

            <div>

              <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-fuchsia-300">
                Adventure Chronicle
              </div>

              <h2 className="mt-2 font-serif text-2xl font-black">
                Recent Moments
              </h2>

            </div>

            <div className="text-[8px] uppercase tracking-widest text-slate-700">
              {displayedActivities.length} events visible
            </div>

          </div>

          <Panel className="p-5 md:p-7">

            <div className="relative">

              {/* timeline rail */}
              {displayedActivities.length > 1 ? (
                <div className="absolute bottom-10 left-[22px] top-5 w-px bg-gradient-to-b from-violet-300/40 via-cyan-300/15 to-transparent" />
              ) : null}

              <ActivityTimeline
                activities={displayedActivities}
                loading={loading && page === 1}
              />

            </div>

          </Panel>

        </section>

        {/* ===================================================
            PAGINATION
        ==================================================== */}

        {page < totalPages ? (
          <div className="mt-7 flex justify-center">

            <div className="rounded-full border border-white/10 bg-white/[0.025] p-1 backdrop-blur-xl">

              <Button
                variant="ghost"
                onClick={() =>
                  load(page + 1, true)
                }
                disabled={loading}
              >
                {loading
                  ? "Loading Journey..."
                  : "Load More Moments →"}
              </Button>

            </div>

          </div>
        ) : (
          <div className="mt-8 text-center">

            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.025] px-5 py-3">

              <span className="text-xs text-violet-200">
                ✦
              </span>

              <span className="text-[8px] uppercase tracking-[0.25em] text-slate-600">
                You have reached the beginning of the current chronicle.
              </span>

            </div>

          </div>
        )}

        {/* ===================================================
            FOOTER
        ==================================================== */}

        <footer className="mt-10 flex flex-col justify-between gap-3 border-t border-white/5 pt-6 text-[8px] uppercase tracking-widest text-slate-700 sm:flex-row">

          <span>
            EvoQuest • Journey Log
          </span>

          <span>
            Every action becomes part of your story.
          </span>

        </footer>

      </div>

    </main>
  );
}