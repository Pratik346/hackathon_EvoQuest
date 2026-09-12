import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

const NAV_ITEMS = [
  { label: "World", href: "#world" },
  { label: "Tasks", href: "#quests" },
  { label: "Character", href: "#evolution" },
  { label: "AI Help", href: "#companion" },
];

const WORLD_STATS = [
  { number: "100K+", label: "Users" },
  { number: "1M+", label: "Tasks completed" },
  { number: "95%", label: "More consistent" },
  { number: "∞", label: "Ways to improve" },
];

const ATTRIBUTE_DATA = [
  {
    icon: "🔥",
    name: "Strength",
    value: 12,
    percent: 60,
    tone: "from-orange-300 to-rose-500",
  },
  {
    icon: "🧠",
    name: "Intelligence",
    value: 15,
    percent: 75,
    tone: "from-cyan-300 to-blue-500",
  },
  {
    icon: "⚡",
    name: "Discipline",
    value: 18,
    percent: 90,
    tone: "from-violet-300 to-fuchsia-500",
  },
  {
    icon: "💚",
    name: "Vitality",
    value: 14,
    percent: 70,
    tone: "from-emerald-300 to-cyan-500",
  },
];

const REGION_DATA = [
  {
    id: "01",
    name: "Study",
    category: "Study",
    icon: "📚",
    progress: "82%",
    description: "Read, learn and improve your knowledge.",
  },
  {
    id: "02",
    name: "Health",
    category: "Health",
    icon: "💪",
    progress: "64%",
    description: "Exercise, sleep well and stay healthy.",
  },
  {
    id: "03",
    name: "Career",
    category: "Career",
    icon: "💼",
    progress: "51%",
    description: "Build skills, projects and your career.",
  },
  {
    id: "04",
    name: "Friends",
    category: "Friends",
    icon: "❤️",
    progress: "73%",
    description: "Spend time with people and build good relationships.",
  },
  {
    id: "05",
    name: "Creative",
    category: "Creative",
    icon: "🎨",
    progress: "43%",
    description: "Create, write, design and try new ideas.",
  },
  {
    id: "06",
    name: "Money",
    category: "Money",
    icon: "🪙",
    progress: "38%",
    description: "Save money and build better money habits.",
  },
];

const QUEST_DATA = [
  {
    icon: "🌅",
    title: "Start Your Morning",
    description: "Start your day before 7:00 AM",
    xp: "30 XP",
    difficulty: "Easy",
    attribute: "Vitality",
  },
  {
    icon: "📖",
    title: "Read 20 Pages",
    description: "Read 20 pages from a useful book",
    xp: "50 XP",
    difficulty: "Easy",
    attribute: "Intelligence",
  },
  {
    icon: "⚔️",
    title: "30 Minute Workout",
    description: "Finish a focused 30-minute workout",
    xp: "75 XP",
    difficulty: "Medium",
    attribute: "Strength",
  },
  {
    icon: "🧠",
    title: "Learn Something New",
    description: "Learn one useful technical concept",
    xp: "60 XP",
    difficulty: "Medium",
    attribute: "Intelligence",
  },
  {
    icon: "🎯",
    title: "Deep Focus",
    description: "Finish one task without distractions",
    xp: "80 XP",
    difficulty: "Hard",
    attribute: "Discipline",
  },
  {
    icon: "❤️",
    title: "Help Someone",
    description: "Do something helpful for another person",
    xp: "40 XP",
    difficulty: "Easy",
    attribute: "Vitality",
  },
];

const ACHIEVEMENT_DATA = [
  {
    icon: "🏆",
    title: "First Steps",
    description: "Complete 10 tasks",
    rarity: "COMMON",
  },
  {
    icon: "🔥",
    title: "Early Riser",
    description: "Keep a 7 day streak",
    rarity: "RARE",
  },
  {
    icon: "📚",
    title: "Knowledge Seeker",
    description: "Read 5 books",
    rarity: "EPIC",
  },
  {
    icon: "💪",
    title: "Fitness Warrior",
    description: "Complete 20 workouts",
    rarity: "RARE",
  },
  {
    icon: "🎯",
    title: "Focus Master",
    description: "Finish 25 focus sessions",
    rarity: "LEGENDARY",
  },
  {
    icon: "🌟",
    title: "First Evolution",
    description: "Reach Level 10",
    rarity: "EPIC",
  },
];

const TIMELINE_DATA = [
  {
    day: "DAY 01",
    title: "Start",
    description: "Create your character and finish your first task.",
    number: "01",
  },
  {
    day: "DAY 07",
    title: "Build A Streak",
    description: "Keep going until consistency becomes a habit.",
    number: "02",
  },
  {
    day: "DAY 30",
    title: "Grow",
    description: "Unlock new rewards and stronger skills.",
    number: "03",
  },
  {
    day: "DAY 90",
    title: "Evolve",
    description: "Your daily actions become a system that works for you.",
    number: "04",
  },
];

const SKILL_DATA = [
  {
    title: "Focus",
    icon: "🧠",
    state: "Unlocked",
    position: "top-[12%] left-1/2 -translate-x-1/2",
    tone: "border-cyan-300/70 bg-cyan-400/10",
  },
  {
    title: "Deep Work",
    icon: "📚",
    state: "Unlocked",
    position: "top-[42%] left-[18%]",
    tone: "border-cyan-300/50 bg-cyan-400/10",
  },
  {
    title: "Time Control",
    icon: "⏱️",
    state: "Unlocked",
    position: "top-[42%] right-[18%]",
    tone: "border-violet-300/60 bg-violet-400/10",
  },
  {
    title: "Good Habits",
    icon: "🔗",
    state: "Unlocked",
    position: "bottom-[15%] left-[30%]",
    tone: "border-fuchsia-300/50 bg-fuchsia-400/10",
  },
  {
    title: "Goal Setting",
    icon: "🎯",
    state: "Locked",
    position: "bottom-[15%] right-[30%]",
    tone: "border-yellow-300/40 bg-yellow-400/5",
  },
];

function SectionEyebrow({ number, label }) {
  return (
    <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.35em] text-cyan-200">
      <span className="font-mono text-violet-300">{number}</span>
      <span className="h-px w-8 bg-cyan-300/50" />
      <span>{label}</span>
    </div>
  );
}

function SectionHeading({
  number,
  label,
  title,
  description,
  align = "left",
}) {
  return (
    <div className={`${align === "center" ? "mx-auto text-center" : ""} max-w-3xl`}>
      <SectionEyebrow number={number} label={label} />

      <h2 className="mt-5 font-serif text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl">
        {title}
      </h2>

      <p className="mt-6 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
        {description}
      </p>
    </div>
  );
}

function WorldDot({ className = "", label = "" }) {
  return (
    <div className={`absolute z-20 ${className}`}>
      <div className="relative flex h-8 w-8 items-center justify-center rounded-full border border-cyan-200/60 bg-cyan-300/10 shadow-[0_0_30px_rgba(103,232,249,0.35)]">
        <span className="h-2 w-2 rounded-full bg-cyan-200" />
      </div>

      {label ? (
        <div className="mt-2 whitespace-nowrap text-[8px] font-bold uppercase tracking-[0.25em] text-cyan-100/60">
          {label}
        </div>
      ) : null}
    </div>
  );
}

function Rune({ children, className = "" }) {
  return (
    <div
      className={`flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-white/5 text-xl shadow-lg ${className}`}
    >
      {children}
    </div>
  );
}

function AttributeBar({ item }) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-300">
          <span>{item.icon}</span>
          <span>{item.name}</span>
        </div>

        <span className="font-mono text-xs font-bold text-white">
          {item.value}
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-black/30">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${item.tone} shadow-lg`}
          style={{ width: `${item.percent}%` }}
        />
      </div>
    </div>
  );
}

function GlassFrame({ children, className = "" }) {
  return (
    <div
      className={`border border-white/10 bg-slate-950/55 shadow-2xl backdrop-blur-md ${className}`}
    >
      {children}
    </div>
  );
}

function CornerMarks() {
  return (
    <>
      <span className="absolute left-2 top-2 h-4 w-4 border-l border-t border-white/25" />
      <span className="absolute right-2 top-2 h-4 w-4 border-r border-t border-white/25" />
      <span className="absolute bottom-2 left-2 h-4 w-4 border-b border-l border-white/25" />
      <span className="absolute bottom-2 right-2 h-4 w-4 border-b border-r border-white/25" />
    </>
  );
}

