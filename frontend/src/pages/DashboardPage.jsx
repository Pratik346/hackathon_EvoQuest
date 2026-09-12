import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import LoadingSpinner from "../components/common/LoadingSpinner";
import AIAdvisor from "../components/ai/AIAdvisor";

/*
|--------------------------------------------------------------------------
| EVOQUEST — COMMAND CENTER
|--------------------------------------------------------------------------
| This page uses only your existing character API/data.
|
| Backend remains responsible for:
|   XP
|   Gold
|   Level
|   Attributes
|   Streak
|
| Frontend is responsible for:
|   Presentation
|   Navigation
|   Visual feedback
|   Interaction
|--------------------------------------------------------------------------
*/

const ATTRIBUTE_CONFIG = [
  {
    key: "intelligence",
    name: "Intelligence",
    short: "INT",
    icon: "🧠",
    tone: "cyan",
    description: "Knowledge, learning and problem solving.",
  },
  {
    key: "strength",
    name: "Strength",
    short: "STR",
    icon: "💪",
    tone: "red",
    description: "Physical power, training and resilience.",
  },
  {
    key: "discipline",
    name: "Discipline",
    short: "DIS",
    icon: "⚡",
    tone: "purple",
    description: "Consistency, focus and self-control.",
  },
  {
    key: "vitality",
    name: "Vitality",
    short: "VIT",
    icon: "❤️",
    tone: "green",
    description: "Energy, health and recovery.",
  },
];

const WORLD_ZONES = [
  {
    icon: "🧠",
    title: "Mind Valley",
    text: "Learning and knowledge",
    value: 78,
    color: "cyan",
  },
  {
    icon: "💪",
    title: "Ironwild",
    text: "Fitness and physical growth",
    value: 64,
    color: "red",
  },
  {
    icon: "💼",
    title: "Forge City",
    text: "Career and professional skills",
    value: 52,
    color: "purple",
  },
  {
    icon: "❤️",
    title: "Heartvale",
    text: "Relationships and community",
    value: 71,
    color: "pink",
  },
];

const JOURNEY_EVENTS = [
  {
    icon: "⚔️",
    title: "Quest Completed",
    description: "Your latest mission has been completed.",
    time: "Recently",
    color: "purple",
  },
  {
    icon: "⚡",
    title: "Experience Earned",
    description: "Your efforts moved you closer to the next level.",
    time: "Today",
    color: "cyan",
  },
  {
    icon: "🔥",
    title: "Momentum Continued",
    description: "You protected your current streak.",
    time: "Today",
    color: "orange",
  },
];

const GROWTH_PATH = [
  {
    level: 1,
    title: "Awakening",
    description: "Your adventure begins.",
    icon: "🌱",
  },
  {
    level: 5,
    title: "Rising Hero",
    description: "Consistency starts becoming a habit.",
    icon: "⚔️",
  },
  {
    level: 10,
    title: "Elite",
    description: "Your character has developed.",
    icon: "🏆",
  },
  {
    level: 20,
    title: "Legend",
    description: "A completely different version of you.",
    icon: "👑",
  },
];

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
      className={`w-full overflow-hidden rounded-full bg-white/[0.06] ${height}`}
    >
      <div
        className={`h-full rounded-full bg-gradient-to-r ${gradient} shadow-[0_0_15px_rgba(139,92,246,0.25)] transition-all duration-1000`}
        style={{
          width: `${safeValue}%`,
        }}
      />
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

