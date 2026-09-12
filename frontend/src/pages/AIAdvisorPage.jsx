import { useState } from "react";
import { Link } from "react-router-dom";
import AIAdvisor from "../components/ai/AIAdvisor";

const AI_FEATURES = [
  {
    icon: "🧭",
    title: "Direction",
    text: "Turn your current goals into a clear next step.",
  },
  {
    icon: "⚔️",
    title: "Mission Ideas",
    text: "Generate practical missions from everyday goals.",
  },
  {
    icon: "📈",
    title: "Progress Insight",
    text: "Understand patterns in your journey and momentum.",
  },
  {
    icon: "🎯",
    title: "Focus",
    text: "Choose what deserves your attention today.",
  },
];

const QUICK_PROMPTS = [
  "What should I focus on today?",
  "Create a difficult mission for me.",
  "How can I improve my discipline?",
  "Help me plan my next week.",
];

const GUIDE_STATES = [
  {
    title: "YOUR NEXT MOVE",
    text: "Choose one meaningful action instead of trying to change everything at once.",
    icon: "🧭",
  },
  {
    title: "YOUR CURRENT EDGE",
    text: "Consistency compounds. Protect your momentum before chasing something new.",
    icon: "⚡",
  },
  {
    title: "YOUR CHALLENGE",
    text: "Take one uncomfortable but realistic step toward your most important goal.",
    icon: "⚔️",
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

function FeatureCard({ icon, title, text }) {
  return (
    <div className="group rounded-2xl border border-white/10 bg-white/[0.02] p-5 transition duration-300 hover:-translate-y-1 hover:border-cyan-300/20 hover:bg-cyan-300/[0.03]">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/10 bg-cyan-300/5 text-xl">
        {icon}
      </div>

      <h3 className="mt-4 text-sm font-black">
        {title}
      </h3>

      <p className="mt-2 text-[10px] leading-5 text-slate-600">
        {text}
      </p>
    </div>
  );
}

function QuickPrompt({
  text,
  onClick,
}) {
  return (
    <button
      type="button"
      onClick={() => onClick(text)}
      className="w-full rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 text-left text-xs text-slate-400 transition hover:border-violet-300/20 hover:bg-violet-300/5 hover:text-white"
    >
      <span className="mr-2 text-violet-300">
        ✦
      </span>

      {text}
    </button>
  );
}

export default function AIAdvisorPage() {
  const [activeGuide, setActiveGuide] = useState(0);
  const [prompt, setPrompt] = useState("");

  const guide = GUIDE_STATES[activeGuide];

  const handlePrompt = (value) => {
    setPrompt(value);
  };

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#06111b] text-white">

      {/* =====================================================
          ATMOSPHERE
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0">

        <div className="absolute left-[-180px] top-[-150px] h-[600px] w-[600px] rounded-full bg-violet-700/10 blur-[150px]" />

        <div className="absolute right-[-180px] top-[20%] h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[150px]" />

        <div className="absolute bottom-[-200px] left-[30%] h-[600px] w-[600px] rounded-full bg-fuchsia-600/10 blur-[150px]" />

        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:30px_30px]" />

      </div>

      {/* =====================================================
          MAIN
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

                Evo Guide

              </div>

              <h1 className="mt-4 font-serif text-5xl font-black leading-[0.92] sm:text-6xl md:text-7xl">

                Ask Better.
                <span className="block bg-gradient-to-r from-cyan-200 via-violet-300 to-fuchsia-300 bg-clip-text text-transparent">
                  Move Forward.
                </span>

              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                Your Evo Guide helps transform goals into practical missions,
                analyze your progression and give you a clearer next move.
              </p>

            </div>

            <div className="flex items-center gap-3">

              <Link
                to="/quests"
                className="rounded-xl border border-white/10 bg-white/[0.025] px-5 py-3 text-xs font-bold text-slate-300 transition hover:bg-white/[0.06]"
              >
                ⚔️ Missions
              </Link>

              <Link
                to="/dashboard"
                className="rounded-xl border border-cyan-300/20 bg-cyan-300/5 px-5 py-3 text-xs font-bold text-cyan-200 transition hover:bg-cyan-300/10"
              >
                ← Command Center
              </Link>

            </div>

          </div>

        </section>

        {/* ===================================================
            HERO GUIDE PANEL
        ==================================================== */}

        <section className="relative mb-6 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.025]">

          <CornerFrame />

          <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-violet-500/10 blur-[120px]" />

          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="relative grid lg:grid-cols-[0.72fr_1.28fr]">

            {/* AI character */}
            <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden border-b border-white/5 lg:border-b-0 lg:border-r">

              <div className="absolute h-72 w-72 rounded-full border border-cyan-300/10" />

              <div className="absolute h-56 w-56 rounded-full border border-violet-300/10 border-dashed" />

              <div className="absolute h-44 w-44 rounded-full bg-cyan-300/10 blur-[70px]" />

              <div className="relative z-10 text-center">

                <div className="text-[130px] drop-shadow-[0_25px_45px_rgba(0,0,0,0.8)]">
                  🤖
                </div>

                <div className="mt-3 font-serif text-2xl font-black">
                  Evo Guide
                </div>

                <div className="mt-2 flex items-center justify-center gap-2 text-[8px] uppercase tracking-[0.4em] text-emerald-200">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                  Online
                </div>

              </div>

              <div className="absolute left-7 top-7">

                <div className="text-[8px] uppercase tracking-widest text-slate-700">
                  Guide Core
                </div>

                <div className="mt-1 font-mono text-[8px] text-cyan-200">
                  AI-01
                </div>

              </div>

              <div className="absolute bottom-7 right-7 rounded-xl border border-cyan-300/10 bg-cyan-300/5 px-4 py-3">

                <div className="text-[7px] uppercase tracking-widest text-slate-700">
                  State
                </div>

                <div className="mt-1 text-xs font-bold text-cyan-200">
                  Ready
                </div>

              </div>

            </div>

            {/* Main advisor */}
            <div className="p-7 md:p-9">

              <div className="flex items-start justify-between gap-5">

                <div>

                  <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
                    Personal Guidance
                  </div>

                  <h2 className="mt-2 font-serif text-3xl font-black">
                    Your next move is closer than it looks.
                  </h2>

                  <p className="mt-3 max-w-2xl text-xs leading-6 text-slate-600">
                    Evo Guide combines your goals and character progression
                    to help you make your next decision more actionable.
                  </p>

                </div>

                <div className="hidden rounded-2xl border border-cyan-300/10 bg-cyan-300/5 px-4 py-3 sm:block">

                  <div className="text-[7px] uppercase tracking-widest text-slate-700">
                    Mode
                  </div>

                  <div className="mt-1 text-xs font-bold text-cyan-200">
                    ADAPTIVE
                  </div>

                </div>

              </div>

              {/* Guide insight */}
              <div className="mt-8 rounded-2xl border border-violet-300/10 bg-violet-300/5 p-5">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-black/20 text-xl">
                    {guide.icon}
                  </div>

                  <div className="flex-1">

                    <div className="text-[8px] font-bold uppercase tracking-[0.3em] text-violet-200">
                      {guide.title}
                    </div>

                    <p className="mt-2 text-sm leading-6 text-slate-300">
                      {guide.text}
                    </p>

                  </div>

                </div>

              </div>

              {/* Guide navigation */}
              <div className="mt-5 grid grid-cols-3 gap-2">

                {GUIDE_STATES.map((item, index) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setActiveGuide(index)}
                    className={`rounded-xl border px-3 py-3 text-left transition ${
                      activeGuide === index
                        ? "border-violet-300/30 bg-violet-500/10"
                        : "border-white/5 bg-white/[0.02]"
                    }`}
                  >

                    <div className="text-lg">
                      {item.icon}
                    </div>

                    <div className="mt-2 text-[8px] font-bold uppercase tracking-widest text-slate-500">
                      {item.title}
                    </div>

                  </button>
                ))}

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            MAIN AI WORKSPACE
        ==================================================== */}

        <section className="grid gap-6 xl:grid-cols-[1.25fr_0.75fr]">

          {/* Chat */}
          <Panel className="min-h-[640px] p-5 md:p-7">

            <div className="flex items-center justify-between border-b border-white/10 pb-5">

              <div className="flex items-center gap-4">

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-300/20 bg-violet-500/10 text-2xl">
                  🤖
                </div>

                <div>

                  <div className="text-sm font-black">
                    Evo Guide
                  </div>

                  <div className="mt-1 flex items-center gap-2 text-[8px] uppercase tracking-widest text-emerald-300">
                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />
                    Personal guidance active
                  </div>

                </div>

              </div>

              <div className="font-mono text-[8px] text-slate-700">
                SESSION ACTIVE
              </div>

            </div>

           <div className="mt-6">
  <AIAdvisor prompt={prompt} />