function QuestCard({ quest, active, onSelect }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`group w-full rounded-2xl border p-4 text-left transition duration-300 ${
        active
          ? "border-violet-300/50 bg-violet-500/10 shadow-xl shadow-violet-500/10"
          : "border-white/10 bg-white/[0.025] hover:border-white/20 hover:bg-white/[0.045]"
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl">
          {quest.icon}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="truncate text-sm font-bold text-white">
              {quest.title}
            </h3>

            {active ? (
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-300" />
            ) : null}
          </div>

          <p className="mt-1 truncate text-[11px] text-slate-500">
            {quest.description}
          </p>
        </div>

        <div className="hidden text-right sm:block">
          <div className="font-mono text-xs font-bold text-cyan-300">
            {quest.xp}
          </div>

          <div className="mt-1 text-[8px] uppercase tracking-widest text-slate-600">
            {quest.difficulty}
          </div>
        </div>

        <div className="rounded-lg border border-white/10 px-3 py-2 text-[10px] font-bold text-slate-300 transition group-hover:border-violet-300/30 group-hover:text-white">
          VIEW
        </div>
      </div>
    </button>
  );
}

function Achievement({ item }) {
  const rarityClass =
    item.rarity === "LEGENDARY"
      ? "text-fuchsia-300"
      : item.rarity === "EPIC"
        ? "text-violet-300"
        : item.rarity === "RARE"
          ? "text-cyan-300"
          : "text-yellow-200";

  return (
    <div className="group flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-3 transition hover:bg-white/[0.05]">
      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-yellow-300/20 bg-yellow-300/5 text-xl">
        {item.icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="truncate text-xs font-bold text-white">
          {item.title}
        </div>

        <div className="mt-1 truncate text-[10px] text-slate-500">
          {item.description}
        </div>
      </div>

      <div className={`text-[8px] font-bold tracking-widest ${rarityClass}`}>
        {item.rarity}
      </div>
    </div>
  );
}

function SkillNode({ item }) {
  return (
    <div className={`absolute z-20 ${item.position} -translate-x-1/2 text-center`}>
      <div
        className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full border-2 ${item.tone} text-3xl shadow-2xl`}
      >
        {item.icon}
      </div>

      <div className="mt-3 whitespace-nowrap text-xs font-black text-white">
        {item.title}
      </div>

      <div className="mt-1 text-[8px] uppercase tracking-widest text-slate-500">
        {item.state}
      </div>
    </div>
  );
}