function Panel({
  children,
  className = "",
  glow = "",
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-[28px] border border-white/10 bg-white/[0.025] backdrop-blur-xl ${glow} ${className}`}
    >
      {children}
    </div>
  );
}

function AttributeCard({
  icon,
  name,
  short,
  value,
  description,
  tone,
}) {
  const colors = {
    cyan: {
      border: "border-cyan-400/15",
      text: "text-cyan-300",
      bg: "bg-cyan-400/5",
      gradient: "from-cyan-300 to-blue-500",
    },
    red: {
      border: "border-red-400/15",
      text: "text-red-300",
      bg: "bg-red-400/5",
      gradient: "from-orange-300 to-red-500",
    },
    purple: {
      border: "border-purple-400/15",
      text: "text-purple-300",
      bg: "bg-purple-400/5",
      gradient: "from-violet-300 to-fuchsia-500",
    },
    green: {
      border: "border-emerald-400/15",
      text: "text-emerald-300",
      bg: "bg-emerald-400/5",
      gradient: "from-emerald-300 to-cyan-500",
    },
  };

  const color = colors[tone] || colors.purple;

  const numericValue = Number(value) || 0;
  const percentage = Math.min(
    100,
    Math.max(0, numericValue)
  );

  return (
    <div
      className={`rounded-2xl border ${color.border} ${color.bg} p-5 transition duration-300 hover:-translate-y-1`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-xl">
            {icon}
          </div>

          <div>
            <div className="text-sm font-bold">
              {name}
            </div>

            <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.25em] text-slate-600">
              {short}
            </div>
          </div>

        </div>

        <div className={`font-mono text-2xl font-black ${color.text}`}>
          {numericValue}
        </div>
      </div>

      <p className="mt-4 text-[10px] leading-5 text-slate-600">
        {description}
      </p>

      <div className="mt-4">
        <ProgressBar
          value={percentage}
          gradient={color.gradient}
        />
      </div>

      <div className="mt-2 flex justify-between text-[8px] uppercase tracking-widest text-slate-700">
        <span>Power</span>
        <span>{percentage}%</span>
      </div>
    </div>
  );
}

function ZoneCard({
  icon,
  title,
  text,
  value,
  color,
}) {
  const borderMap = {
    cyan: "border-cyan-300/15",
    red: "border-red-300/15",
    purple: "border-purple-300/15",
    pink: "border-pink-300/15",
  };

  const textMap = {
    cyan: "text-cyan-200",
    red: "text-red-200",
    purple: "text-purple-200",
    pink: "text-pink-200",
  };

  return (
    <div
      className={`rounded-2xl border ${
        borderMap[color] || borderMap.purple
      } bg-black/20 p-4`}
    >
      <div className="flex items-center gap-4">

        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-xl">
          {icon}
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex items-center justify-between gap-3">

            <div>
              <div className="text-sm font-black">
                {title}
              </div>

              <div className="mt-1 text-[9px] text-slate-600">
                {text}
              </div>
            </div>

            <div
              className={`font-mono text-xs font-bold ${
                textMap[color] || textMap.purple
              }`}
            >
              {value}%
            </div>

          </div>

          <div className="mt-3">
            <ProgressBar value={value} />
          </div>

        </div>

      </div>
    </div>
  );
}

function JourneyEvent({
  icon,
  title,
  description,
  time,
  color,
}) {
  const colors = {
    purple: "border-purple-300/15 bg-purple-300/5",
    cyan: "border-cyan-300/15 bg-cyan-300/5",
    orange: "border-orange-300/15 bg-orange-300/5",
  };

  return (
    <div
      className={`flex gap-4 rounded-2xl border p-4 ${
        colors[color] || colors.purple
      }`}
    >

      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/20 text-xl">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-3">
          <div className="text-sm font-bold">
            {title}
          </div>

          <div className="text-[8px] uppercase tracking-widest text-slate-700">
            {time}
          </div>
        </div>

        <p className="mt-1 text-[10px] leading-5 text-slate-600">
          {description}
        </p>
      </div>

    </div>
  );
}

function GrowthNode({
  step,
  currentLevel,
}) {
  const active = currentLevel >= step.level;

  return (
    <div
      className={`relative rounded-2xl border p-5 transition ${
        active
          ? "border-violet-300/20 bg-violet-300/5"
          : "border-white/5 bg-black/10 opacity-40"
      }`}
    >
      <div className="flex items-center gap-4">

        <div
          className={`flex h-11 w-11 items-center justify-center rounded-full border ${
            active
              ? "border-violet-300/30 bg-violet-500/10"
              : "border-white/10 bg-white/[0.02]"
          } text-xl`}
        >
          {active ? step.icon : "🔒"}
        </div>

        <div className="flex-1">
          <div className="text-[8px] uppercase tracking-widest text-slate-600">
            Level {step.level}
          </div>

          <div className="mt-1 text-sm font-black">
            {step.title}
          </div>

          <div className="mt-1 text-[10px] text-slate-600">
            {step.description}
          </div>
        </div>

        <div
          className={`font-mono text-[9px] ${
            active
              ? "text-emerald-300"
              : "text-slate-700"
          }`}
        >
          {active ? "UNLOCKED" : "LOCKED"}
        </div>

      </div>
    </div>
  );
}

export default function DashboardPage() {
  const {
    character,
    loadingCharacter,
    refreshCharacter,
  } = useGame();

  const [activeTab, setActiveTab] = useState("overview");
  const [showSystemDetails, setShowSystemDetails] =
    useState(false);

  useEffect(() => {
    refreshCharacter();
  }, [refreshCharacter]);

  if (loadingCharacter) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#06111b] text-white">
        <LoadingSpinner />
      </div>
    );
  }

  const level = character?.level ?? 1;
  const xp = character?.xp ?? 0;
  const xpToNextLevel = character?.xpToNextLevel ?? 100;
  const gold = character?.gold ?? 0;
  const currentStreak = character?.currentStreak ?? 0;
  const longestStreak = character?.longestStreak ?? 0;

  const attributes = character?.attributes ?? {};

  const intelligence =
    attributes.intelligence ?? 0;

  const strength =
    attributes.strength ?? 0;

  const discipline =
    attributes.discipline ?? 0;

  const vitality =
    attributes.vitality ?? 0;

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

  const totalAttributes =
    Number(intelligence) +
    Number(strength) +
    Number(discipline) +
    Number(vitality);

  const dominantAttribute = [
    {
      name: "Intelligence",
      value: intelligence,
      icon: "🧠",
    },
    {
      name: "Strength",
      value: strength,
      icon: "💪",
    },
    {
      name: "Discipline",
      value: discipline,
      icon: "⚡",
    },
    {
      name: "Vitality",
      value: vitality,
      icon: "❤️",
    },
  ].sort((a, b) => b.value - a.value)[0];

  const tabs = [
    "overview",
    "progression",
    "journey",
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#06111b] text-white">

      {/* =====================================================
          ATMOSPHERE
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">

        <div className="absolute left-[-180px] top-[-150px] h-[600px] w-[600px] rounded-full bg-violet-700/10 blur-[150px]" />

        <div className="absolute right-[-180px] top-[25%] h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[150px]" />

        <div className="absolute bottom-[-200px] left-[25%] h-[600px] w-[600px] rounded-full bg-fuchsia-600/10 blur-[150px]" />

        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:32px_32px]" />

      </div>

      {/* =====================================================
          COMMAND HEADER
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#06111b]/85 backdrop-blur-2xl">

        <div className="mx-auto flex h-[78px] max-w-[1600px] items-center justify-between px-5 md:px-8">

          <div className="flex items-center gap-4">

            <Link
              to="/"
              className="group flex items-center gap-3"
            >

              <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-violet-300/30 bg-violet-500/10 text-xl shadow-[0_0_30px_rgba(139,92,246,0.12)] transition group-hover:rotate-12">
                ◈
              </div>

              <div>
                <div className="text-lg font-black tracking-tight">
                  Evo<span className="text-fuchsia-400">
                    Quest
                  </span>
                </div>

                <div className="text-[7px] uppercase tracking-[0.45em] text-slate-600">
                  Command Center
                </div>
              </div>

            </Link>

          </div>

          <nav className="hidden items-center gap-8 lg:flex">

            <Link
              to="/quests"
              className="text-xs font-semibold text-slate-500 transition hover:text-white"
            >
              Missions
            </Link>

            <Link
              to="/character"
              className="text-xs font-semibold text-slate-500 transition hover:text-white"
            >
              Hero
            </Link>

            <Link
              to="/achievements"
              className="text-xs font-semibold text-slate-500 transition hover:text-white"
            >
              Milestones
            </Link>

            <Link
              to="/shop"
              className="text-xs font-semibold text-slate-500 transition hover:text-white"
            >
              Reward Hub
            </Link>

          </nav>

          <div className="flex items-center gap-3">

            <div className="hidden items-center gap-2 rounded-full border border-emerald-300/10 bg-emerald-300/5 px-4 py-2 sm:flex">

              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />

              <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-200">
                World Online
              </span>

            </div>

            <Link
              to="/quests"
              className="rounded-full border border-violet-300/20 bg-violet-500/10 px-4 py-2.5 text-[9px] font-bold uppercase tracking-widest text-violet-200 transition hover:bg-violet-500/20"
            >
              New Mission
            </Link>

          </div>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 py-7 md:px-8 md:py-10">

        {/* ===================================================
            WELCOME
        ==================================================== */}

        <section className="mb-7">

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>

              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.4em] text-cyan-200">

                <span className="h-px w-8 bg-cyan-300/60" />

                Chapter {level}

              </div>

              <h1 className="mt-4 max-w-4xl font-serif text-4xl font-black leading-[0.92] sm:text-5xl md:text-6xl">

                Welcome Back,
                <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-200 bg-clip-text text-transparent">
                  Adventurer.
                </span>

              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                Your journey continues here. Your progress is alive,
                your character is growing and your next mission is
                waiting.
              </p>

            </div>

            <div className="flex gap-3">

              <div className="rounded-2xl border border-white/10 bg-white/[0.025] px-5 py-4 text-center">

                <div className="text-[8px] uppercase tracking-widest text-slate-700">
                  Current level
                </div>

                <div className="mt-1 font-serif text-3xl font-black text-violet-200">
                  {level}
                </div>

              </div>

              <div className="rounded-2xl border border-yellow-300/10 bg-yellow-300/5 px-5 py-4 text-center">

                <div className="text-[8px] uppercase tracking-widest text-slate-700">
                  Rewards
                </div>

                <div className="mt-2 font-mono text-sm font-black text-yellow-200">
                  🪙 {gold}
                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            TABS
        ==================================================== */}

        <section className="mb-6 flex flex-wrap gap-2">

          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-full border px-5 py-2.5 text-[9px] font-bold uppercase tracking-[0.2em] transition ${
                activeTab === tab
                  ? "border-violet-300/30 bg-violet-500/15 text-violet-200"
                  : "border-white/10 bg-white/[0.02] text-slate-600 hover:text-slate-300"
              }`}
            >
              {tab}
            </button>
          ))}

        </section>

        {/* ===================================================
            CHARACTER HERO
        ==================================================== */}

        <section className="relative mb-6 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.025] shadow-2xl">

          <CornerFrame />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(139,92,246,0.13),transparent_27%),radial-gradient(circle_at_82%_40%,rgba(34,211,238,0.08),transparent_25%)]" />

          <div className="relative grid lg:grid-cols-[0.72fr_1.28fr]">

            {/* CHARACTER WORLD */}

            <div className="relative flex min-h-[430px] items-center justify-center overflow-hidden border-b border-white/5 p-8 lg:border-b-0 lg:border-r">

              <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/10" />

              <div className="absolute left-1/2 top-1/2 h-[270px] w-[270px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10 border-dashed" />

              <div className="absolute left-1/2 top-1/2 h-60 w-60 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[75px]" />

              <div className="absolute left-7 top-7 text-[8px] uppercase tracking-[0.35em] text-slate-700">
                Hero Core
              </div>

              <div className="absolute right-7 top-7 rounded-full border border-emerald-300/10 bg-emerald-300/5 px-3 py-1.5 text-[7px] font-bold uppercase tracking-widest text-emerald-200">
                Stable
              </div>

              <div className="relative z-10 text-center">

                <div className="text-[135px] drop-shadow-[0_25px_35px_rgba(0,0,0,0.8)] md:text-[155px]">
                  🧙‍♂️
                </div>

                <div className="mt-[-5px] font-serif text-2xl font-black">
                  Your Hero
                </div>

                <div className="mt-1 text-[8px] uppercase tracking-[0.4em] text-violet-200">
                  Level {level} • Explorer
                </div>

              </div>

              <div className="absolute bottom-7 left-7 rounded-xl border border-white/10 bg-black/20 px-4 py-3 backdrop-blur-md">

                <div className="text-[7px] uppercase tracking-widest text-slate-700">
                  Dominant stat
                </div>

                <div className="mt-1 text-xs font-black text-violet-200">
                  {dominantAttribute?.icon}{" "}
                  {dominantAttribute?.name}
                </div>

              </div>

              <div className="absolute bottom-7 right-7 rounded-xl border border-orange-300/10 bg-orange-300/5 px-4 py-3">

                <div className="text-[7px] uppercase tracking-widest text-slate-700">
                  Momentum
                </div>

                <div className="mt-1 text-xs font-black text-orange-200">
                  🔥 {currentStreak} days
                </div>

              </div>

            </div>

            {/* PROGRESSION */}

            <div className="p-7 md:p-9">

              <div className="flex items-start justify-between gap-5">

                <div>

                  <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
                    Character Progress
                  </div>

                  <h2 className="mt-2 font-serif text-3xl font-black">
                    Your Evolution
                  </h2>

                  <p className="mt-2 max-w-xl text-xs leading-6 text-slate-600">
                    Every completed real-world mission contributes to
                    your character progression.
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowSystemDetails((value) => !value)
                  }
                  className="rounded-xl border border-white/10 bg-white/[0.025] px-3 py-2 text-[8px] font-bold uppercase tracking-widest text-slate-600 transition hover:text-white"
                >
                  {showSystemDetails
                    ? "Hide details"
                    : "System details"}
                </button>

              </div>

              {showSystemDetails ? (
                <div className="mt-5 rounded-xl border border-cyan-300/10 bg-cyan-300/5 p-4 font-mono text-[9px] leading-6 text-slate-600">
                  <div>
                    character.level ........ {level}
                  </div>
                  <div>
                    character.xp ........... {xp}
                  </div>
                  <div>
                    character.gold ......... {gold}
                  </div>
                  <div>
                    character.streak ....... {currentStreak}
                  </div>
                  <div>
                    character.attributes ... synchronized
                  </div>
                </div>
              ) : null}

              {/* EXPERIENCE */}

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
                    XP to next
                  </span>
                </div>

              </div>

              {/* MINI METRICS */}

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">

                <StatTile
                  icon="⚡"
                  value={xp}
                  label="Experience"
                  tone="cyan"
                />

                <StatTile
                  icon="🪙"
                  value={gold}
                  label="Rewards"
                  tone="gold"
                />

                <StatTile
                  icon="🔥"
                  value={currentStreak}
                  label="Momentum"
                  tone="orange"
                />

                <StatTile
                  icon="✦"
                  value={totalAttributes}
                  label="Core Power"
                  tone="violet"
                />

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            OVERVIEW
        ==================================================== */}

        {activeTab === "overview" ? (
          <>

            {/* MAIN GRID */}

            <div className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">

              {/* LEFT */}

              <div className="space-y-6">

                {/* QUICK MISSION */}

                <Panel className="p-6">

                  <div className="flex items-end justify-between">

                    <div>

                      <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-fuchsia-300">
                        Next Move
                      </div>

                      <h2 className="mt-2 font-serif text-2xl font-black">
                        Choose Your Mission
                      </h2>

                    </div>

                    <Link
                      to="/quests"
                      className="text-[9px] font-bold uppercase tracking-widest text-violet-300"
                    >
                      View all →
                    </Link>

                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-3">

                    <QuickMission
                      icon="🧠"
                      title="Study"
                      reward="+50 XP"
                      text="Build Intelligence"
                      color="cyan"
                    />

                    <QuickMission
                      icon="💪"
                      title="Workout"
                      reward="+75 XP"
                      text="Build Strength"
                      color="red"
                    />

                    <QuickMission
                      icon="🎯"
                      title="Deep Work"
                      reward="+80 XP"
                      text="Build Discipline"
                      color="purple"
                    />

                  </div>

                </Panel>

                {/* ATTRIBUTES */}

                <Panel className="p-6">

                  <div className="flex items-end justify-between">

                    <div>

                      <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-300">
                        Core Stats
                      </div>

                      <h2 className="mt-2 font-serif text-2xl font-black">
                        Character Build
                      </h2>

                    </div>

                    <Link
                      to="/character"
                      className="text-[9px] font-bold uppercase tracking-widest text-cyan-200"
                    >
                      Inspect Hero →
                    </Link>

                  </div>

                  <div className="mt-6 grid gap-3 md:grid-cols-2">

                    {ATTRIBUTE_CONFIG.map((item) => (
                      <AttributeCard
                        key={item.key}
                        icon={item.icon}
                        name={item.name}
                        short={item.short}
                        value={attributes[item.key] ?? 0}
                        description={item.description}
                        tone={item.tone}
                      />
                    ))}

                  </div>

                </Panel>

              </div>

              {/* RIGHT */}

              <div className="space-y-6">

                {/* AI */}

                <Panel className="border-cyan-300/10 bg-cyan-300/[0.025] p-6">

                  <div className="flex items-center gap-4">

                    <div className="flex h-13 w-13 h-14 items-center justify-center rounded-2xl border border-cyan-300/20 bg-cyan-300/5 text-2xl">
                      🤖
                    </div>

                    <div>

                      <div className="text-[8px] font-bold uppercase tracking-[0.3em] text-cyan-200">
                        Evo Guide
                      </div>

                      <h2 className="mt-1 text-xl font-black">
                        Today's Guidance
                      </h2>

                    </div>

                  </div>

                  <div className="mt-5 rounded-2xl border border-white/5 bg-black/20 p-4">

                    <AIAdvisor />

                  </div>

                  <Link
                    to="/ai-advisor"
                    className="mt-4 block rounded-xl border border-cyan-300/15 bg-cyan-300/5 py-3 text-center text-[9px] font-bold uppercase tracking-widest text-cyan-200 transition hover:bg-cyan-300/10"
                  >
                    Open Evo Guide →
                  </Link>

                </Panel>

                {/* MOMENTUM */}

                <Panel className="border-orange-300/10 bg-orange-300/[0.025] p-6">

                  <div className="flex items-center justify-between">

                    <div>
                      <div className="text-[8px] font-bold uppercase tracking-[0.3em] text-orange-200">
                        Momentum
                      </div>

                      <h2 className="mt-1 text-xl font-black">
                        Keep The Chain Alive
                      </h2>
                    </div>

                    <div className="text-3xl">
                      🔥
                    </div>

                  </div>

                  <div className="mt-6 flex items-end justify-between">

                    <div>
                      <div className="font-serif text-5xl font-black text-orange-200">
                        {currentStreak}
                      </div>

                      <div className="mt-1 text-[8px] uppercase tracking-widest text-slate-600">
                        current days
                      </div>
                    </div>

                    <div className="text-right">

                      <div className="text-lg font-black">
                        {longestStreak}
                      </div>

                      <div className="text-[8px] uppercase tracking-widest text-slate-700">
                        best streak
                      </div>

                    </div>

                  </div>

                  <div className="mt-5">
                    <ProgressBar
                      value={Math.min(
                        currentStreak * 10,
                        100
                      )}
                      gradient="from-orange-400 to-yellow-300"
                    />
                  </div>

                  <Link
                    to="/quests"
                    className="mt-5 block rounded-xl border border-orange-300/15 bg-orange-300/5 py-3 text-center text-[9px] font-bold uppercase tracking-widest text-orange-200"
                  >
                    Protect Today's Streak →
                  </Link>

                </Panel>

              </div>

            </div>

            {/* LIFE ZONES */}

            <section className="mt-6">

              <Panel className="p-6">

                <div className="flex items-end justify-between">

                  <div>

                    <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
                      Life Domains
                    </div>

                    <h2 className="mt-2 font-serif text-2xl font-black">
                      Explore Your World
                    </h2>

                  </div>

                  <span className="hidden text-[8px] uppercase tracking-widest text-slate-700 sm:block">
                    Every domain matters
                  </span>

                </div>

                <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">

                  {WORLD_ZONES.map((zone) => (
                    <ZoneCard
                      key={zone.title}
                      icon={zone.icon}
                      title={zone.title}
                      text={zone.text}
                      value={zone.value}
                      color={zone.color}
                    />
                  ))}

                </div>

              </Panel>

            </section>

          </>
        ) : null}

        {/* ===================================================
            PROGRESSION
        ==================================================== */}

        {activeTab === "progression" ? (
          <section>

            <div className="grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">

              <Panel className="p-7">

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
                  Current Evolution
                </div>

                <div className="mt-8 flex justify-center">

                  <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-violet-300/20 bg-violet-500/5 shadow-[0_0_100px_rgba(139,92,246,0.10)]">

                    <div className="absolute inset-5 rounded-full border border-cyan-300/10" />

                    <div className="absolute inset-12 rounded-full border border-fuchsia-300/10 border-dashed" />

                    <div className="text-[100px]">
                      🧙‍♂️
                    </div>

                  </div>

                </div>

                <div className="mt-7 text-center">

                  <div className="font-serif text-3xl font-black">
                    Level {level}
                  </div>

                  <div className="mt-2 text-[9px] uppercase tracking-[0.4em] text-violet-200">
                    Explorer
                  </div>

                </div>

                <div className="mt-8">

                  <div className="mb-2 flex justify-between text-[8px] uppercase tracking-widest">
                    <span className="text-slate-700">
                      Experience
                    </span>

                    <span className="font-mono text-cyan-200">
                      {xp} / {xpToNextLevel}
                    </span>
                  </div>

                  <ProgressBar
                    value={xpPercentage}
                    height="h-3"
                  />

                </div>

              </Panel>

              <Panel className="p-7">

                <div className="flex items-end justify-between">

                  <div>

                    <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-fuchsia-300">
                      Growth Path
                    </div>

                    <h2 className="mt-2 font-serif text-2xl font-black">
                      Your Next Chapters
                    </h2>

                  </div>

                  <span className="font-mono text-[8px] text-slate-700">
                    EVOLUTION
                  </span>

                </div>

                <div className="mt-7 grid gap-3">
                  {GROWTH_PATH.map((step) => (
                    <GrowthNode
                      key={step.level}
                      step={step}
                      currentLevel={level}
                    />
                  ))}
                </div>

              </Panel>

            </div>

            <div className="mt-6">

              <Panel className="p-7">

                <div className="flex items-end justify-between">

                  <div>

                    <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-300">
                      Attribute Overview
                    </div>

                    <h2 className="mt-2 font-serif text-2xl font-black">
                      Power Distribution
                    </h2>

                  </div>

                  <div className="font-mono text-[9px] text-slate-700">
                    {totalAttributes} TOTAL
                  </div>

                </div>

                <div className="mt-8 grid gap-5 md:grid-cols-2">

                  {ATTRIBUTE_CONFIG.map((item) => (
                    <AttributeCard
                      key={item.key}
                      icon={item.icon}
                      name={item.name}
                      short={item.short}
                      value={attributes[item.key] ?? 0}
                      description={item.description}
                      tone={item.tone}
                    />
                  ))}

                </div>

              </Panel>

            </div>

          </section>
        ) : null}

        {/* ===================================================
            JOURNEY
        ==================================================== */}

        {activeTab === "journey" ? (
          <section>

            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">

              <Panel className="p-7">

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-orange-200">
                  Your Momentum
                </div>

                <div className="mt-5 flex items-end gap-4">

                  <div className="font-serif text-7xl font-black text-orange-200">
                    {currentStreak}
                  </div>

                  <div className="pb-3">
                    <div className="text-sm font-bold">
                      Days
                    </div>
                    <div className="text-[9px] uppercase tracking-widest text-slate-700">
                      Current chain
                    </div>
                  </div>

                </div>

                <div className="mt-8 rounded-2xl border border-orange-300/10 bg-orange-300/5 p-5">

                  <div className="text-[8px] uppercase tracking-widest text-slate-700">
                    Personal record
                  </div>

                  <div className="mt-2 text-3xl font-black text-yellow-200">
                    {longestStreak}
                  </div>

                  <div className="mt-1 text-xs text-slate-600">
                    Your longest momentum streak.
                  </div>

                </div>

                <div className="mt-5 rounded-2xl border border-violet-300/10 bg-violet-300/5 p-5">

                  <div className="text-[8px] uppercase tracking-widest text-slate-700">
                    Current identity
                  </div>

                  <div className="mt-2 text-lg font-black">
                    Level {level} Explorer
                  </div>

                  <div className="mt-1 text-xs text-slate-600">
                    Keep completing meaningful missions.
                  </div>

                </div>

              </Panel>

              <Panel className="p-7">

                <div className="flex items-end justify-between">

                  <div>

                    <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
                      Journey Log
                    </div>

                    <h2 className="mt-2 font-serif text-2xl font-black">
                      Recent Progress
                    </h2>

                  </div>

                  <Link
                    to="/activity"
                    className="text-[9px] font-bold uppercase tracking-widest text-violet-300"
                  >
                    Full Journey Log →
                  </Link>

                </div>

                <div className="relative mt-7 space-y-3">

                  <div className="absolute bottom-5 left-[21px] top-5 w-px bg-gradient-to-b from-violet-300/30 via-cyan-300/20 to-transparent" />

                  {JOURNEY_EVENTS.map((event) => (
                    <div key={event.title} className="relative">
                      <JourneyEvent {...event} />
                    </div>
                  ))}

                </div>

              </Panel>

            </div>

          </section>
        ) : null}

        {/* ===================================================
            BOTTOM ACTIONS
        ==================================================== */}

        <section className="mt-6">

          <Panel className="border-violet-300/10 bg-gradient-to-r from-violet-500/5 via-transparent to-cyan-500/5 p-7">

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

              <div>

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
                  Mission Control
                </div>

                <h2 className="mt-2 font-serif text-2xl font-black">
                  What Will You Do Next?
                </h2>

                <p className="mt-2 text-xs text-slate-600">
                  One meaningful action can change the trajectory of your day.
                </p>

              </div>

              <div className="flex flex-wrap gap-3">

                <Link
                  to="/quests"
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3.5 text-xs font-black uppercase tracking-widest shadow-xl shadow-violet-500/20 transition hover:-translate-y-0.5"
                >
                  ⚔️ Choose Mission
                </Link>

                <Link
                  to="/character"
                  className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-slate-300 transition hover:bg-white/[0.06]"
                >
                  🧙 View Hero
                </Link>

                <Link
                  to="/shop"
                  className="rounded-xl border border-yellow-300/10 bg-yellow-300/5 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-yellow-200 transition hover:bg-yellow-300/10"
                >
                  🪙 Reward Hub
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
            EvoQuest • Level Up Your Life
          </span>

          <span>
            Your World • Your Missions • Your Growth
          </span>

        </footer>

      </div>

    </main>
  );
}


