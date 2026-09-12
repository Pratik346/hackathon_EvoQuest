
import { useEffect, useMemo, useState } from "react";
import { useQuests } from "../hooks/useQuests";
import { useGame } from "../hooks/useGame";
import QuestList from "../components/quests/QuestList";
import QuestFilters from "../components/quests/QuestFilters";
import QuestForm from "../components/quests/QuestForm";
import Modal from "../components/common/Modal";
import ErrorMessage from "../components/common/ErrorMessage";
import LevelUpOverlay from "../components/common/LevelUpOverlay";
import { Link } from "react-router-dom";

/*
|--------------------------------------------------------------------------
| EVOQUEST — MISSION BOARD
|--------------------------------------------------------------------------
|
| Backend-authoritative data:
|
|   Missions      -> GET /api/v1/quests
|   Character     -> GET /api/v1/character
|   Completion    -> POST /api/v1/quests/:id/complete
|
| Frontend does NOT calculate:
|
|   XP
|   Gold
|   Level
|   Attributes
|   Streak
|
| Those remain server-authoritative.
|--------------------------------------------------------------------------
*/

const DIFFICULTIES = [
  {
    name: "Easy",
    icon: "🌱",
    color: "text-emerald-300",
    description: "Small meaningful progress.",
  },
  {
    name: "Medium",
    icon: "⚔️",
    color: "text-cyan-300",
    description: "A focused challenge.",
  },
  {
    name: "Hard",
    icon: "🔥",
    color: "text-orange-300",
    description: "Push beyond comfort.",
  },
  {
    name: "Epic",
    icon: "👑",
    color: "text-fuchsia-300",
    description: "A major personal challenge.",
  },
];

const MISSION_CATEGORIES = [
  {
    icon: "🧠",
    name: "Coding",
    description: "Technical and problem-solving missions.",
  },
  {
    icon: "📚",
    name: "Study",
    description: "Learning and knowledge missions.",
  },
  {
    icon: "💪",
    name: "Fitness",
    description: "Strength and health missions.",
  },
  {
    icon: "🎯",
    name: "Discipline",
    description: "Focus and consistency missions.",
  },
];