function OrbitalStat({
  icon,
  label,
  value,
  className,
}) {
  return (
    <div className={`absolute z-30 ${className}`}>
      <div className="rounded-xl border border-white/15 bg-slate-950/80 px-4 py-3 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-3">
          <Rune className="h-9 w-9 text-base">
            {icon}
          </Rune>

          <div>
            <div className="text-[8px] uppercase tracking-widest text-slate-600">
              {label}
            </div>

            <div className="mt-1 font-mono text-sm font-black text-white">
              {value}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MapRoad() {
  return (
    <svg
      className="absolute inset-0 h-full w-full"
      viewBox="0 0 1000 600"
      fill="none"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M80 460 C220 400 180 240 350 260 C500 280 470 440 620 370 C760 300 730 170 920 130"
        stroke="rgba(191,219,254,0.20)"
        strokeWidth="3"
        strokeDasharray="8 12"
      />

      <path
        d="M120 520 C250 500 270 340 430 330 C560 320 620 500 820 430"
        stroke="rgba(217,70,239,0.14)"
        strokeWidth="2"
      />

      <circle cx="80" cy="460" r="7" fill="rgba(103,232,249,0.9)" />
      <circle cx="350" cy="260" r="7" fill="rgba(167,139,250,0.9)" />
      <circle cx="620" cy="370" r="7" fill="rgba(244,114,182,0.9)" />
      <circle cx="920" cy="130" r="7" fill="rgba(251,191,36,0.9)" />
    </svg>
  );
}

function MagicSeal() {
  return (
    <div className="relative flex h-36 w-36 items-center justify-center">
      <div className="absolute inset-0 rounded-full border border-violet-300/30" />
      <div className="absolute inset-3 rotate-45 rounded-2xl border border-cyan-300/20" />
      <div className="absolute inset-8 rounded-full border border-fuchsia-300/20" />
      <div className="text-4xl text-violet-200">✦</div>
    </div>
  );
}

function MiniChart() {
  return (
    <svg
      viewBox="0 0 500 180"
      className="h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M10 150 L65 136 L110 145 L160 108 L205 120 L250 90 L300 100 L350 65 L400 78 L445 35 L490 48"
        stroke="rgba(103,232,249,0.9)"
        strokeWidth="4"
      />

      <path
        d="M10 150 L65 136 L110 145 L160 108 L205 120 L250 90 L300 100 L350 65 L400 78 L445 35 L490 48 L490 175 L10 175 Z"
        fill="rgba(34,211,238,0.05)"
      />

      <line
        x1="0"
        y1="175"
        x2="500"
        y2="175"
        stroke="rgba(255,255,255,0.08)"
      />

      <line
        x1="0"
        y1="130"
        x2="500"
        y2="130"
        stroke="rgba(255,255,255,0.05)"
      />

      <line
        x1="0"
        y1="85"
        x2="500"
        y2="85"
        stroke="rgba(255,255,255,0.05)"
      />

      <line
        x1="0"
        y1="40"
        x2="500"
        y2="40"
        stroke="rgba(255,255,255,0.05)"
      />
    </svg>
  );
}

function RadarGraphic() {
  return (
    <svg
      viewBox="0 0 400 400"
      className="h-full w-full"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="200"
        cy="200"
        r="155"
        stroke="rgba(103,232,249,0.12)"
      />

      <circle
        cx="200"
        cy="200"
        r="115"
        stroke="rgba(139,92,246,0.16)"
      />

      <circle
        cx="200"
        cy="200"
        r="75"
        stroke="rgba(244,114,182,0.18)"
      />

      <path
        d="M200 45 V355"
        stroke="rgba(255,255,255,0.06)"
      />

      <path
        d="M45 200 H355"
        stroke="rgba(255,255,255,0.06)"
      />

      <path
        d="M90 90 L310 310"
        stroke="rgba(255,255,255,0.04)"
      />

      <path
        d="M310 90 L90 310"
        stroke="rgba(255,255,255,0.04)"
      />

      <polygon
        points="200,65 290,145 270,275 145,300 95,185"
        fill="rgba(139,92,246,0.10)"
        stroke="rgba(167,139,250,0.75)"
        strokeWidth="2"
      />

      <circle
        cx="200"
        cy="65"
        r="5"
        fill="rgba(103,232,249,1)"
      />

      <circle
        cx="290"
        cy="145"
        r="5"
        fill="rgba(244,114,182,1)"
      />

      <circle
        cx="270"
        cy="275"
        r="5"
        fill="rgba(52,211,153,1)"
      />

      <circle
        cx="145"
        cy="300"
        r="5"
        fill="rgba(251,191,36,1)"
      />

      <circle
        cx="95"
        cy="185"
        r="5"
        fill="rgba(96,165,250,1)"
      />
    </svg>
  );
}

function FloatingParticle({
  className = "",
  delay = "0s",
}) {
  return (
    <span
      className={`absolute h-1.5 w-1.5 rounded-full bg-white/70 shadow-[0_0_15px_rgba(255,255,255,0.8)] ${className}`}
      style={{ animationDelay: delay }}
    />
  );
}

function ProgressRing({
  value = 78,
  label = "Progress",
}) {
  const circumference = 2 * Math.PI * 46;
  const offset =
    circumference -
    (value / 100) * circumference;

  return (
    <div className="relative h-32 w-32">
      <svg
        viewBox="0 0 110 110"
        className="h-full w-full -rotate-90"
      >
        <circle
          cx="55"
          cy="55"
          r="46"
          stroke="rgba(255,255,255,0.07)"
          strokeWidth="8"
          fill="none"
        />

        <circle
          cx="55"
          cy="55"
          r="46"
          stroke="rgba(167,139,250,0.95)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          fill="none"
        />
      </svg>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="text-xl font-black">
          {value}%
        </div>

        <div className="text-[8px] uppercase tracking-widest text-slate-500">
          {label}
        </div>
      </div>
    </div>
  );
}

function StatTile({
  icon,
  value,
  label,
  tone = "violet",
}) {
  const toneClasses = {
    violet:
      "border-violet-300/20 bg-violet-500/5",
    cyan:
      "border-cyan-300/20 bg-cyan-500/5",
    gold:
      "border-yellow-300/20 bg-yellow-500/5",
    green:
      "border-emerald-300/20 bg-emerald-500/5",
  };

  return (
    <div
      className={`rounded-xl border p-4 ${
        toneClasses[tone] || toneClasses.violet
      }`}
    >
      <div className="text-xl">{icon}</div>

      <div className="mt-2 font-mono text-lg font-black">
        {value}
      </div>

      <div className="mt-1 text-[9px] uppercase tracking-widest text-slate-500">
        {label}
      </div>
    </div>
  );
}

function Navigation() {
  const [scrolled, setScrolled] =
    useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener(
      "scroll",
      handleScroll
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[100] transition duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-[#06101a]/90 backdrop-blur-xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1500px] items-center justify-between px-5 py-5 lg:px-10">

        <Link
          to="/"
          className="group flex items-center gap-3"
        >
          <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-violet-300/40 bg-violet-500/10 text-xl shadow-lg shadow-violet-500/10 transition group-hover:rotate-12">
            ◈
          </div>

          <div>
            <div className="text-lg font-black tracking-tight">
              Evo<span className="text-fuchsia-400">
                Quest
              </span>
            </div>

            <div className="text-[8px] uppercase tracking-[0.4em] text-slate-500">
              Level Up Your Life
            </div>
          </div>
        </Link>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-xs font-semibold text-slate-400 transition hover:text-white"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            to="/login"
            className="rounded-full px-4 py-2 text-xs font-bold text-slate-300 transition hover:text-white"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-full border border-violet-300/40 bg-violet-500/20 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-violet-500/10 transition hover:-translate-y-0.5 hover:bg-violet-500/30"
          >
            Start Now
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function LandingPage() {
  const [activeQuest, setActiveQuest] =
    useState(0);

  const [activeRegion, setActiveRegion] =
    useState(0);

  const [showTerminal, setShowTerminal] =
    useState(false);

  const [companionMessage, setCompanionMessage] =
    useState(0);

  const [worldMode, setWorldMode] =
    useState("EXPLORE");

  const [questAccepted, setQuestAccepted] =
    useState(false);

  const [scrollY, setScrollY] =
    useState(0);

  useEffect(() => {
    const handleScroll = () =>
      setScrollY(window.scrollY);

    window.addEventListener(
      "scroll",
      handleScroll,
      { passive: true }
    );

    return () =>
      window.removeEventListener(
        "scroll",
        handleScroll
      );
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveQuest(
        (value) =>
          (value + 1) %
          QUEST_DATA.length
      );
    }, 4500);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCompanionMessage(
        (value) => (value + 1) % 3
      );
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const currentQuest =
    QUEST_DATA[activeQuest];

  const currentRegion =
    REGION_DATA[activeRegion];

  const companionText = useMemo(
    () => [
      "I found a task that fits your current progress.",
      "Your Discipline is getting stronger. Keep going.",
      "Small steps add up. Let us choose one useful step today.",
    ],
    []
  );

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#06101a] text-white selection:bg-violet-400 selection:text-white">

      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
        <div className="absolute left-[-15%] top-[10%] h-[500px] w-[500px] rounded-full bg-violet-700/10 blur-[130px]" />

        <div className="absolute right-[-10%] top-[30%] h-[500px] w-[500px] rounded-full bg-cyan-600/10 blur-[140px]" />

        <div className="absolute left-[40%] top-[65%] h-[400px] w-[400px] rounded-full bg-fuchsia-600/5 blur-[120px]" />
      </div>

      <Navigation />

      {/* HERO */}

      <section className="relative min-h-screen overflow-hidden bg-[#081722]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(168,85,247,0.22),transparent_25%),radial-gradient(circle_at_20%_35%,rgba(34,211,238,0.08),transparent_28%)]" />

        <div className="absolute inset-0 opacity-[0.07]">
          <div className="h-full w-full bg-[linear-gradient(90deg,white_1px,transparent_1px),linear-gradient(white_1px,transparent_1px)] bg-[size:90px_90px]" />
        </div>

        <FloatingParticle className="left-[12%] top-[22%]" delay="0.4s" />
        <FloatingParticle className="left-[24%] top-[34%]" delay="1.2s" />
        <FloatingParticle className="left-[38%] top-[16%]" delay="0.8s" />
        <FloatingParticle className="left-[54%] top-[27%]" delay="1.6s" />
        <FloatingParticle className="left-[67%] top-[12%]" delay="0.2s" />
        <FloatingParticle className="left-[78%] top-[32%]" delay="1.1s" />
        <FloatingParticle className="left-[91%] top-[20%]" delay="0.7s" />

        <div
          className="absolute right-[9%] top-[12%] h-48 w-48 rounded-full bg-gradient-to-br from-orange-100 via-pink-200 to-violet-300 opacity-80 shadow-[0_0_120px_rgba(244,114,182,0.25)] md:h-72 md:w-72"
          style={{
            transform: `translateY(${scrollY * 0.06}px)`,
          }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-[56%]">
          <div className="absolute bottom-0 left-[-12%] h-[85%] w-[55%] bg-[#102a3b] [clip-path:polygon(0_100%,42%_12%,58%_40%,74%_0,100%_100%)]" />
          <div className="absolute bottom-0 left-[24%] h-full w-[55%] bg-[#0c2333] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
          <div className="absolute bottom-0 right-[-15%] h-[90%] w-[60%] bg-[#10293a] [clip-path:polygon(0_100%,48%_8%,65%_35%,78%_0,100%_100%)]" />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-[24%] bg-[#06131d] [clip-path:polygon(0_100%,0_60%,4%_70%,7%_35%,10%_68%,14%_40%,18%_74%,23%_32%,27%_70%,31%_42%,35%_76%,39%_28%,44%_71%,49%_38%,54%_74%,58%_30%,63%_70%,68%_42%,72%_75%,77%_36%,82%_70%,87%_28%,92%_73%,96%_38%,100%_65%,100%_100%)]" />

        <div
          className="absolute bottom-[14%] left-[10%] h-24 w-40 opacity-60"
          style={{
            transform: `translateY(${scrollY * -0.05}px)`,
          }}
        >
          <div className="absolute bottom-0 left-0 h-20 w-2 bg-slate-700" />
          <div className="absolute bottom-12 left-2 h-16 w-1 bg-slate-700" />
          <div className="absolute bottom-0 left-4 h-24 w-1 bg-slate-700" />
        </div>

        <div className="relative z-10 mx-auto grid min-h-screen max-w-[1500px] items-center gap-12 px-5 pb-24 pt-32 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">

          <div className="relative z-40">

            <SectionEyebrow
              number="00"
              label="Your Life"
            />

            <h1 className="mt-7 max-w-4xl font-serif text-6xl font-black leading-[0.88] tracking-tight sm:text-7xl md:text-8xl lg:text-[104px]">

              Your Life

              <span className="block text-slate-100">
                Is Not A
              </span>

              <span className="block bg-gradient-to-r from-fuchsia-300 via-violet-300 to-cyan-200 bg-clip-text text-transparent">
                To-Do List.
              </span>

            </h1>

            <p className="mt-8 max-w-xl text-sm leading-7 text-slate-300 md:text-base">
              Turn your goals, habits and daily work into simple tasks.
              Complete them, earn Experience, grow your skills and build
              a stronger version of yourself.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">

              <Link
                to="/register"
                className="group relative overflow-hidden rounded-full border border-violet-200/40 bg-violet-500/20 px-7 py-4 text-xs font-black uppercase tracking-widest shadow-2xl shadow-violet-500/20 transition hover:-translate-y-1 hover:bg-violet-500/30"
              >
                <span className="relative z-10">
                  Start Your Journey
                </span>

                <span className="relative z-10 ml-4 transition group-hover:ml-6">
                  →
                </span>
              </Link>

              <button
                type="button"
                onClick={() =>
                  setWorldMode(
                    worldMode === "EXPLORE"
                      ? "NIGHT"
                      : "EXPLORE"
                  )
                }
                className="rounded-full border border-white/15 bg-white/5 px-7 py-4 text-xs font-bold uppercase tracking-widest text-slate-300 backdrop-blur-md transition hover:border-cyan-300/40 hover:text-white"
              >
                {worldMode === "EXPLORE"
                  ? "Night View"
                  : "Day View"}
              </button>

            </div>

            <div className="mt-12 grid max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4">

              {WORLD_STATS.map((item) => (
                <div
                  key={item.label}
                  className="border-l border-white/10 pl-4"
                >
                  <div className="font-serif text-2xl font-black">
                    {item.number}
                  </div>

                  <div className="mt-1 text-[8px] uppercase tracking-widest text-slate-600">
                    {item.label}
                  </div>
                </div>
              ))}

            </div>

          </div>

          <div className="relative min-h-[650px]">

            <div
              className="absolute left-1/2 top-1/2 h-[540px] w-[540px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-200/10"
              style={{
                transform: `translate(-50%, -50%) rotate(${scrollY * 0.02}deg)`,
              }}
            />

            <div
              className="absolute left-1/2 top-1/2 h-[410px] w-[410px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-200/10"
              style={{
                transform: `translate(-50%, -50%) rotate(${-scrollY * 0.035}deg)`,
              }}
            />

            <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/15 blur-[100px]" />

            <div
              className="absolute left-1/2 top-[49%] z-20 -translate-x-1/2 -translate-y-1/2"
              style={{
                transform: `translate(-50%, calc(-50% + ${scrollY * -0.08}px))`,
              }}
            >
              <div className="relative flex h-[520px] w-[310px] items-end justify-center">

                <div className="absolute bottom-0 h-80 w-56 rounded-[50%] bg-violet-500/10 blur-3xl" />

                <div className="relative flex flex-col items-center">

                  <div className="text-[170px] leading-none drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] md:text-[200px]">
                    🧙
                  </div>

                  <div className="absolute bottom-20 right-[-30px] rotate-[-18deg] text-8xl">
                    ⚔️
                  </div>

                  <div className="absolute bottom-7 rounded-full border border-white/20 bg-[#050b13]/85 px-6 py-2 backdrop-blur-md">
                    <span className="text-[9px] font-black uppercase tracking-[0.35em] text-violet-200">
                      Level 01 • Beginner
                    </span>
                  </div>

                </div>
              </div>
            </div>

            <OrbitalStat
              icon="⚔️"
              label="Strength"
              value="12"
              className="left-[0%] top-[25%]"
            />

            <OrbitalStat
              icon="🧠"
              label="Intelligence"
              value="15"
              className="right-[0%] top-[19%]"
            />

            <OrbitalStat
              icon="⚡"
              label="Discipline"
              value="18"
              className="left-[3%] bottom-[24%]"
            />

            <OrbitalStat
              icon="🔥"
              label="Streak"
              value="7 Days"
              className="right-[1%] bottom-[20%]"
            />

            <div className="absolute left-[18%] top-[12%] z-30">
              <div className="flex h-12 w-12 items-center justify-center rounded-full border border-yellow-200/50 bg-yellow-300/10 text-xl shadow-[0_0_30px_rgba(253,224,71,0.2)]">
                !
              </div>

              <div className="mt-2 text-[8px] uppercase tracking-widest text-yellow-100/70">
                New task
              </div>
            </div>

            <div className="absolute bottom-[11%] right-[14%] z-30 rounded-xl border border-cyan-200/20 bg-slate-950/70 px-4 py-3 backdrop-blur-md">
              <div className="text-[8px] uppercase tracking-widest text-slate-600">
                Next level
              </div>

              <div className="mt-1 font-mono text-xs font-bold text-cyan-200">
                650 XP needed
              </div>
            </div>

            <div className="absolute bottom-[4%] left-1/2 z-30 -translate-x-1/2">

              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-slate-950/70 px-5 py-3 backdrop-blur-md">

                <span className="text-xs text-violet-300">
                  N
                </span>

                <div className="h-1 w-12 bg-gradient-to-r from-violet-400 to-cyan-300" />

                <span className="text-[8px] uppercase tracking-widest text-slate-500">
                  Start here
                </span>

              </div>

            </div>

          </div>

        </div>

        <div className="absolute bottom-5 left-1/2 z-40 -translate-x-1/2 text-center">

          <div className="text-[8px] uppercase tracking-[0.5em] text-slate-600">
            Scroll to see more
          </div>

          <div className="mx-auto mt-3 h-8 w-px bg-gradient-to-b from-cyan-200/60 to-transparent" />

        </div>

      </section>

      {/* WORLD */}

      <section
        id="world"
        className="relative overflow-hidden border-t border-white/5 bg-[#07131e] py-28"
      >

        <div className="relative mx-auto max-w-[1500px] px-5 lg:px-10">

          <SectionHeading
            number="01"
            label="Your Life"
            title={
              <>
                Everything Important
                <br />
                Has A <span className="text-cyan-300">Place.</span>
              </>
            }
            description="Your life has many parts. EvoQuest brings them together so you can see where you are growing and where you need more attention."
          />

          <div className="mt-16 grid gap-8 xl:grid-cols-[1.35fr_0.65fr]">

            <GlassFrame className="relative min-h-[650px] overflow-hidden rounded-[32px]">

              <CornerMarks />

              <div className="absolute inset-0 bg-[radial-gradient(circle_at_45%_45%,rgba(139,92,246,0.15),transparent_28%),radial-gradient(circle_at_75%_25%,rgba(34,211,238,0.09),transparent_20%)]" />

              <MapRoad />

              <div className="absolute left-[8%] top-[25%] h-40 w-48 rotate-[-6deg] rounded-[45%] bg-[#0d2633] shadow-2xl" />
              <div className="absolute left-[40%] top-[20%] h-48 w-60 rotate-[5deg] rounded-[48%] bg-[#102b38] shadow-2xl" />
              <div className="absolute right-[7%] top-[12%] h-36 w-48 rotate-[-8deg] rounded-[48%] bg-[#0d2532] shadow-2xl" />
              <div className="absolute right-[17%] bottom-[13%] h-40 w-56 rotate-[4deg] rounded-[45%] bg-[#102836] shadow-2xl" />
              <div className="absolute left-[18%] bottom-[11%] h-36 w-52 rotate-[-4deg] rounded-[46%] bg-[#0b2330] shadow-2xl" />

              <div className="absolute left-[33%] top-[31%] h-24 w-28 bg-[#183a4a] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
              <div className="absolute left-[47%] top-[28%] h-32 w-36 bg-[#173746] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />
              <div className="absolute right-[25%] top-[24%] h-28 w-32 bg-[#193b49] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />

              <WorldDot className="left-[17%] top-[37%]" label="Study" />
              <WorldDot className="left-[50%] top-[39%]" label="Health" />
              <WorldDot className="right-[17%] top-[30%]" label="Career" />
              <WorldDot className="right-[26%] bottom-[24%]" label="Friends" />
              <WorldDot className="left-[29%] bottom-[22%]" label="Creative" />
              <WorldDot className="left-[51%] bottom-[15%]" label="Money" />

              <div className="absolute left-6 top-6">

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-200">
                  YOUR WORLD
                </div>

                <div className="mt-1 font-mono text-[8px] text-slate-600">
                  6 LIFE AREAS
                </div>

              </div>

              <div className="absolute right-6 top-6 flex gap-2">

                <button
                  type="button"
                  onClick={() =>
                    setWorldMode("EXPLORE")
                  }
                  className={`rounded-full px-3 py-1.5 text-[8px] font-bold tracking-widest ${
                    worldMode === "EXPLORE"
                      ? "bg-violet-500/20 text-violet-200"
                      : "bg-white/5 text-slate-600"
                  }`}
                >
                  EXPLORE
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setWorldMode("QUEST")
                  }
                  className={`rounded-full px-3 py-1.5 text-[8px] font-bold tracking-widest ${
                    worldMode === "QUEST"
                      ? "bg-cyan-500/20 text-cyan-200"
                      : "bg-white/5 text-slate-600"
                  }`}
                >
                  TASKS
                </button>

              </div>

              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">

                <div>

                  <div className="text-[8px] uppercase tracking-widest text-slate-600">
                    Current area
                  </div>

                  <div className="mt-1 text-sm font-bold text-white">
                    {currentRegion.name}
                  </div>

                </div>

                <div className="text-right">

                  <div className="text-[8px] uppercase tracking-widest text-slate-600">
                    Progress
                  </div>

                  <div className="mt-1 font-mono text-sm text-cyan-200">
                    {currentRegion.progress}
                  </div>

                </div>

              </div>

            </GlassFrame>

            <div className="space-y-3">

              {REGION_DATA.map(
                (region, index) => (
                  <button
                    type="button"
                    key={region.id}
                    onClick={() =>
                      setActiveRegion(index)
                    }
                    className={`w-full rounded-2xl border p-4 text-left transition ${
                      activeRegion === index
                        ? "border-violet-300/40 bg-violet-500/10"
                        : "border-white/10 bg-white/[0.02] hover:bg-white/[0.04]"
                    }`}
                  >

                    <div className="flex items-center gap-4">

                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl">
                        {region.icon}
                      </div>

                      <div className="min-w-0 flex-1">

                        <div className="flex items-center justify-between">

                          <span className="text-[8px] uppercase tracking-widest text-slate-600">
                            Area {region.id}
                          </span>

                          <span className="font-mono text-[9px] text-cyan-300">
                            {region.progress}
                          </span>

                        </div>

                        <div className="mt-1 text-sm font-black">
                          {region.name}
                        </div>

                        <div className="mt-1 text-[10px] text-slate-500">
                          {region.category}
                        </div>

                      </div>

                    </div>

                  </button>
                )
              )}

              <div className="mt-5 rounded-2xl border border-cyan-300/10 bg-cyan-300/5 p-5">

                <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-cyan-200">
                  About this
                </div>

                <div className="mt-3 flex items-center gap-3">

                  <div className="text-3xl">
                    {currentRegion.icon}
                  </div>

                  <div>

                    <div className="font-black">
                      {currentRegion.name}
                    </div>

                    <div className="text-[10px] text-slate-500">
                      {currentRegion.category}
                    </div>

                  </div>

                </div>

                <p className="mt-4 text-xs leading-6 text-slate-400">
                  {currentRegion.description}
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* TASKS */}

      <section
        id="quests"
        className="relative overflow-hidden bg-[#06111b] py-28"
      >

        <div className="absolute right-[-10%] top-[10%] h-[500px] w-[500px] rounded-full bg-violet-700/10 blur-[140px]" />

        <div className="relative mx-auto max-w-[1500px] px-5 lg:px-10">

          <SectionHeading
            number="02"
            label="Daily Tasks"
            title={
              <>
                Turn Normal Days
                <br />
                Into <span className="text-fuchsia-300">Progress.</span>
              </>
            }
            description="Choose a simple real-world task, finish it and watch your progress grow."
          />

          <div className="mt-16 grid gap-6 xl:grid-cols-[1fr_0.85fr]">

            <GlassFrame className="rounded-[28px] p-5">

              <div className="mb-5 flex items-center justify-between border-b border-white/10 pb-5">

                <div>

                  <div className="text-lg font-black">
                    Today’s Tasks
                  </div>

                  <div className="mt-1 text-[9px] uppercase tracking-widest text-slate-600">
                    Choose one and start
                  </div>

                </div>

                <div className="rounded-full border border-cyan-300/20 bg-cyan-300/5 px-3 py-2 font-mono text-[9px] text-cyan-200">
                  +335 XP
                </div>

              </div>

              <div className="space-y-3">

                {QUEST_DATA.map(
                  (quest, index) => (
                    <QuestCard
                      key={quest.title}
                      quest={quest}
                      active={
                        index === activeQuest
                      }
                      onSelect={() => {
                        setActiveQuest(index);
                        setQuestAccepted(false);
                      }}
                    />
                  )
                )}

              </div>

            </GlassFrame>

            <GlassFrame className="relative overflow-hidden rounded-[28px] p-7">

              <CornerMarks />

              <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-violet-500/15 blur-[90px]" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <span className="rounded-full border border-yellow-300/20 bg-yellow-300/5 px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.25em] text-yellow-200">
                    Selected Task
                  </span>

                  <span className="font-mono text-[9px] text-slate-600">
                    TASK-{String(
                      activeQuest + 1
                    ).padStart(3, "0")}
                  </span>

                </div>

                <div className="mt-10 flex items-center justify-center">

                  <div className="relative flex h-36 w-36 items-center justify-center rounded-full border border-violet-300/20 bg-violet-500/5 shadow-2xl shadow-violet-500/10">

                    <div className="absolute inset-3 rounded-full border border-cyan-300/10" />

                    <div className="text-6xl">
                      {currentQuest.icon}
                    </div>

                  </div>

                </div>

                <div className="mt-9 text-center">

                  <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
                    {currentQuest.attribute}
                  </div>

                  <h3 className="mt-3 font-serif text-3xl font-black">
                    {currentQuest.title}
                  </h3>

                  <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400">
                    {currentQuest.description}
                  </p>

                </div>

                <div className="mt-8 grid grid-cols-3 gap-3">

                  <StatTile
                    icon="✦"
                    value={currentQuest.xp}
                    label="Experience"
                    tone="cyan"
                  />

                  <StatTile
                    icon="◈"
                    value={currentQuest.difficulty}
                    label="Difficulty"
                    tone="violet"
                  />

                  <StatTile
                    icon="🪙"
                    value="+20"
                    label="Gold"
                    tone="gold"
                  />

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setQuestAccepted(
                      true
                    )
                  }
                  className={`mt-6 w-full rounded-xl px-5 py-4 text-xs font-black uppercase tracking-[0.2em] transition ${
                    questAccepted
                      ? "border border-emerald-300/30 bg-emerald-400/10 text-emerald-200"
                      : "bg-gradient-to-r from-violet-600 to-fuchsia-500 text-white shadow-xl shadow-violet-500/20 hover:-translate-y-0.5"
                  }`}
                >
                  {questAccepted
                    ? "Task Chosen ✓"
                    : "Choose This Task →"}
                </button>

                {questAccepted ? (
                  <div className="mt-4 rounded-xl border border-emerald-300/10 bg-emerald-300/5 p-3 text-center text-[10px] text-emerald-200">
                    Great choice. Now go do it in real life.
                  </div>
                ) : null}

              </div>

            </GlassFrame>

          </div>

        </div>

      </section>

      {/* CHARACTER */}

      <section
        id="evolution"
        className="relative overflow-hidden border-y border-white/5 bg-[#081722] py-28"
      >

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.10),transparent_30%)]" />

        <div className="relative mx-auto max-w-[1500px] px-5 lg:px-10">

          <SectionHeading
            number="03"
            label="Character"
            title={
              <>
                Your Character
                <br />
                Shows Your <span className="text-violet-300">Progress.</span>
              </>
            }
            description="Your Experience, skills, streaks, achievements and rewards show how much you are growing."
          />

          <div className="mt-16 grid gap-6 lg:grid-cols-[0.75fr_1.25fr]">

            <GlassFrame className="relative overflow-hidden rounded-[32px] p-7">

              <CornerMarks />

              <div className="absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-violet-600/15 to-transparent" />

              <div className="relative">

                <div className="flex items-center justify-between">

                  <div>

                    <div className="text-[8px] uppercase tracking-[0.3em] text-slate-600">
                      Character
                    </div>

                    <div className="mt-1 font-mono text-[10px] text-violet-300">
                      EVQ-WANDERER-001
                    </div>

                  </div>

                  <div className="rounded-full border border-violet-300/20 bg-violet-300/5 px-3 py-1.5 text-[9px] font-bold text-violet-200">
                    EXPLORER
                  </div>

                </div>

                <div className="mt-12 flex justify-center">

                  <div className="relative flex h-52 w-52 items-center justify-center rounded-full border border-violet-300/20 bg-violet-500/5 shadow-[0_0_100px_rgba(139,92,246,0.12)]">

                    <div className="absolute inset-4 rounded-full border border-white/5" />

                    <div className="absolute inset-10 rounded-full border border-cyan-300/10" />

                    <div className="text-[100px]">
                      🧙
                    </div>

                  </div>

                </div>

                <div className="mt-7 text-center">

                  <div className="font-serif text-3xl font-black">
                    Your Hero
                  </div>

                  <div className="mt-2 text-[9px] uppercase tracking-[0.35em] text-violet-300">
                    Level 12 • Explorer
                  </div>

                </div>

                <div className="mt-8">

                  <div className="mb-2 flex items-center justify-between text-[9px] uppercase tracking-widest">

                    <span className="text-slate-600">
                      Experience
                    </span>

                    <span className="font-mono text-cyan-200">
                      2350 / 3000
                    </span>

                  </div>

                  <div className="h-3 rounded-full bg-white/5">

                    <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-cyan-300 via-violet-400 to-fuchsia-400 shadow-lg shadow-violet-500/20" />

                  </div>

                </div>

                <div className="mt-7 grid grid-cols-3 gap-2">

                  <StatTile
                    icon="🔥"
                    value="7"
                    label="Streak"
                    tone="gold"
                  />

                  <StatTile
                    icon="⚔️"
                    value="48"
                    label="Tasks"
                    tone="violet"
                  />

                  <StatTile
                    icon="🏆"
                    value="8"
                    label="Badges"
                    tone="green"
                  />

                </div>

              </div>

            </GlassFrame>

            <div className="grid gap-6 md:grid-cols-2">

              <GlassFrame className="rounded-[28px] p-7">

                <div className="flex items-center justify-between">

                  <div>

                    <div className="text-lg font-black">
                      Your Skills
                    </div>

                    <div className="mt-1 text-[9px] uppercase tracking-widest text-slate-600">
                      Built through real actions
                    </div>

                  </div>

                  <MagicSeal />

                </div>

                <div className="-mt-6 space-y-6">

                  {ATTRIBUTE_DATA.map(
                    (item) => (
                      <AttributeBar
                        key={item.name}
                        item={item}
                      />
                    )
                  )}

                </div>

              </GlassFrame>

              <GlassFrame className="rounded-[28px] p-7">

                <div className="text-lg font-black">
                  Your Progress
                </div>

                <div className="mt-1 text-[9px] uppercase tracking-widest text-slate-600">
                  See how close you are to the next level
                </div>

                <div className="mt-8 flex items-center justify-center">
                  <ProgressRing
                    value={78}
                    label="level progress"
                  />
                </div>

                <div className="mt-7 rounded-xl border border-cyan-300/10 bg-cyan-300/5 p-4">

                  <div className="text-[9px] font-bold uppercase tracking-widest text-cyan-200">
                    Your strongest skill
                  </div>

                  <p className="mt-2 text-xs leading-6 text-slate-400">
                    Discipline is your strongest skill.
                    Keep completing focused tasks to make it even stronger.
                  </p>

                </div>

                <div className="mt-4 flex items-center justify-between text-[9px]">

                  <span className="text-slate-600">
                    Next level
                  </span>

                  <span className="font-mono text-violet-300">
                    650 XP
                  </span>

                </div>

              </GlassFrame>

              <GlassFrame className="rounded-[28px] p-7 md:col-span-2">

                <div className="flex items-center justify-between">

                  <div>

                    <div className="text-lg font-black">
                      Your Skills
                    </div>

                    <div className="mt-1 text-[9px] uppercase tracking-widest text-slate-600">
                      Your current skill balance
                    </div>

                  </div>

                  <span className="rounded-full border border-white/10 px-3 py-1.5 text-[8px] text-slate-500">
                    LIVE
                  </span>

                </div>

                <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

                  {ATTRIBUTE_DATA.map(
                    (item) => (
                      <div
                        key={item.name}
                        className="rounded-xl border border-white/10 bg-white/[0.025] p-5"
                      >

                        <div className="flex items-center justify-between">

                          <span className="text-xl">
                            {item.icon}
                          </span>

                          <span className="font-mono text-xs text-slate-500">
                            {item.value}
                          </span>

                        </div>

                        <div className="mt-5 text-xs font-bold">
                          {item.name}
                        </div>

                        <div className="mt-3 h-1.5 rounded-full bg-white/5">

                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${item.tone}`}
                            style={{
                              width: `${item.percent}%`,
                            }}
                          />

                        </div>

                        <div className="mt-2 text-[8px] uppercase tracking-widest text-slate-600">
                          {item.percent}% developed
                        </div>

                      </div>
                    )
                  )}

                </div>

              </GlassFrame>

            </div>

          </div>

        </div>

      </section>

      {/* SKILL TREE */}

      <section className="relative overflow-hidden bg-[#050e17] py-28">

        <div className="absolute left-1/2 top-20 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[130px]" />

        <div className="relative mx-auto max-w-[1500px] px-5 lg:px-10">

          <SectionHeading
            number="04"
            label="Skills"
            title={
              <>
                See How You
                <br />
                Can <span className="text-fuchsia-300">Grow.</span>
              </>
            }
            description="As you build better habits, new skills can unlock. Your growth gets a clear path."
          />

          <GlassFrame className="relative mt-16 min-h-[680px] overflow-hidden rounded-[34px]">

            <CornerMarks />

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.13),transparent_40%)]" />

            <svg
              className="absolute inset-0 h-full w-full"
              viewBox="0 0 1200 680"
              preserveAspectRatio="none"
              fill="none"
              aria-hidden="true"
            >

              <path
                d="M600 145 C600 230 420 220 280 330"
                stroke="rgba(103,232,249,0.55)"
                strokeWidth="2"
              />

              <path
                d="M600 145 C600 230 780 220 920 330"
                stroke="rgba(167,139,250,0.55)"
                strokeWidth="2"
              />

              <path
                d="M280 330 C300 430 370 470 430 540"
                stroke="rgba(244,114,182,0.35)"
                strokeWidth="2"
              />

              <path
                d="M920 330 C900 430 830 470 770 540"
                stroke="rgba(251,191,36,0.25)"
                strokeWidth="2"
              />

              <circle
                cx="600"
                cy="145"
                r="5"
                fill="rgba(103,232,249,1)"
              />

              <circle
                cx="280"
                cy="330"
                r="5"
                fill="rgba(103,232,249,1)"
              />

              <circle
                cx="920"
                cy="330"
                r="5"
                fill="rgba(167,139,250,1)"
              />

            </svg>

            {SKILL_DATA.map((item) => (
              <SkillNode
                key={item.title}
                item={item}
              />
            ))}

            <div className="absolute bottom-7 left-1/2 -translate-x-1/2 rounded-full border border-violet-300/20 bg-violet-500/10 px-5 py-2 text-[8px] font-bold uppercase tracking-[0.3em] text-violet-200">
              More skills unlock as you grow
            </div>

            <div className="absolute left-7 top-7">

              <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
                Your Skill Path
              </div>

              <div className="mt-1 font-mono text-[8px] text-slate-600">
                4 / 12 SKILLS
              </div>

            </div>

            <div className="absolute right-7 top-7 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-[8px] font-bold text-cyan-200">
              3 POINTS
            </div>

          </GlassFrame>

        </div>

      </section>

      {/* ACHIEVEMENTS */}

      <section className="relative bg-[#081722] py-28">

        <div className="mx-auto max-w-[1500px] px-5 lg:px-10">

          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">

            <div>

              <SectionHeading
                number="05"
                label="Achievements"
                title={
                  <>
                    Your Effort
                    <br />
                    Becomes A <span className="text-yellow-200">Win.</span>
                  </>
                }
                description="Achievements show the things you have already done. They give you milestones worth remembering."
              />

              <div className="mt-9 flex items-center gap-4">

                <div className="flex h-20 w-20 items-center justify-center rounded-full border border-yellow-300/20 bg-yellow-300/5 text-4xl">
                  🏆
                </div>

                <div>

                  <div className="font-serif text-3xl font-black">
                    08
                  </div>

                  <div className="text-[9px] uppercase tracking-widest text-slate-600">
                    Achievements unlocked
                  </div>

                </div>

              </div>

              <div className="mt-8 rounded-2xl border border-yellow-300/10 bg-yellow-300/5 p-5">

                <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-yellow-200">
                  Next milestone
                </div>

                <div className="mt-3 text-lg font-black">
                  30 Day Streak
                </div>

                <p className="mt-2 text-xs leading-6 text-slate-500">
                  Keep completing tasks for 30 days to unlock this milestone.
                </p>

                <div className="mt-5 h-2 rounded-full bg-white/5">

                  <div className="h-full w-[23%] rounded-full bg-gradient-to-r from-yellow-200 to-orange-400" />

                </div>

                <div className="mt-2 text-right font-mono text-[8px] text-yellow-200">
                  7 / 30 DAYS
                </div>

              </div>

            </div>

            <div className="grid gap-3 sm:grid-cols-2">

              {ACHIEVEMENT_DATA.map(
                (item) => (
                  <Achievement
                    key={item.title}
                    item={item}
                  />
                )
              )}

              <div className="relative overflow-hidden rounded-xl border border-dashed border-white/10 bg-white/[0.015] p-5 sm:col-span-2">

                <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-violet-500/10 blur-3xl" />

                <div className="relative flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl">
                    🔒
                  </div>

                  <div>

                    <div className="text-xs font-bold">
                      More achievements are waiting.
                    </div>

                    <div className="mt-1 text-[10px] text-slate-600">
                      Keep going to discover them.
                    </div>

                  </div>

                  <div className="ml-auto hidden text-[8px] uppercase tracking-widest text-slate-600 sm:block">
                    SECRET
                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* PROGRESS */}

      <section className="relative overflow-hidden bg-[#050e17] py-28">

        <div className="relative mx-auto max-w-[1500px] px-5 lg:px-10">

          <SectionHeading
            number="06"
            label="Your Progress"
            title={
              <>
                See The Person
                <br />
                You Are <span className="text-cyan-300">Becoming.</span>
              </>
            }
            description="Simple charts help you see whether your habits and daily actions are moving in the right direction."
          />

          <div className="mt-16 grid gap-5 lg:grid-cols-3">

            <GlassFrame className="rounded-[28px] p-6 lg:col-span-2">

              <div className="flex items-center justify-between">

                <div>

                  <div className="text-lg font-black">
                    Progress Over Time
                  </div>

                  <div className="mt-1 text-[9px] uppercase tracking-widest text-slate-600">
                    Last 30 days
                  </div>

                </div>

                <div className="flex gap-2">

                  <span className="rounded-full bg-violet-500/10 px-3 py-1.5 text-[8px] text-violet-200">
                    30 DAYS
                  </span>

                  <span className="rounded-full bg-white/5 px-3 py-1.5 text-[8px] text-slate-600">
                    90 DAYS
                  </span>

                </div>

              </div>

              <div className="mt-8 h-64">
                <MiniChart />
              </div>

              <div className="grid grid-cols-3 gap-3">

                <StatTile
                  icon="📈"
                  value="+18%"
                  label="Growth"
                  tone="green"
                />

                <StatTile
                  icon="⚔️"
                  value="48"
                  label="Tasks"
                  tone="violet"
                />

                <StatTile
                  icon="🔥"
                  value="21"
                  label="Best streak"
                  tone="gold"
                />

              </div>

            </GlassFrame>

            <GlassFrame className="rounded-[28px] p-6">

              <div className="text-lg font-black">
                Life Balance
              </div>

              <div className="mt-1 text-[9px] uppercase tracking-widest text-slate-600">
                Where your time goes
              </div>

              <div className="mt-8 flex items-center justify-center">

                <div className="h-64 w-64">
                  <RadarGraphic />
                </div>

              </div>

              <div className="grid grid-cols-2 gap-2">

                {[
                  ["Study", "28%", "🧠"],
                  ["Health", "24%", "💪"],
                  ["Career", "20%", "💼"],
                  ["People", "18%", "❤️"],
                ].map(
                  ([name, value, icon]) => (
                    <div
                      key={name}
                      className="rounded-xl border border-white/5 bg-white/[0.025] p-3"
                    >

                      <div className="flex items-center gap-2 text-xs">
                        <span>{icon}</span>
                        <span>{name}</span>
                      </div>

                      <div className="mt-2 font-mono text-xs text-cyan-200">
                        {value}
                      </div>

                    </div>
                  )
                )}

              </div>

            </GlassFrame>

          </div>

        </div>

      </section>

      {/* AI */}

      <section
        id="companion"
        className="relative overflow-hidden bg-[#07131e] py-28"
      >

        <div className="absolute left-[10%] top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-fuchsia-500/10 blur-[120px]" />

        <div className="relative mx-auto grid max-w-[1500px] items-center gap-14 px-5 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">

          <div>

            <SectionHeading
              number="07"
              label="AI Help"
              title={
                <>
                  A Smart Guide
                  <br />
                  For Your <span className="text-fuchsia-300">Day.</span>
                </>
              }
              description="Your AI helper can turn your goals into useful tasks, explain your progress and help you decide what to do next."
            />

            <div className="mt-9 grid gap-3 sm:grid-cols-2">

              {[
                [
                  "✦",
                  "Create tasks",
                  "Turn your goals into clear actions.",
                ],
                [
                  "◈",
                  "Check progress",
                  "Understand what is working.",
                ],
                [
                  "◇",
                  "Make a plan",
                  "Build a simple path forward.",
                ],
                [
                  "☼",
                  "Stay on track",
                  "Get help when motivation drops.",
                ],
              ].map(
                ([icon, title, text]) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
                  >

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-500/10 text-violet-200">
                      {icon}
                    </div>

                    <div className="mt-4 text-sm font-bold">
                      {title}
                    </div>

                    <div className="mt-1 text-[10px] leading-5 text-slate-600">
                      {text}
                    </div>

                  </div>
                )
              )}

            </div>

          </div>

          <GlassFrame className="relative overflow-hidden rounded-[32px] p-5">

            <CornerMarks />

            <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-violet-500/15 blur-[100px]" />

            <div className="relative">

              <div className="flex items-center justify-between border-b border-white/10 pb-4">

                <div className="flex items-center gap-3">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-500/10 text-2xl">
                    🤖
                  </div>

                  <div>

                    <div className="text-sm font-black">
                      AI Help
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-[9px] text-emerald-300">

                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />

                      ONLINE

                    </div>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowTerminal(
                      !showTerminal
                    )
                  }
                  className="rounded-full border border-white/10 px-3 py-1.5 text-[8px] text-slate-500"
                >
                  {showTerminal
                    ? "HIDE"
                    : "SYSTEM"}
                </button>

              </div>

              <div className="mt-6 space-y-4">

                <div className="max-w-[82%] rounded-2xl rounded-tl-sm border border-white/10 bg-white/5 p-4">

                  <div className="text-[9px] uppercase tracking-widest text-violet-300">
                    AI Help
                  </div>

                  <p className="mt-2 text-xs leading-6 text-slate-300">
                    {companionText[
                      companionMessage
                    ]}
                  </p>

                </div>

                <div className="ml-auto max-w-[70%] rounded-2xl rounded-tr-sm bg-violet-600/80 p-4">

                  <p className="text-xs leading-6">
                    What should I do today?
                  </p>

                </div>

                <div className="max-w-[90%] rounded-2xl rounded-tl-sm border border-cyan-300/10 bg-cyan-300/5 p-4">

                  <div className="text-[8px] font-bold uppercase tracking-[0.25em] text-cyan-200">
                    Suggested Task
                  </div>

                  <div className="mt-3 flex items-center gap-3">

                    <div className="text-3xl">
                      🧠
                    </div>

                    <div>

                      <div className="text-sm font-black">
                        45 Minute Focus
                      </div>

                      <div className="mt-1 text-[10px] text-slate-500">
                        Intelligence + Discipline
                      </div>

                    </div>

                  </div>

                  <div className="mt-4 flex gap-2">

                    <span className="rounded-full bg-cyan-300/10 px-3 py-1.5 font-mono text-[9px] text-cyan-200">
                      +80 XP
                    </span>

                    <span className="rounded-full bg-yellow-300/10 px-3 py-1.5 font-mono text-[9px] text-yellow-200">
                      +30 GOLD
                    </span>

                  </div>

                </div>

                {showTerminal ? (
                  <div className="rounded-xl border border-violet-300/10 bg-black/20 p-4 font-mono text-[9px] leading-6 text-slate-600">

                    <div>
                      system ............ OK
                    </div>

                    <div>
                      character ......... OK
                    </div>

                    <div>
                      tasks ............. OK
                    </div>

                    <div>
                      progress .......... OK
                    </div>

                    <div>
                      AI helper ........ READY
                    </div>

                  </div>
                ) : null}

              </div>

              <div className="mt-5 flex gap-2">

                <button
                  type="button"
                  onClick={() =>
                    setCompanionMessage(
                      (value) =>
                        (value + 1) % 3
                    )
                  }
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-left text-[10px] text-slate-500"
                >
                  Ask your AI helper...
                </button>

                <button
                  type="button"
                  onClick={() =>
                    setCompanionMessage(
                      (value) =>
                        (value + 1) % 3
                    )
                  }
                  className="rounded-xl bg-violet-600 px-5 text-lg"
                >
                  →
                </button>

              </div>

            </div>

          </GlassFrame>

        </div>

      </section>

      {/* JOURNEY */}

      <section className="relative overflow-hidden bg-[#06111b] py-28">

        <div className="mx-auto max-w-[1500px] px-5 lg:px-10">

          <SectionHeading
            number="08"
            label="Your Journey"
            title={
              <>
                Small Steps.
                <br />
                <span className="text-violet-300">
                  Big Change.
                </span>
              </>
            }
            description="You do not need to change everything in one day. Keep taking the next useful step."
          />

          <div className="relative mt-20">

            <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-violet-300/30 to-transparent lg:block" />

            <div className="grid gap-8 lg:grid-cols-4">

              {TIMELINE_DATA.map(
                (item, index) => (
                  <div
                    key={item.day}
                    className="relative"
                  >

                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-violet-300/30 bg-[#06111b] font-mono text-xs font-bold text-violet-200">
                      {item.number}
                    </div>

                    <div className="mt-7">

                      <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-200">
                        {item.day}
                      </div>

                      <h3 className="mt-3 font-serif text-2xl font-black">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-xs leading-6 text-slate-500">
                        {item.description}
                      </p>

                    </div>

                    {index <
                    TIMELINE_DATA.length -
                      1 ? (
                      <div className="mt-8 h-px w-20 bg-violet-300/20 lg:hidden" />
                    ) : null}

                  </div>
                )
              )}

            </div>

          </div>

        </div>

      </section>

      {/* DAILY LOOP */}

      <section className="relative overflow-hidden bg-[#081722] py-28">

        <div className="absolute right-[10%] top-[20%] h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

        <div className="relative mx-auto max-w-[1500px] px-5 lg:px-10">

          <div className="grid gap-8 lg:grid-cols-3">

            <GlassFrame className="rounded-[28px] p-7">

              <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-yellow-200">
                Morning
              </div>

              <div className="mt-7 text-5xl">
                🌅
              </div>

              <h3 className="mt-6 font-serif text-3xl font-black">
                Start
              </h3>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                Finish a small task and start your day with progress.
              </p>

              <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">

                <span className="text-[8px] uppercase tracking-widest text-slate-600">
                  Reward
                </span>

                <span className="font-mono text-xs text-cyan-200">
                  +30 XP
                </span>

              </div>

            </GlassFrame>

            <GlassFrame className="rounded-[28px] border-violet-300/20 bg-violet-500/5 p-7">

              <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-200">
                Day
              </div>

              <div className="mt-7 text-5xl">
                ⚔️
              </div>

              <h3 className="mt-6 font-serif text-3xl font-black">
                Complete
              </h3>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                Focus on one useful action and turn effort into progress.
              </p>

              <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">

                <span className="text-[8px] uppercase tracking-widest text-slate-600">
                  Reward
                </span>

                <span className="font-mono text-xs text-violet-200">
                  +80 XP
                </span>

              </div>

            </GlassFrame>

            <GlassFrame className="rounded-[28px] p-7">

              <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-200">
                Evening
              </div>

              <div className="mt-7 text-5xl">
                🌙
              </div>

              <h3 className="mt-6 font-serif text-3xl font-black">
                Review
              </h3>

              <p className="mt-3 text-xs leading-6 text-slate-500">
                See what you finished and decide what tomorrow should look like.
              </p>

              <div className="mt-7 flex items-center justify-between border-t border-white/10 pt-5">

                <span className="text-[8px] uppercase tracking-widest text-slate-600">
                  Result
                </span>

                <span className="font-mono text-xs text-emerald-200">
                  +1 DAY
                </span>

              </div>

            </GlassFrame>

          </div>

        </div>

      </section>

      {/* SIMPLE MESSAGE */}

      <section className="relative overflow-hidden bg-[#050e17] py-28">

        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/5" />

        <div className="relative mx-auto max-w-5xl px-5 text-center lg:px-10">

          <div className="text-6xl text-violet-300/60">
            “
          </div>

          <blockquote className="mt-5 font-serif text-4xl font-black leading-tight text-white md:text-6xl">

            The hardest person
            <span className="text-fuchsia-300">
              {" "}to beat
            </span>

            <br />

            is the version of yourself
            <span className="text-cyan-300">
              {" "}you want to improve.
            </span>

          </blockquote>

          <div className="mx-auto mt-9 h-px w-24 bg-gradient-to-r from-transparent via-violet-300/60 to-transparent" />

          <div className="mt-5 text-[9px] uppercase tracking-[0.5em] text-slate-600">
            EVOQUEST IDEA
          </div>

        </div>

      </section>

      {/* FINAL CTA */}

      <section className="relative min-h-[760px] overflow-hidden bg-[#071722]">

        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(251,191,36,0.13),transparent_24%),radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.13),transparent_25%)]" />

        <div className="absolute left-0 right-0 top-[34%] h-1 bg-gradient-to-r from-transparent via-orange-200/20 to-transparent blur-sm" />

        <div className="absolute bottom-0 left-0 right-0 h-[60%]">

          <div className="absolute bottom-0 left-[-15%] h-full w-[70%] bg-[#10293a] [clip-path:polygon(0_100%,35%_38%,50%_0,65%_42%,100%_100%)]" />

          <div className="absolute bottom-0 right-[-15%] h-full w-[70%] bg-[#0b2332] [clip-path:polygon(0_100%,35%_35%,52%_5%,67%_45%,100%_100%)]" />

          <div className="absolute bottom-0 left-[20%] h-[75%] w-[60%] bg-[#091b29] [clip-path:polygon(0_100%,50%_0,100%_100%)]" />

        </div>

        <div className="absolute left-1/2 top-[22%] h-52 w-52 -translate-x-1/2 rounded-full bg-orange-200/30 blur-[50px]" />

        <div className="absolute left-1/2 top-[24%] h-28 w-28 -translate-x-1/2 rounded-full bg-orange-100/80 shadow-[0_0_100px_rgba(253,186,116,0.45)]" />

        <div className="absolute bottom-[10%] left-[13%] hidden text-[130px] md:block">
          🧙
        </div>

        <div className="absolute bottom-[14%] right-[14%] hidden text-6xl opacity-60 md:block">
          🏰
        </div>

        <div className="relative z-20 mx-auto max-w-4xl px-5 py-48 text-center">

          <SectionEyebrow
            number="11"
            label="Start Here"
          />

          <h2 className="mt-7 font-serif text-5xl font-black leading-[0.92] md:text-7xl lg:text-8xl">

            One Small Step

            <span className="block bg-gradient-to-r from-orange-100 via-fuchsia-200 to-violet-300 bg-clip-text text-transparent">
              Can Start Everything.
            </span>

          </h2>

          <p className="mx-auto mt-7 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
            You do not need a perfect plan. Start with one task.
            Create your character, choose your first goal and begin.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">

            <Link
              to="/register"
              className="rounded-full border border-violet-200/50 bg-violet-500/25 px-8 py-4 text-xs font-black uppercase tracking-widest shadow-2xl shadow-violet-500/20 backdrop-blur-md transition hover:-translate-y-1 hover:bg-violet-500/35"
            >
              Create Your Character →
            </Link>

            <Link
              to="/login"
              className="rounded-full border border-white/15 bg-white/5 px-8 py-4 text-xs font-bold uppercase tracking-widest text-slate-200 backdrop-blur-md transition hover:bg-white/10"
            >
              Login
            </Link>

          </div>

          <div className="mt-12 flex justify-center">

            <div className="flex items-center gap-3 rounded-full border border-white/10 bg-black/20 px-5 py-3 backdrop-blur-md">

              <span className="text-sm">
                ✦
              </span>

              <span className="text-[8px] uppercase tracking-[0.4em] text-slate-500">
                Level Up Your Life
              </span>

              <span className="text-sm">
                ✦
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* FOOTER */}

      <footer className="border-t border-white/10 bg-[#03090f]">

        <div className="mx-auto max-w-[1500px] px-5 py-12 lg:px-10">

          <div className="grid gap-10 md:grid-cols-4">

            <div className="md:col-span-2">

              <Link
                to="/"
                className="inline-flex items-center gap-3"
              >

                <div className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-300/30 bg-violet-500/10 text-xl">
                  ◈
                </div>

                <div>

                  <div className="text-lg font-black">
                    Evo<span className="text-fuchsia-400">
                      Quest
                    </span>
                  </div>

                  <div className="text-[8px] uppercase tracking-[0.4em] text-slate-600">
                    Level Up Your Life
                  </div>

                </div>

              </Link>

              <p className="mt-6 max-w-md text-xs leading-6 text-slate-600">
                A real-world game that helps you turn goals into actions,
                actions into progress and progress into a stronger you.
              </p>

            </div>

            <div>

              <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">
                Explore
              </div>

              <div className="mt-5 space-y-3 text-xs text-slate-600">

                <a
                  href="#world"
                  className="block transition hover:text-white"
                >
                  World
                </a>

                <a
                  href="#quests"
                  className="block transition hover:text-white"
                >
                  Tasks
                </a>

                <a
                  href="#evolution"
                  className="block transition hover:text-white"
                >
                  Character
                </a>

                <a
                  href="#companion"
                  className="block transition hover:text-white"
                >
                  AI Help
                </a>

              </div>

            </div>

            <div>

              <div className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">
                Start
              </div>

              <div className="mt-5 space-y-3 text-xs text-slate-600">

                <Link
                  to="/register"
                  className="block transition hover:text-white"
                >
                  Create Character
                </Link>

                <Link
                  to="/login"
                  className="block transition hover:text-white"
                >
                  Login
                </Link>

              </div>

            </div>

          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-white/5 pt-6 text-[9px] uppercase tracking-widest text-slate-700 sm:flex-row sm:items-center sm:justify-between">

            <span>
              © EvoQuest • Build your character. Shape your world.
            </span>

            <span>
              Your life. Your quest. Your growth.
            </span>

          </div>

        </div>

      </footer>

    </main>
  );
}