/* =============================================================
   SMALL STAT TILE
============================================================= */

function StatTile({
  icon,
  value,
  label,
  tone,
}) {
  const tones = {
    cyan:
      "border-cyan-300/10 bg-cyan-300/5 text-cyan-200",
    gold:
      "border-yellow-300/10 bg-yellow-300/5 text-yellow-200",
    orange:
      "border-orange-300/10 bg-orange-300/5 text-orange-200",
    violet:
      "border-violet-300/10 bg-violet-300/5 text-violet-200",
  };

  return (
    <div
      className={`rounded-xl border p-4 ${
        tones[tone] || tones.violet
      }`}
    >
      <div className="text-lg">
        {icon}
      </div>

      <div className="mt-2 font-mono text-lg font-black">
        {value}
      </div>

      <div className="mt-1 text-[8px] uppercase tracking-widest text-slate-700">
        {label}
      </div>
    </div>
  );
}


/* =============================================================
   QUICK MISSION
============================================================= */

function QuickMission({
  icon,
  title,
  reward,
  text,
  color,
}) {
  const map = {
    cyan: "border-cyan-300/10 bg-cyan-300/5",
    red: "border-red-300/10 bg-red-300/5",
    purple: "border-violet-300/10 bg-violet-300/5",
  };

  return (
    <Link
      to="/quests"
      className={`group rounded-2xl border p-5 transition duration-300 hover:-translate-y-1 ${
        map[color] || map.purple
      }`}
    >

      <div className="flex items-center justify-between">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-black/20 text-xl">
          {icon}
        </div>

        <span className="font-mono text-[9px] font-bold text-cyan-200">
          {reward}
        </span>

      </div>

      <div className="mt-5 text-sm font-black">
        {title}
      </div>

      <div className="mt-1 text-[9px] uppercase tracking-widest text-slate-700">
        {text}
      </div>

      <div className="mt-5 text-[8px] font-bold uppercase tracking-widest text-slate-500 transition group-hover:text-white">
        Start →
      </div>

    </Link>
  );
}