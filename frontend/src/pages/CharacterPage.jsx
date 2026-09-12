import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useGame } from "../hooks/useGame";
import CharacterCard from "../components/character/CharacterCard";
import LoadingSpinner from "../components/common/LoadingSpinner";
import ErrorMessage from "../components/common/ErrorMessage";

/*
|--------------------------------------------------------------------------
| EVOQUEST — HERO PROFILE
|--------------------------------------------------------------------------
| Existing backend/API logic is preserved.
|
| Character values continue to come from useGame():
|   level
|   xp
|   xpToNextLevel
|   gold
|   attributes
|   currentStreak
|   longestStreak
|
| This page only provides a richer presentation layer.
|--------------------------------------------------------------------------
*/

const ATTRIBUTE_DATA = [
  {
    key: "intelligence",
    short: "INT",
    name: "Intelligence",
    icon: "🧠",
    description:
      "Learning, knowledge, analysis and problem solving.",
    tone: "cyan",
    gradient: "from-cyan-300 to-blue-500",
  },
  {
    key: "strength",
    short: "STR",
    name: "Strength",
    icon: "💪",
    description:
      "Physical power, training and resilience.",
    tone: "red",
    gradient: "from-orange-300 to-red-500",
  },
  {
    key: "discipline",
    short: "DIS",
    name: "Discipline",
    icon: "⚡",
    description:
      "Consistency, focus and self-control.",
    tone: "purple",
    gradient: "from-violet-300 to-fuchsia-500",
  },
  {
    key: "vitality",
    short: "VIT",
    name: "Vitality",
    icon: "❤️",
    description:
      "Energy, health, recovery and wellbeing.",
    tone: "green",
    gradient: "from-emerald-300 to-cyan-500",
  },
];

const LIFE_DOMAINS = [
  {
    icon: "🧠",
    name: "Mind Valley",
    description:
      "Learning, reading, focus and mental growth.",
    progress: 82,
    color: "cyan",
  },
  {
    icon: "💪",
    name: "Ironwild",
    description:
      "Fitness, recovery, movement and physical strength.",
    progress: 64,
    color: "red",
  },
  {
    icon: "💼",
    name: "Forge City",
    description:
      "Career, projects and professional development.",
    progress: 51,
    color: "purple",
  },
  {
    icon: "❤️",
    name: "Heartvale",
    description:
      "Relationships, communication and community.",
    progress: 73,
    color: "pink",
  },
];

const GROWTH_STAGES = [
  {
    level: 1,
    icon: "🌱",
    title: "Awakening",
    description: "The journey begins.",
  },
  {
    level: 5,
    icon: "⚔️",
    title: "Rising Hero",
    description: "Consistency becomes visible.",
  },
  {
    level: 10,
    icon: "🏆",
    title: "Elite",
    description: "Your habits have become a system.",
  },
  {
    level: 20,
    icon: "👑",
    title: "Legend",
    description: "A transformed version of yourself.",
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
  gradient = "from-violet-400 to-cyan-300",
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
        className={`h-full rounded-full bg-gradient-to-r ${gradient} transition-all duration-1000`}
        style={{
          width: `${safeValue}%`,
        }}
      />
    </div>
  );
}

function StatBox({
  icon,
  value,
  label,
  tone = "violet",
}) {
  const toneMap = {
    violet:
      "border-violet-300/10 bg-violet-300/5 text-violet-200",
    cyan:
      "border-cyan-300/10 bg-cyan-300/5 text-cyan-200",
    gold:
      "border-yellow-300/10 bg-yellow-300/5 text-yellow-200",
    orange:
      "border-orange-300/10 bg-orange-300/5 text-orange-200",
  };

  return (
    <div
      className={`rounded-2xl border p-4 ${
        toneMap[tone] || toneMap.violet
      }`}
    >
      <div className="text-xl">
        {icon}
      </div>

      <div className="mt-2 font-mono text-xl font-black">
        {value}
      </div>

      <div className="mt-1 text-[8px] uppercase tracking-widest text-slate-600">
        {label}
      </div>
    </div>
  );
}