</div>

            {prompt ? (
              <div className="mt-5 rounded-xl border border-violet-300/10 bg-violet-300/5 p-4">

                <div className="text-[8px] uppercase tracking-widest text-slate-700">
                  Selected prompt
                </div>

                <div className="mt-2 text-xs text-violet-200">
                  {prompt}
                </div>

              </div>
            ) : null}

          </Panel>

          {/* Side panel */}
          <div className="space-y-6">

            {/* Quick prompts */}
            <Panel className="p-6">

              <div className="flex items-end justify-between">

                <div>

                  <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-200">
                    Quick Prompts
                  </div>

                  <h2 className="mt-2 font-serif text-2xl font-black">
                    Start With One
                  </h2>

                </div>

                <span className="text-xl">
                  ✦
                </span>

              </div>

              <div className="mt-6 space-y-2">

                {QUICK_PROMPTS.map((item) => (
                  <QuickPrompt
                    key={item}
                    text={item}
                    onClick={handlePrompt}
                  />
                ))}

              </div>

            </Panel>

            {/* AI abilities */}
            <Panel className="p-6">

              <div>

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
                  Evo Guide Abilities
                </div>

                <h2 className="mt-2 font-serif text-2xl font-black">
                  More Than A Chatbot
                </h2>

              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">

                {AI_FEATURES.map((feature) => (
                  <FeatureCard
                    key={feature.title}
                    icon={feature.icon}
                    title={feature.title}
                    text={feature.text}
                  />
                ))}

              </div>

            </Panel>

          </div>

        </section>

        {/* ===================================================
            ADVISOR EXAMPLE
        ==================================================== */}

        <section className="mt-6">

          <Panel className="p-6 md:p-7">

            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

              <div>

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-fuchsia-300">
                  Recommendation Preview
                </div>

                <h2 className="mt-2 font-serif text-2xl font-black">
                  What An Evo Guide Session Can Produce
                </h2>

              </div>

              <div className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[8px] uppercase tracking-widest text-slate-600">
                Example insight
              </div>

            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">

              <div className="rounded-2xl border border-cyan-300/10 bg-cyan-300/5 p-5">

                <div className="flex items-center justify-between">

                  <div className="text-2xl">
                    🧠
                  </div>

                  <span className="font-mono text-[8px] text-cyan-200">
                    +80 XP
                  </span>

                </div>

                <h3 className="mt-5 text-lg font-black">
                  Deep Work
                </h3>

                <p className="mt-2 text-[10px] leading-5 text-slate-600">
                  A focused 45-minute session designed to improve
                  Intelligence and Discipline.
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <span className="text-[8px] uppercase tracking-widest text-slate-700">
                    Suggested
                  </span>

                  <span className="text-[9px] text-cyan-200">
                    Intelligence
                  </span>

                </div>

              </div>

              <div className="rounded-2xl border border-violet-300/10 bg-violet-300/5 p-5">

                <div className="flex items-center justify-between">

                  <div className="text-2xl">
                    🎯
                  </div>

                  <span className="font-mono text-[8px] text-violet-200">
                    +60 XP
                  </span>

                </div>

                <h3 className="mt-5 text-lg font-black">
                  Focus Ritual
                </h3>

                <p className="mt-2 text-[10px] leading-5 text-slate-600">
                  Remove distractions and finish one meaningful task
                  before switching context.
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <span className="text-[8px] uppercase tracking-widest text-slate-700">
                    Suggested
                  </span>

                  <span className="text-[9px] text-violet-200">
                    Discipline
                  </span>

                </div>

              </div>

              <div className="rounded-2xl border border-fuchsia-300/10 bg-fuchsia-300/5 p-5">

                <div className="flex items-center justify-between">

                  <div className="text-2xl">
                    📖
                  </div>

                  <span className="font-mono text-[8px] text-fuchsia-200">
                    +50 XP
                  </span>

                </div>

                <h3 className="mt-5 text-lg font-black">
                  Knowledge Run
                </h3>

                <p className="mt-2 text-[10px] leading-5 text-slate-600">
                  Read, learn and capture one useful idea you can apply
                  tomorrow.
                </p>

                <div className="mt-5 flex items-center justify-between">

                  <span className="text-[8px] uppercase tracking-widest text-slate-700">
                    Suggested
                  </span>

                  <span className="text-[9px] text-fuchsia-200">
                    Intelligence
                  </span>

                </div>

              </div>

            </div>

          </Panel>

        </section>

        {/* ===================================================
            CONNECTION PANEL
        ==================================================== */}

        <section className="mt-6">

          <Panel className="relative overflow-hidden p-7">

            <CornerFrame />

            <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[100px]" />

            <div className="relative text-center">

              <div className="text-[9px] font-bold uppercase tracking-[0.45em] text-violet-300">
                EvoQuest Intelligence Loop
              </div>

              <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-black leading-tight md:text-5xl">
                Your goals become missions.
                <span className="block text-cyan-200">
                  Your progress informs the next move.
                </span>
              </h2>

              <div className="mx-auto mt-10 grid max-w-4xl gap-3 md:grid-cols-4">

                {[
                  ["01", "Goals", "What matters to you"],
                  ["02", "Missions", "What you can do now"],
                  ["03", "Progress", "What your actions change"],
                  ["04", "Guidance", "What to do next"],
                ].map(([number, title, text], index) => (
                  <div
                    key={number}
                    className="relative rounded-2xl border border-white/10 bg-white/[0.025] p-5"
                  >

                    {index < 3 ? (
                      <div className="absolute left-full top-1/2 hidden h-px w-3 bg-violet-300/20 md:block" />
                    ) : null}

                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full border border-violet-300/20 bg-violet-500/10 font-mono text-[9px] text-violet-200">
                      {number}
                    </div>

                    <div className="mt-4 text-sm font-black">
                      {title}
                    </div>

                    <div className="mt-2 text-[9px] leading-5 text-slate-600">
                      {text}
                    </div>

                  </div>
                ))}

              </div>

              <Link
                to="/quests"
                className="mt-10 inline-flex rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-7 py-4 text-xs font-black uppercase tracking-widest shadow-xl shadow-violet-500/20 transition hover:-translate-y-0.5"
              >
                ⚔️ Turn Advice Into A Mission →
              </Link>

            </div>

          </Panel>

        </section>

        {/* ===================================================
            FOOTER
        ==================================================== */}

        <footer className="mt-8 flex flex-col justify-between gap-3 border-t border-white/5 pt-6 text-[8px] uppercase tracking-widest text-slate-700 sm:flex-row">

          <span>
            EvoQuest • Evo Guide
          </span>

          <span>
            Your next move starts here.
          </span>

        </footer>

      </div>

    </main>
  );
}