function Panel({
  children,
  className = "",
}) {
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

function ProgressBar({
  value,
  gradient = "from-violet-500 to-cyan-400",
  height = "h-2",
}) {
  const safeValue = Math.max(
    0,
    Math.min(100, Number(value) || 0)
  );

  return (
    <div
      className={`overflow-hidden rounded-full bg-black/30 ${height}`}
    >
      <div
        className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-700`}
        style={{
          width: `${safeValue}%`,
        }}
      />
    </div>
  );
}

function StatCard({
  icon,
  value,
  label,
  description,
  tone = "violet",
}) {
  const tones = {
    violet:
      "border-violet-300/10 bg-violet-300/5 text-violet-200",

    cyan:
      "border-cyan-300/10 bg-cyan-300/5 text-cyan-200",

    orange:
      "border-orange-300/10 bg-orange-300/5 text-orange-200",

    yellow:
      "border-yellow-300/10 bg-yellow-300/5 text-yellow-200",

    gold:
      "border-yellow-300/10 bg-yellow-300/5 text-yellow-200",
  };

  return (
    <div
      className={`rounded-2xl border p-5 ${
        tones[tone] || tones.violet
      }`}
    >
      <div className="flex items-center justify-between">
        <span className="text-xl">
          {icon}
        </span>

        <span className="text-[8px] uppercase tracking-widest text-slate-700">
          {label}
        </span>
      </div>

      <div className="mt-3 font-serif text-3xl font-black">
        {value}
      </div>

      <div className="mt-1 text-[10px] leading-5 text-slate-600">
        {description}
      </div>
    </div>
  );
}

function CategoryCard({
  item,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/5 text-lg">
          {item.icon}
        </div>

        <div>
          <div className="text-xs font-bold">
            {item.name}
          </div>

          <div className="mt-1 text-[9px] leading-4 text-slate-700">
            {item.description}
          </div>
        </div>
      </div>
    </div>
  );
}

function EmptyMissionState({
  onCreate,
}) {
  return (
    <div className="flex min-h-[320px] flex-col items-center justify-center rounded-2xl border border-dashed border-white/10 bg-black/10 px-6 text-center">
      <div className="text-6xl">
        🗺️
      </div>

      <h3 className="mt-5 font-serif text-2xl font-black">
        No missions found
      </h3>

      <p className="mt-2 max-w-md text-xs leading-6 text-slate-600">
        The mission board is quiet. Create a new real-world mission
        and give your character something meaningful to accomplish.
      </p>

      <button
        type="button"
        onClick={onCreate}
        className="mt-6 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3.5 text-xs font-black uppercase tracking-widest shadow-xl shadow-violet-500/20"
      >
        + Create Mission
      </button>
    </div>
  );
}

function DifficultyWithCount({
  item,
  count,
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-white/[0.02] p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-black/20">
        {item.icon}
      </div>

      <div className="min-w-0 flex-1">
        <div
          className={`text-xs font-bold ${item.color}`}
        >
          {item.name}
        </div>

        <div className="mt-1 text-[9px] text-slate-700">
          {item.description}
        </div>
      </div>

      <div className="font-mono text-xs text-slate-500">
        {count}
      </div>
    </div>
  );
}

export default function QuestsPage() {
  const {
    quests,
    loading,
    error,
    fetchQuests,
    addQuest,
    editQuest,
    removeQuest,
    finishQuest,
  } = useQuests();

  const {
    character,
    refreshCharacter,
  } = useGame();

  const [filters, setFilters] = useState({});
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [levelUpEvent, setLevelUpEvent] = useState(null);
  const [selectedMission, setSelectedMission] = useState(null);
  const [search, setSearch] = useState("");
  const [viewMode, setViewMode] = useState("board");

  /*
  |--------------------------------------------------------------------------
  | LOAD DATA
  |--------------------------------------------------------------------------
  |
  | Missions -> backend
  | Character -> backend
  |
  */

  useEffect(() => {
    fetchQuests(filters);
  }, [filters, fetchQuests]);

  useEffect(() => {
    refreshCharacter();
  }, [refreshCharacter]);

  /*
  |--------------------------------------------------------------------------
  | SAFE QUEST ARRAY
  |--------------------------------------------------------------------------
  */

  const safeQuests = Array.isArray(quests)
    ? quests
    : [];

  /*
  |--------------------------------------------------------------------------
  | KEEP SELECTED MISSION IN SYNC
  |--------------------------------------------------------------------------
  |
  | After fetchQuests(), the quest objects are replaced.
  | Therefore we find the same quest again using MongoDB _id.
  |
  */

  useEffect(() => {
    if (!selectedMission) {
      return;
    }

    const updatedMission = safeQuests.find(
      (quest) => quest._id === selectedMission._id
    );

    if (updatedMission) {
      setSelectedMission(updatedMission);
    } else {
      setSelectedMission(null);
    }
  }, [safeQuests, selectedMission?._id]);

  /*
  |--------------------------------------------------------------------------
  | CREATE / EDIT
  |--------------------------------------------------------------------------
  */

  const handleCreateOrEdit = async (payload) => {
    try {
      if (editing) {
        await editQuest(
          editing._id,
          payload
        );
      } else {
        await addQuest(payload);
      }

      setModalOpen(false);
      setEditing(null);

      /*
       * Refresh missions and character from backend.
       */
      await fetchQuests(filters);
      await refreshCharacter();
    } catch (error) {
      throw error;
    }
  };

  /*
  |--------------------------------------------------------------------------
  | COMPLETE QUEST
  |--------------------------------------------------------------------------
  |
  | IMPORTANT:
  |
  | The frontend sends only the quest ID.
  |
  | Backend decides:
  |   XP
  |   Gold
  |   Attribute
  |   Streak
  |   Level
  |
  */

  const handleComplete = async (id) => {
    if (!id) {
      console.error(
        "Cannot complete quest: missing quest ID"
      );
      return;
    }

    try {
      const result = await finishQuest(id);

      /*
       * Backend has already updated the character.
       * Get the latest values.
       */
      await refreshCharacter();

      /*
       * Get latest quest status.
       */
      await fetchQuests(filters);

      /*
       * Level-up information comes from backend.
       */
      if (result?.events?.levelUp) {
        setLevelUpEvent(result.events);
      }
    } catch (error) {
      throw error;
    }
  };

  /*
  |--------------------------------------------------------------------------
  | SEARCH
  |--------------------------------------------------------------------------
  */

  const filteredQuests = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return safeQuests;
    }

    return safeQuests.filter((quest) => {
      const text = [
        quest.title,
        quest.description,
        quest.category,
        quest.difficulty,
        quest.attribute,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return text.includes(query);
    });
  }, [safeQuests, search]);

  /*
  |--------------------------------------------------------------------------
  | QUEST COUNTS
  |--------------------------------------------------------------------------
  */

  const activeQuests = safeQuests.filter(
    (quest) => !quest.completed
  );

  const completedQuests = safeQuests.filter(
    (quest) => quest.completed
  );

  const easyCount = safeQuests.filter(
    (quest) =>
      String(quest.difficulty).toLowerCase() === "easy"
  ).length;

  const mediumCount = safeQuests.filter(
    (quest) =>
      String(quest.difficulty).toLowerCase() === "medium"
  ).length;

  const hardCount = safeQuests.filter(
    (quest) =>
      String(quest.difficulty).toLowerCase() === "hard"
  ).length;

  const epicCount = safeQuests.filter(
    (quest) =>
      String(quest.difficulty).toLowerCase() === "epic"
  ).length;

  /*
  |--------------------------------------------------------------------------
  | POTENTIAL XP
  |--------------------------------------------------------------------------
  |
  | Sum of XP rewards from ACTIVE quests only.
  |
  | Example:
  |
  | Quest A = 20 XP
  | Quest B = 50 XP
  |
  | Potential = 70 XP
  |
  */

  const totalAvailableXP = activeQuests.reduce(
    (total, quest) =>
      total + (Number(quest.xpReward) || 0),
    0
  );

  /*
  |--------------------------------------------------------------------------
  | CHARACTER DATA
  |--------------------------------------------------------------------------
  |
  | These values come from useGame().
  | useGame() should call:
  |
  | GET /api/v1/character
  |
  */

  const level = character?.level ?? 1;

  const xp = character?.xp ?? 0;

  const xpToNextLevel =
    character?.xpToNextLevel ?? 100;

  const gold = character?.gold ?? 0;

  const currentStreak =
    character?.currentStreak ?? 0;

  /*
  |--------------------------------------------------------------------------
  | XP PROGRESS
  |--------------------------------------------------------------------------
  */

  const xpPercentage =
    xpToNextLevel > 0
      ? Math.min(
          100,
          Math.max(
            0,
            (xp / xpToNextLevel) * 100
          )
        )
      : 0;

  /*
  |--------------------------------------------------------------------------
  | OPEN CREATE MODAL
  |--------------------------------------------------------------------------
  */

  const openCreateModal = () => {
    setEditing(null);
    setModalOpen(true);
  };

  /*
  |--------------------------------------------------------------------------
  | OPEN EDIT MODAL
  |--------------------------------------------------------------------------
  */

  const openEditModal = (quest) => {
    setEditing(quest);
    setModalOpen(true);
  };

  /*
  |--------------------------------------------------------------------------
  | RENDER
  |--------------------------------------------------------------------------
  */

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#06111b] text-white">

      {/* =====================================================
          GLOBAL ATMOSPHERE
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0">

        <div className="absolute left-[-180px] top-[-150px] h-[600px] w-[600px] rounded-full bg-violet-700/10 blur-[150px]" />

        <div className="absolute right-[-180px] top-[20%] h-[600px] w-[600px] rounded-full bg-fuchsia-600/10 blur-[150px]" />

        <div className="absolute bottom-[-200px] left-[30%] h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[150px]" />

        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:30px_30px]" />

      </div>

      {/* =====================================================
          TOP HEADER
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#06111b]/85 backdrop-blur-2xl">

        <div className="mx-auto flex h-[78px] max-w-[1600px] items-center justify-between px-5 md:px-8">

          <Link
            to="/"
            className="group flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-300/30 bg-violet-500/10 text-xl shadow-lg shadow-violet-500/10 transition group-hover:rotate-12">
              ◈
            </div>

            <div>

              <div className="text-lg font-black">
                Evo<span className="text-fuchsia-400">
                  Quest
                </span>
              </div>

              <div className="text-[7px] uppercase tracking-[0.45em] text-slate-600">
                Mission Board
              </div>

            </div>

          </Link>

          <div className="hidden items-center gap-3 md:flex">

            <div className="rounded-full border border-emerald-300/10 bg-emerald-300/5 px-4 py-2">

              <div className="flex items-center gap-2">

                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />

                <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-200">
                  World Online
                </span>

              </div>

            </div>

            <div className="rounded-full border border-violet-300/10 bg-violet-300/5 px-4 py-2 text-[8px] font-bold uppercase tracking-widest text-violet-200">
              Level {level}
            </div>

          </div>

          <div className="flex items-center gap-2">

            <Link
              to="/dashboard"
              className="hidden rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5 text-[8px] font-bold uppercase tracking-widest text-slate-500 transition hover:text-white sm:block"
            >
              Command Center
            </Link>

            <button
              type="button"
              onClick={openCreateModal}
              className="rounded-full border border-violet-300/30 bg-violet-500/15 px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest text-violet-100 transition hover:bg-violet-500/25"
            >
              + New Mission
            </button>

          </div>

        </div>

      </header>

      {/* =====================================================
          PAGE
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 py-8 md:px-8 md:py-10">

        {/* ===================================================
            HERO HEADER
        ==================================================== */}

        <section className="mb-8">

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>

              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.4em] text-violet-200">

                <span className="h-px w-8 bg-violet-300/60" />

                Chapter {level} • Mission Board

              </div>

              <h1 className="mt-4 max-w-4xl font-serif text-5xl font-black leading-[0.9] sm:text-6xl md:text-7xl">

                Choose Your

                <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-200 bg-clip-text text-transparent">
                  Next Mission.
                </span>

              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                Your everyday actions become missions. Complete them,
                earn Experience and Rewards, and strengthen your Hero.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-3">

              <StatCard
                icon="⚔️"
                value={activeQuests.length}
                label="Active"
                description="Missions waiting"
                tone="violet"
              />

              <StatCard
                icon="🏆"
                value={completedQuests.length}
                label="Complete"
                description="Missions conquered"
                tone="gold"
              />

            </div>

          </div>

        </section>

        {/* ===================================================
            CHARACTER STATUS
        ==================================================== */}

        <section className="relative mb-6 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.025]">

          <CornerFrame />

          <div className="absolute left-0 top-0 h-72 w-72 rounded-full bg-violet-500/10 blur-[110px]" />

          <div className="absolute right-0 bottom-0 h-72 w-72 rounded-full bg-cyan-500/10 blur-[110px]" />

          <div className="relative grid lg:grid-cols-[0.72fr_1.28fr]">

            {/* HERO */}

            <div className="relative flex min-h-[360px] items-center justify-center overflow-hidden border-b border-white/5 lg:border-b-0 lg:border-r">

              <div className="absolute h-64 w-64 rounded-full border border-violet-300/10" />

              <div className="absolute h-48 w-48 rounded-full border border-cyan-300/10 border-dashed" />

              <div className="absolute h-40 w-40 rounded-full bg-violet-500/10 blur-[65px]" />

              <div className="relative text-center">

                <div className="text-[125px] drop-shadow-[0_25px_40px_rgba(0,0,0,0.8)]">
                  🧙‍♂️
                </div>

                <div className="font-serif text-2xl font-black">
                  Level {level} Hero
                </div>

                <div className="mt-1 text-[8px] uppercase tracking-[0.4em] text-violet-200">
                  Ready for adventure
                </div>

              </div>

              <div className="absolute bottom-6 left-6 rounded-xl border border-orange-300/10 bg-orange-300/5 px-4 py-3">

                <div className="text-[7px] uppercase tracking-widest text-slate-700">
                  Momentum
                </div>

                <div className="mt-1 text-xs font-black text-orange-200">
                  🔥 {currentStreak} Days
                </div>

              </div>

              <div className="absolute right-6 top-6 rounded-xl border border-yellow-300/10 bg-yellow-300/5 px-4 py-3">

                <div className="text-[7px] uppercase tracking-widest text-slate-700">
                  Treasury
                </div>

                <div className="mt-1 text-xs font-black text-yellow-200">
                  🪙 {gold}
                </div>

              </div>

            </div>

            {/* XP STATUS */}

            <div className="p-7 md:p-9">

              <div className="flex items-start justify-between">

                <div>

                  <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-200">
                    Character Readiness
                  </div>

                  <h2 className="mt-2 font-serif text-3xl font-black">
                    Power ready.
                  </h2>

                </div>

                <div className="rounded-full border border-cyan-300/10 bg-cyan-300/5 px-4 py-2">

                  <span className="text-[8px] uppercase tracking-widest text-cyan-200">
                    {activeQuests.length} Active
                  </span>

                </div>

              </div>

              <div className="mt-8">

                <div className="flex items-end justify-between">

                  <div>

                    <div className="text-[8px] uppercase tracking-widest text-slate-700">
                      Experience
                    </div>

                    <div className="mt-1 font-mono text-2xl font-black">
                      {xp}

                      <span className="ml-1 text-xs text-slate-700">
                        XP
                      </span>
                    </div>

                  </div>

                  <div className="font-mono text-[9px] text-cyan-200">
                    {xp} / {xpToNextLevel}
                  </div>

                </div>

                <div className="mt-3">

                  <ProgressBar
                    value={xpPercentage}
                    height="h-3"
                    gradient="from-violet-500 via-fuchsia-500 to-cyan-400"
                  />

                </div>

                <div className="mt-2 flex justify-between text-[8px] uppercase tracking-widest text-slate-700">

                  <span>
                    Level {level}
                  </span>

                  <span>
                    {Math.max(
                      xpToNextLevel - xp,
                      0
                    )}{" "}
                    XP remaining
                  </span>

                </div>

              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">

                <StatCard
                  icon="⚔️"
                  value={activeQuests.length}
                  label="Active"
                  description="Missions"
                  tone="violet"
                />

                <StatCard
                  icon="✦"
                  value={totalAvailableXP}
                  label="Potential"
                  description="XP available"
                  tone="cyan"
                />

                <StatCard
                  icon="🪙"
                  value={gold}
                  label="Gold"
                  description="Current balance"
                  tone="yellow"
                />

                <StatCard
                  icon="🔥"
                  value={currentStreak}
                  label="Streak"
                  description="Days alive"
                  tone="orange"
                />

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            MISSION CONTROL
        ==================================================== */}

        <section className="mb-6">

          <Panel className="p-5 md:p-6">

            <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

              <div>

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-fuchsia-300">
                  Mission Control
                </div>

                <h2 className="mt-2 font-serif text-2xl font-black">
                  Find the right challenge.
                </h2>

              </div>

              <div className="flex flex-col gap-3 lg:flex-row">

                {/* SEARCH */}

                <div className="relative min-w-[250px]">

                  <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-700">
                    ⌕
                  </span>

                  <input
                    type="text"
                    value={search}
                    onChange={(event) =>
                      setSearch(event.target.value)
                    }
                    placeholder="Search missions..."
                    className="w-full rounded-full border border-white/10 bg-black/20 py-3 pl-10 pr-4 text-xs text-white outline-none placeholder:text-slate-700 focus:border-violet-300/30"
                  />

                </div>

                {/* VIEW MODE */}

                <div className="flex rounded-full border border-white/10 bg-black/20 p-1">

                  <button
                    type="button"
                    onClick={() =>
                      setViewMode("board")
                    }
                    className={`rounded-full px-4 py-2 text-[8px] font-bold uppercase tracking-widest ${
                      viewMode === "board"
                        ? "bg-violet-500/20 text-violet-200"
                        : "text-slate-600"
                    }`}
                  >
                    Board
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setViewMode("details")
                    }
                    className={`rounded-full px-4 py-2 text-[8px] font-bold uppercase tracking-widest ${
                      viewMode === "details"
                        ? "bg-violet-500/20 text-violet-200"
                        : "text-slate-600"
                    }`}
                  >
                    Details
                  </button>

                </div>

              </div>

            </div>

            <div className="mt-6">

              <QuestFilters
                filters={filters}
                onChange={setFilters}
              />

            </div>

          </Panel>

        </section>

        {/* ===================================================
            ERROR
        ==================================================== */}

        {error ? (
          <section className="mb-6">

            <ErrorMessage
              message={error}
              onRetry={() =>
                fetchQuests(filters)
              }
            />

          </section>
        ) : null}

        {/* ===================================================
            MISSION AREA
        ==================================================== */}

        <section className="grid gap-6 xl:grid-cols-[1.28fr_0.72fr]">

          {/* QUEST LIST */}

          <Panel className="p-5 md:p-6">

            <div className="mb-6 flex items-end justify-between">

              <div>

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
                  Mission Board
                </div>

                <h2 className="mt-2 font-serif text-2xl font-black">
                  Available Missions
                </h2>

              </div>

              <div className="text-right">

                <div className="font-mono text-lg font-black text-cyan-200">
                  {filteredQuests.length}
                </div>

                <div className="text-[8px] uppercase tracking-widest text-slate-700">
                  shown
                </div>

              </div>

            </div>

            {filteredQuests.length > 0 ? (

              <div className="space-y-3">

                <QuestList
                  quests={filteredQuests}
                  loading={loading}
                  onComplete={handleComplete}
                  onEdit={openEditModal}
                  onDelete={removeQuest}
                />

              </div>

            ) : loading ? (

              <QuestList
                quests={[]}
                loading={true}
                onComplete={handleComplete}
                onEdit={openEditModal}
                onDelete={removeQuest}
              />

            ) : (

              <EmptyMissionState
                onCreate={openCreateModal}
              />

            )}

          </Panel>

          {/* RIGHT COLUMN */}

          <div className="space-y-6">

            {/* SELECTED MISSION */}

            <Panel className="relative p-6">

              <CornerFrame />

              <div className="absolute right-0 top-0 h-48 w-48 rounded-full bg-violet-500/10 blur-[90px]" />

              <div className="relative">

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-fuchsia-300">
                  Mission Intel
                </div>

                <h2 className="mt-2 font-serif text-2xl font-black">
                  Your next move.
                </h2>

                <p className="mt-2 text-xs leading-6 text-slate-600">
                  Select a mission from the board to inspect it.
                </p>

                {selectedMission ? (

                  <div className="mt-6 rounded-2xl border border-violet-300/10 bg-violet-300/5 p-5">

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <div className="text-[8px] uppercase tracking-widest text-violet-200">
                          Selected Mission
                        </div>

                        <h3 className="mt-2 text-xl font-black">
                          {selectedMission.title}
                        </h3>

                      </div>

                      <div className="text-2xl">
                        ⚔️
                      </div>

                    </div>

                    <p className="mt-3 text-xs leading-6 text-slate-500">
                      {selectedMission.description}
                    </p>

                    <div className="mt-5 grid grid-cols-2 gap-3">

                      <StatCard
                        icon="⚡"
                        value={
                          selectedMission.xpReward ?? 0
                        }
                        label="XP"
                        description="Reward"
                        tone="cyan"
                      />

                      <StatCard
                        icon="🪙"
                        value={
                          selectedMission.goldReward ?? 0
                        }
                        label="Gold"
                        description="Reward"
                        tone="yellow"
                      />

                    </div>

                    <div className="mt-4 rounded-xl border border-white/5 bg-black/20 p-4">

                      <div className="flex justify-between">

                        <span className="text-[8px] uppercase tracking-widest text-slate-700">
                          Difficulty
                        </span>

                        <span className="text-xs font-bold text-violet-200">
                          {selectedMission.difficulty ??
                            "Unknown"}
                        </span>

                      </div>

                      <div className="mt-3 flex justify-between">

                        <span className="text-[8px] uppercase tracking-widest text-slate-700">
                          Attribute
                        </span>

                        <span className="text-xs font-bold text-cyan-200">
                          {selectedMission.attribute ??
                            "General"}
                        </span>

                      </div>

                    </div>

                    <div className="mt-5 flex gap-2">

                      {!selectedMission.completed ? (

                        <button
                          type="button"
                          onClick={() =>
                            handleComplete(
                              selectedMission._id
                            )
                          }
                          className="flex-1 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-4 py-3 text-[9px] font-black uppercase tracking-widest shadow-lg shadow-violet-500/20"
                        >
                          Complete Mission →
                        </button>

                      ) : (

                        <div className="flex-1 rounded-xl border border-emerald-300/15 bg-emerald-300/5 px-4 py-3 text-center text-[9px] font-bold uppercase tracking-widest text-emerald-200">
                          Mission Complete ✓
                        </div>

                      )}

                    </div>

                  </div>

                ) : (

                  <div className="mt-6 rounded-2xl border border-dashed border-white/10 bg-black/10 p-8 text-center">

                    <div className="text-4xl">
                      🧭
                    </div>

                    <div className="mt-4 text-sm font-bold">
                      Awaiting selection
                    </div>

                    <div className="mt-2 text-[10px] text-slate-700">
                      Choose a mission to inspect its details.
                    </div>

                  </div>

                )}

              </div>

            </Panel>

            {/* DIFFICULTIES */}

            <Panel className="p-6">

              <div>

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-200">
                  Difficulty
                </div>

                <h2 className="mt-2 font-serif text-2xl font-black">
                  Know Your Challenge.
                </h2>

              </div>

              <div className="mt-6 grid gap-2">

                {DIFFICULTIES.map(
                  (item) => (
                    <DifficultyWithCount
                      key={item.name}
                      item={item}
                      count={
                        item.name === "Easy"
                          ? easyCount
                          : item.name === "Medium"
                            ? mediumCount
                            : item.name === "Hard"
                              ? hardCount
                              : epicCount
                      }
                    />
                  )
                )}

              </div>

            </Panel>

          </div>

        </section>

        {/* ===================================================
            CATEGORY GUIDE
        ==================================================== */}

        <section className="mt-6">

          <Panel className="p-6 md:p-7">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-fuchsia-300">
                  Mission Types
                </div>

                <h2 className="mt-2 font-serif text-2xl font-black">
                  Every mission strengthens a different part of you.
                </h2>

              </div>

              <span className="text-[8px] uppercase tracking-widest text-slate-700">
                Real world → real progression
              </span>

            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              {MISSION_CATEGORIES.map(
                (item) => (
                  <CategoryCard
                    key={item.name}
                    item={item}
                  />
                )
              )}

            </div>

          </Panel>

        </section>

        {/* ===================================================
            FINAL CTA
        ==================================================== */}

        <section className="mt-6">

          <Panel className="border-violet-300/10 bg-gradient-to-r from-violet-500/5 via-transparent to-cyan-500/5 p-7">

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

              <div>

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
                  Mission Control
                </div>

                <h2 className="mt-2 font-serif text-2xl font-black">
                  Your next level starts with one completed action.
                </h2>

                <p className="mt-2 text-xs text-slate-600">
                  Pick something meaningful. Finish it. Let the system handle the progression.
                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                <button
                  type="button"
                  onClick={openCreateModal}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3.5 text-xs font-black uppercase tracking-widest shadow-xl shadow-violet-500/20 transition hover:-translate-y-0.5"
                >
                  + Create Mission
                </button>

                <Link
                  to="/dashboard"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-slate-300"
                >
                  Command Center
                </Link>

              </div>

            </div>

          </Panel>

        </section>

        {/* ===================================================
            FOOTER
        ==================================================== */}

        <footer className="mt-8 flex flex-col justify-between gap-3 border-t border-white/5 pt-6 text-[8px] uppercase tracking-widest text-slate-700 sm:flex-row">

          <span>
            EvoQuest • Mission Board
          </span>

          <span>
            Complete missions. Build your character.
          </span>

        </footer>

      </div>

      {/* =====================================================
          CREATE / EDIT MODAL
      ====================================================== */}

      <Modal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditing(null);
        }}
        title={
          editing
            ? "Edit Mission"
            : "Create New Mission"
        }
      >

        <QuestForm
          initial={editing}
          onSubmit={handleCreateOrEdit}
          onCancel={() => {
            setModalOpen(false);
            setEditing(null);
          }}
        />

      </Modal>

      {/* =====================================================
          LEVEL UP
      ====================================================== */}

      <LevelUpOverlay
        event={levelUpEvent}
        onDone={() =>
          setLevelUpEvent(null)
        }
      />

    </main>
  );
}