function AttributeVisual({
  attribute,
  value,
}) {
  const toneMap = {
    cyan: "border-cyan-300/15 bg-cyan-300/5 text-cyan-200",
    red: "border-red-300/15 bg-red-300/5 text-red-200",
    purple:
      "border-violet-300/15 bg-violet-300/5 text-violet-200",
    green:
      "border-emerald-300/15 bg-emerald-300/5 text-emerald-200",
  };

  const numericValue = Number(value) || 0;

  return (
    <div
      className={`rounded-2xl border p-5 ${
        toneMap[attribute.tone] || toneMap.purple
      }`}
    >
      <div className="flex items-start justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-xl">
            {attribute.icon}
          </div>

          <div>

            <div className="text-sm font-black">
              {attribute.name}
            </div>

            <div className="mt-1 text-[8px] font-bold uppercase tracking-[0.3em] text-slate-600">
              {attribute.short}
            </div>

          </div>

        </div>

        <div className="font-serif text-3xl font-black">
          {numericValue}
        </div>

      </div>

      <p className="mt-4 text-[10px] leading-5 text-slate-600">
        {attribute.description}
      </p>

      <div className="mt-4">
        <ProgressBar
          value={numericValue}
          gradient={attribute.gradient}
        />
      </div>

      <div className="mt-2 flex justify-between text-[8px] uppercase tracking-widest text-slate-700">
        <span>Current power</span>
        <span>
          {Math.min(
            100,
            Math.max(0, numericValue)
          )}
          %
        </span>
      </div>
    </div>
  );
}

function DomainCard({
  domain,
}) {
  const borderMap = {
    cyan: "border-cyan-300/10",
    red: "border-red-300/10",
    purple: "border-violet-300/10",
    pink: "border-pink-300/10",
  };

  const iconBg = {
    cyan: "bg-cyan-300/5",
    red: "bg-red-300/5",
    purple: "bg-violet-300/5",
    pink: "bg-pink-300/5",
  };

  return (
    <div
      className={`rounded-2xl border ${
        borderMap[domain.color] || borderMap.purple
      } bg-black/20 p-4 transition duration-300 hover:-translate-y-1`}
    >

      <div className="flex items-center gap-4">

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg[domain.color] || iconBg.purple} text-xl`}
        >
          {domain.icon}
        </div>

        <div className="min-w-0 flex-1">

          <div className="flex items-center justify-between gap-3">

            <div>
              <div className="text-sm font-black">
                {domain.name}
              </div>

              <div className="mt-1 text-[9px] text-slate-600">
                {domain.description}
              </div>
            </div>

            <div className="font-mono text-xs text-cyan-200">
              {domain.progress}%
            </div>

          </div>

          <div className="mt-3">
            <ProgressBar
              value={domain.progress}
              gradient="from-cyan-300 to-violet-400"
            />
          </div>

        </div>

      </div>

    </div>
  );
}

function GrowthStep({
  item,
  active,
  index,
}) {
  return (
    <div
      className={`relative rounded-2xl border p-5 ${
        active
          ? "border-violet-300/20 bg-violet-300/5"
          : "border-white/5 bg-black/10 opacity-45"
      }`}
    >

      {index < 3 ? (
        <div className="absolute left-full top-1/2 hidden h-px w-5 bg-gradient-to-r from-violet-300/20 to-transparent md:block" />
      ) : null}

      <div className="flex items-center gap-4">

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full border ${
            active
              ? "border-violet-300/30 bg-violet-500/10"
              : "border-white/10"
          } text-xl`}
        >
          {active ? item.icon : "🔒"}
        </div>

        <div>
          <div className="text-[8px] uppercase tracking-[0.3em] text-slate-600">
            Level {item.level}
          </div>

          <div className="mt-1 text-sm font-black">
            {item.title}
          </div>

          <div className="mt-1 text-[10px] text-slate-600">
            {item.description}
          </div>
        </div>

      </div>

    </div>
  );
}

function Ring({
  percent,
}) {
  const radius = 48;
  const circumference =
    2 * Math.PI * radius;

  const offset =
    circumference -
    (percent / 100) *
      circumference;

  return (
    <div className="relative h-40 w-40">

      <svg
        viewBox="0 0 110 110"
        className="h-full w-full -rotate-90"
      >

        <circle
          cx="55"
          cy="55"
          r={radius}
          fill="none"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="8"
        />

        <circle
          cx="55"
          cy="55"
          r={radius}
          fill="none"
          stroke="rgba(167,139,250,0.95)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />

      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">

        <div className="font-serif text-3xl font-black">
          {Math.round(percent)}%
        </div>

        <div className="mt-1 text-[8px] uppercase tracking-widest text-slate-600">
          Next level
        </div>

      </div>

    </div>
  );
}

export default function CharacterPage() {
  const {
    character,
    loadingCharacter,
    refreshCharacter,
  } = useGame();

  const [error, setError] = useState("");
  const [activeView, setActiveView] =
    useState("profile");

  const load = async () => {
    setError("");

    try {
      await refreshCharacter();
    } catch (e) {
      setError(
        e?.message ||
          "Something went wrong."
      );
    }
  };

  useEffect(() => {
    load();
  }, []);

  if (loadingCharacter) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#06111b] text-white">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#06111b] px-5 py-10 text-white md:px-8">
        <ErrorMessage
          message={error}
          onRetry={load}
        />
      </div>
    );
  }

  const level = character?.level ?? 1;
  const xp = character?.xp ?? 0;
  const xpToNextLevel =
    character?.xpToNextLevel ?? 100;
  const gold = character?.gold ?? 0;
  const currentStreak =
    character?.currentStreak ?? 0;
  const longestStreak =
    character?.longestStreak ?? 0;

  const attributes =
    character?.attributes ?? {};

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
            (xp / xpToNextLevel) *
              100
          )
        )
      : 0;

  const totalAttributePoints =
    Number(intelligence) +
    Number(strength) +
    Number(discipline) +
    Number(vitality);

  const attributeValues = {
    intelligence,
    strength,
    discipline,
    vitality,
  };

  const strongestAttribute =
    ATTRIBUTE_DATA
      .map((item) => ({
        ...item,
        value:
          Number(
            attributeValues[item.key]
          ) || 0,
      }))
      .sort(
        (a, b) =>
          b.value - a.value
      )[0];

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#06111b] text-white">

      {/* =====================================================
          ATMOSPHERE
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0">

        <div className="absolute left-[-180px] top-[-160px] h-[600px] w-[600px] rounded-full bg-violet-700/10 blur-[150px]" />

        <div className="absolute right-[-180px] top-[25%] h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[150px]" />

        <div className="absolute bottom-[-200px] left-[25%] h-[600px] w-[600px] rounded-full bg-fuchsia-600/10 blur-[150px]" />

        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:30px_30px]" />

      </div>

      {/* =====================================================
          TOP BAR
      ====================================================== */}

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#06111b]/85 backdrop-blur-2xl">

        <div className="mx-auto flex h-[78px] max-w-[1600px] items-center justify-between px-5 md:px-8">

          <Link
            to="/"
            className="group flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-300/30 bg-violet-500/10 text-xl transition group-hover:rotate-12">
              ◈
            </div>

            <div>

              <div className="text-lg font-black">
                Evo<span className="text-fuchsia-400">
                  Quest
                </span>
              </div>

              <div className="text-[7px] uppercase tracking-[0.45em] text-slate-600">
                Hero Profile
              </div>

            </div>

          </Link>

          <div className="hidden items-center gap-3 sm:flex">

            <div className="rounded-full border border-emerald-300/10 bg-emerald-300/5 px-4 py-2">
              <div className="flex items-center gap-2">

                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />

                <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-200">
                  Character Synced
                </span>

              </div>
            </div>

          </div>

          <div className="flex items-center gap-2">

            <Link
              to="/quests"
              className="rounded-full border border-violet-300/20 bg-violet-500/10 px-4 py-2.5 text-[9px] font-bold uppercase tracking-widest text-violet-200 transition hover:bg-violet-500/20"
            >
              Missions
            </Link>

            <Link
              to="/dashboard"
              className="hidden rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5 text-[9px] font-bold uppercase tracking-widest text-slate-400 transition hover:text-white sm:block"
            >
              Command Center
            </Link>

          </div>

        </div>

      </header>

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 py-8 md:px-8 md:py-10">

        {/* ===================================================
            PAGE HEADER
        ==================================================== */}

        <section className="mb-8">

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>

              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.4em] text-violet-200">

                <span className="h-px w-8 bg-violet-300/60" />

                Hero Profile

              </div>

              <h1 className="mt-4 font-serif text-5xl font-black leading-[0.92] sm:text-6xl md:text-7xl">

                Your
                <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-200 bg-clip-text text-transparent">
                  Character.
                </span>

              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                This is the living record of your progression. Your
                real-world actions shape the character you see here.
              </p>

            </div>

            <div className="flex gap-2">

              {["profile", "stats"].map(
                (view) => (
                  <button
                    key={view}
                    type="button"
                    onClick={() =>
                      setActiveView(view)
                    }
                    className={`rounded-full border px-5 py-2.5 text-[9px] font-bold uppercase tracking-widest transition ${
                      activeView === view
                        ? "border-violet-300/30 bg-violet-500/15 text-violet-200"
                        : "border-white/10 bg-white/[0.02] text-slate-600"
                    }`}
                  >
                    {view}
                  </button>
                )
              )}

            </div>

          </div>

        </section>

        {/* ===================================================
            CHARACTER HERO
        ==================================================== */}

        <section className="relative mb-6 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.025]">

          <CornerFrame />

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_45%,rgba(139,92,246,0.16),transparent_25%),radial-gradient(circle_at_80%_40%,rgba(34,211,238,0.08),transparent_25%)]" />

          <div className="relative grid lg:grid-cols-[0.72fr_1.28fr]">

            {/* HERO ART */}

            <div className="relative flex min-h-[460px] items-center justify-center overflow-hidden border-b border-white/5 lg:border-b-0 lg:border-r">

              <div className="absolute h-[330px] w-[330px] rounded-full border border-violet-300/10" />

              <div className="absolute h-[260px] w-[260px] rounded-full border border-cyan-300/10 border-dashed" />

              <div className="absolute h-[210px] w-[210px] rounded-full bg-violet-500/10 blur-[80px]" />

              <div className="absolute left-7 top-7">

                <div className="text-[8px] uppercase tracking-[0.35em] text-slate-700">
                  Character Core
                </div>

                <div className="mt-1 font-mono text-[8px] text-cyan-200">
                  EVQ-{String(level).padStart(3, "0")}
                </div>

              </div>

              <div className="absolute right-7 top-7 rounded-full border border-emerald-300/10 bg-emerald-300/5 px-3 py-1.5 text-[8px] uppercase tracking-widest text-emerald-200">
                Active
              </div>

              <div className="relative z-10 text-center">

                <div className="text-[155px] drop-shadow-[0_30px_45px_rgba(0,0,0,0.85)]">
                  🧙‍♂️
                </div>

                <div className="mt-[-5px] font-serif text-3xl font-black">
                  Your Hero
                </div>

                <div className="mt-2 text-[9px] uppercase tracking-[0.4em] text-violet-200">
                  Level {level} • Explorer
                </div>

              </div>

              <div className="absolute bottom-7 left-7 rounded-xl border border-orange-300/10 bg-orange-300/5 px-4 py-3">

                <div className="text-[7px] uppercase tracking-widest text-slate-700">
                  Momentum
                </div>

                <div className="mt-1 text-xs font-black text-orange-200">
                  🔥 {currentStreak} days
                </div>

              </div>

              <div className="absolute bottom-7 right-7 rounded-xl border border-yellow-300/10 bg-yellow-300/5 px-4 py-3">

                <div className="text-[7px] uppercase tracking-widest text-slate-700">
                  Rewards
                </div>

                <div className="mt-1 text-xs font-black text-yellow-200">
                  🪙 {gold}
                </div>

              </div>

            </div>

            {/* PROFILE CORE */}

            <div className="p-7 md:p-9">

              <div className="flex items-start justify-between gap-5">

                <div>

                  <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-200">
                    Evolution Status
                  </div>

                  <h2 className="mt-2 font-serif text-3xl font-black">
                    Growing stronger.
                  </h2>

                  <p className="mt-3 max-w-xl text-xs leading-6 text-slate-600">
                    Your character progression reflects the actions,
                    consistency and habits you build in the real world.
                  </p>

                </div>

                <div className="hidden text-right sm:block">

                  <div className="text-[8px] uppercase tracking-widest text-slate-700">
                    Total power
                  </div>

                  <div className="mt-1 font-serif text-3xl font-black text-violet-200">
                    {totalAttributePoints}
                  </div>

                </div>

              </div>

              {/* XP */}

              <div className="mt-9">

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

                  <div className="font-mono text-xs text-cyan-200">
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
                      xpToNextLevel -
                        xp,
                      0
                    )}{" "}
                    XP remaining
                  </span>

                </div>

              </div>

              {/* QUICK STATS */}

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">

                <StatBox
                  icon="⚡"
                  value={xp}
                  label="Experience"
                  tone="cyan"
                />

                <StatBox
                  icon="🪙"
                  value={gold}
                  label="Rewards"
                  tone="gold"
                />

                <StatBox
                  icon="🔥"
                  value={currentStreak}
                  label="Momentum"
                  tone="orange"
                />

                <StatBox
                  icon="🏆"
                  value={longestStreak}
                  label="Best streak"
                  tone="violet"
                />

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            MAIN PROFILE
        ==================================================== */}

        {activeView === "profile" ? (
          <>

            {/* ATTRIBUTES */}

            <section className="mb-6">

              <Panel className="p-6 md:p-7">

                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

                  <div>

                    <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-200">
                      Core Stats
                    </div>

                    <h2 className="mt-2 font-serif text-2xl font-black">
                      What Makes Your Hero
                    </h2>

                    <p className="mt-2 text-xs text-slate-600">
                      Different actions strengthen different parts of your character.
                    </p>

                  </div>

                  <div className="rounded-full border border-white/10 px-4 py-2 font-mono text-[8px] text-slate-600">
                    {totalAttributePoints} TOTAL POINTS
                  </div>

                </div>

                <div className="mt-7 grid gap-4 md:grid-cols-2">

                  {ATTRIBUTE_DATA.map(
                    (attribute) => (
                      <AttributeVisual
                        key={attribute.key}
                        attribute={attribute}
                        value={
                          attributeValues[
                            attribute.key
                          ]
                        }
                      />
                    )
                  )}

                </div>

              </Panel>

            </section>

            {/* STRONGEST ATTRIBUTE */}

            <section className="mb-6 grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">

              <Panel className="p-7">

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
                  Character Identity
                </div>

                <div className="mt-7 flex items-center justify-center">

                  <Ring
                    percent={xpPercentage}
                  />

                </div>

                <div className="mt-5 text-center">

                  <div className="font-serif text-2xl font-black">
                    Level {level}
                  </div>

                  <div className="mt-1 text-[8px] uppercase tracking-[0.3em] text-slate-600">
                    Explorer
                  </div>

                </div>

                <div className="mt-7 rounded-2xl border border-violet-300/10 bg-violet-300/5 p-4">

                  <div className="text-[8px] uppercase tracking-widest text-slate-700">
                    Strongest attribute
                  </div>

                  <div className="mt-2 flex items-center gap-3">

                    <div className="text-2xl">
                      {strongestAttribute?.icon}
                    </div>

                    <div>

                      <div className="text-sm font-black">
                        {strongestAttribute?.name}
                      </div>

                      <div className="text-[9px] text-violet-200">
                        {strongestAttribute?.value} power
                      </div>

                    </div>

                  </div>

                </div>

              </Panel>

              {/* CHARACTER CARD */}

              <Panel className="p-3">

                <div className="rounded-[22px] border border-white/5 bg-black/20 p-4">

                  <div className="mb-4 flex items-center justify-between">

                    <div>
                      <div className="text-[8px] uppercase tracking-[0.3em] text-slate-700">
                        Original Character Sheet
                      </div>

                      <div className="mt-1 text-xs font-bold text-slate-400">
                        Full profile
                      </div>
                    </div>

                    <span className="rounded-full border border-white/10 px-3 py-1.5 text-[8px] uppercase tracking-widest text-slate-600">
                      LIVE
                    </span>

                  </div>

                  <CharacterCard
                    character={character}
                  />

                </div>

              </Panel>

            </section>

            {/* LIFE DOMAINS */}

            <section className="mb-6">

              <Panel className="p-6 md:p-7">

                <div className="flex items-end justify-between">

                  <div>

                    <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-fuchsia-300">
                      Life Domains
                    </div>

                    <h2 className="mt-2 font-serif text-2xl font-black">
                      Your World Outside The Screen
                    </h2>

                  </div>

                  <span className="text-[8px] uppercase tracking-widest text-slate-700">
                    Real life progression
                  </span>

                </div>

                <div className="mt-7 grid gap-3 md:grid-cols-2">

                  {LIFE_DOMAINS.map(
                    (domain) => (
                      <DomainCard
                        key={domain.name}
                        domain={domain}
                      />
                    )
                  )}

                </div>

              </Panel>

            </section>

          </>
        ) : null}

        {/* ===================================================
            STATS VIEW
        ==================================================== */}

        {activeView === "stats" ? (
          <section>

            <div className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">

              <Panel className="p-7">

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-200">
                  Power Distribution
                </div>

                <h2 className="mt-2 font-serif text-2xl font-black">
                  Attribute Balance
                </h2>

                <div className="mt-8 flex justify-center">

                  <div className="relative flex h-64 w-64 items-center justify-center rounded-full border border-violet-300/10">

                    <div className="absolute inset-7 rounded-full border border-cyan-300/10" />

                    <div className="absolute inset-14 rounded-full border border-fuchsia-300/10 border-dashed" />

                    <div className="text-center">

                      <div className="font-serif text-4xl font-black">
                        {totalAttributePoints}
                      </div>

                      <div className="mt-1 text-[8px] uppercase tracking-widest text-slate-600">
                        Total power
                      </div>

                    </div>

                  </div>

                </div>

                <div className="mt-8 space-y-4">

                  {ATTRIBUTE_DATA.map(
                    (attribute) => {
                      const value =
                        Number(
                          attributeValues[
                            attribute.key
                          ]
                        ) || 0;

                      return (
                        <div key={attribute.key}>

                          <div className="mb-2 flex items-center justify-between text-xs">

                            <span className="flex items-center gap-2">
                              <span>
                                {attribute.icon}
                              </span>

                              <span>
                                {attribute.name}
                              </span>
                            </span>

                            <span className="font-mono">
                              {value}
                            </span>

                          </div>

                          <ProgressBar
                            value={value}
                            gradient={attribute.gradient}
                          />

                        </div>
                      );
                    }
                  )}

                </div>

              </Panel>

              <Panel className="p-7">

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-fuchsia-300">
                  Growth Path
                </div>

                <h2 className="mt-2 font-serif text-2xl font-black">
                  Your Next Chapters
                </h2>

                <p className="mt-2 text-xs leading-6 text-slate-600">
                  Your progression is a long-form journey. Each stage
                  represents a stronger version of your everyday habits.
                </p>

                <div className="mt-7 grid gap-3">

                  {GROWTH_STAGES.map(
                    (stage, index) => (
                      <GrowthStep
                        key={stage.level}
                        item={stage}
                        index={index}
                        active={
                          level >=
                          stage.level
                        }
                      />
                    )
                  )}

                </div>

              </Panel>

            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-3">

              <StatBox
                icon="⚔️"
                value={level}
                label="Current level"
                tone="violet"
              />

              <StatBox
                icon="🔥"
                value={currentStreak}
                label="Current momentum"
                tone="orange"
              />

              <StatBox
                icon="🪙"
                value={gold}
                label="Available rewards"
                tone="gold"
              />

            </div>

          </section>
        ) : null}

        {/* ===================================================
            BOTTOM CTA
        ==================================================== */}

        <section className="mt-6">

          <Panel className="border-violet-300/10 bg-gradient-to-r from-violet-500/5 via-transparent to-cyan-500/5 p-7">

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

              <div>

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
                  Continue Your Evolution
                </div>

                <h2 className="mt-2 font-serif text-2xl font-black">
                  Your next mission shapes your next version.
                </h2>

                <p className="mt-2 text-xs text-slate-600">
                  Choose a meaningful action and keep building your character.
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
                  to="/achievements"
                  className="rounded-xl border border-yellow-300/10 bg-yellow-300/5 px-6 py-3.5 text-xs font-bold uppercase tracking-widest text-yellow-200 transition hover:bg-yellow-300/10"
                >
                  🏆 View Milestones
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
            EvoQuest • Hero Profile
          </span>

          <span>
            Your actions shape your character.
          </span>

        </footer>

      </div>

    </main>
  );
}