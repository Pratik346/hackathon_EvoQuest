import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(form);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#030308] text-white">

      {/* =========================================================
          BACKGROUND
      ========================================================= */}

      <div className="pointer-events-none absolute inset-0">

        {/* Purple glow */}
        <div className="absolute left-[-180px] top-[-180px] h-[600px] w-[600px] rounded-full bg-purple-700/20 blur-[150px]" />

        {/* Pink glow */}
        <div className="absolute bottom-[-200px] right-[-150px] h-[600px] w-[600px] rounded-full bg-fuchsia-600/15 blur-[150px]" />

        {/* Center glow */}
        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[130px]" />

        {/* Small cyan glow */}
        <div className="absolute right-[20%] top-[15%] h-[180px] w-[180px] rounded-full bg-cyan-500/5 blur-[90px]" />
      </div>

      {/* =========================================================
          RPG GRID
      ========================================================= */}

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* =========================================================
          FLOATING PARTICLES
      ========================================================= */}

      <div className="pointer-events-none absolute left-[8%] top-[20%] h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,1)]" />

      <div className="pointer-events-none absolute left-[35%] top-[12%] h-1 w-1 rounded-full bg-fuchsia-400 shadow-[0_0_12px_rgba(232,121,249,1)]" />

      <div className="pointer-events-none absolute bottom-[20%] left-[15%] h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]" />

      <div className="pointer-events-none absolute right-[12%] top-[30%] h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,1)]" />

      {/* =========================================================
          MAIN
      ========================================================= */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">

        <div className="grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.15fr_0.85fr]">

          {/* =====================================================
              LEFT SIDE — EVOQUEST HERO
          ===================================================== */}

          <div className="relative hidden lg:block">

            {/* Anime/RPG character glow */}
            <div className="pointer-events-none absolute right-[5%] top-[8%] h-[360px] w-[360px] rounded-full bg-purple-600/10 blur-[90px]" />

            {/* Character emblem */}
            <div className="relative mb-8 flex items-center gap-5">

              <div className="relative flex h-20 w-20 items-center justify-center rounded-3xl border border-purple-400/40 bg-gradient-to-br from-purple-600/20 via-fuchsia-500/10 to-transparent text-5xl shadow-[0_0_50px_rgba(168,85,247,0.3)]">

                ⚔️

                <div className="absolute inset-0 rounded-3xl border border-purple-400/10" />
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-[0.45em] text-purple-400">
                  Welcome to
                </p>

                {/* BIG PROJECT NAME */}
                <h2 className="mt-1 text-6xl font-black tracking-[-0.04em] xl:text-7xl">

                  <span className="bg-gradient-to-r from-white via-purple-200 to-fuchsia-400 bg-clip-text text-transparent">
                    EvoQuest
                  </span>

                </h2>

                <p className="mt-1 text-sm font-semibold uppercase tracking-[0.35em] text-gray-500">
                  Life RPG System
                </p>
              </div>

            </div>

            {/* Main Heading */}
            <h1 className="max-w-3xl text-5xl font-black leading-[1.05] tracking-tight xl:text-6xl">

              Your life.

              <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                Your quest.
              </span>

              <span className="block text-white">
                Your evolution.
              </span>

            </h1>

            {/* Description */}
            <p className="mt-7 max-w-2xl text-lg leading-8 text-gray-400">
              Turn your real-world goals into epic quests. Complete missions,
              earn XP, unlock achievements, strengthen your attributes and
              evolve into the strongest version of yourself.
            </p>

            {/* =================================================
                ANIME RPG CHARACTER AREA
            ================================================= */}

            <div className="relative mt-10 flex max-w-2xl items-center">

              {/* Character circle */}
              <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">

                {/* Outer ring */}
                <div className="absolute inset-0 rounded-full border border-purple-500/20" />

                <div className="absolute inset-3 rounded-full border border-fuchsia-500/20" />

                <div className="absolute inset-6 rounded-full bg-gradient-to-br from-purple-600/20 to-fuchsia-600/5 shadow-[0_0_60px_rgba(168,85,247,0.25)]" />

                {/* Anime-style warrior */}
                <div className="relative z-10 text-7xl drop-shadow-[0_0_20px_rgba(168,85,247,0.8)]">
                  🧙‍♂️
                </div>

              </div>

              {/* Character information */}
              <div className="ml-7">

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-purple-400">
                  Your Journey Begins
                </p>

                <h3 className="mt-2 text-2xl font-black">
                  Become Your Hero
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-gray-500">
                  Every small action becomes progress. Every completed quest
                  makes your character stronger.
                </p>

              </div>

            </div>

            {/* =================================================
                RPG STATS
            ================================================= */}

            <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">

              {/* Quest */}
              <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-purple-500/[0.05]">

                <div className="flex items-center justify-between">

                  <span className="text-3xl">
                    ⚔️
                  </span>

                  <span className="text-xs font-bold text-purple-400">
                    +XP
                  </span>

                </div>

                <p className="mt-4 text-sm font-bold">
                  Quests
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Real-world missions
                </p>

              </div>

              {/* XP */}
              <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-fuchsia-500/30 hover:bg-fuchsia-500/[0.05]">

                <div className="flex items-center justify-between">

                  <span className="text-3xl">
                    ⚡
                  </span>

                  <span className="text-xs font-bold text-fuchsia-400">
                    LVL
                  </span>

                </div>

                <p className="mt-4 text-sm font-bold">
                  XP & Levels
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Grow stronger
                </p>

              </div>

              {/* Rewards */}
              <div className="group rounded-2xl border border-white/10 bg-white/[0.035] p-5 backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-pink-500/30 hover:bg-pink-500/[0.05]">

                <div className="flex items-center justify-between">

                  <span className="text-3xl">
                    🏆
                  </span>

                  <span className="text-xs font-bold text-pink-400">
                    GOLD
                  </span>

                </div>

                <p className="mt-4 text-sm font-bold">
                  Rewards
                </p>

                <p className="mt-1 text-xs text-gray-500">
                  Unlock your potential
                </p>

              </div>

            </div>

            {/* Status */}
            <div className="mt-7 flex items-center gap-3 text-sm text-gray-500">

              <span className="relative flex h-2.5 w-2.5">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.9)]" />

              </span>

              <span>
                Your journey is waiting.
              </span>

            </div>

          </div>

          {/* =====================================================
              LOGIN CARD
          ===================================================== */}

          <div className="w-full max-w-md justify-self-center">

            {/* Outer glass border */}
            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] p-1.5 shadow-2xl shadow-purple-950/40 backdrop-blur-2xl">

              {/* Card top glow */}
              <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[90px]" />

              <form
                onSubmit={handleSubmit}
                className="relative rounded-[24px] border border-white/5 bg-[#090910]/95 p-7 sm:p-9"
              >

                {/* =================================================
                    MOBILE EVOQUEST BRAND
                ================================================= */}

                <div className="mb-7 flex items-center justify-center gap-3 lg:hidden">

                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-purple-500/30 bg-purple-500/10 text-xl">
                    ⚔️
                  </div>

                  <div className="text-left">

                    <p className="text-xl font-black bg-gradient-to-r from-purple-300 to-fuchsia-400 bg-clip-text text-transparent">
                      EvoQuest
                    </p>

                    <p className="text-[9px] uppercase tracking-[0.25em] text-gray-600">
                      Level Up Your Life
                    </p>

                  </div>

                </div>

                {/* =================================================
                    LOGIN HEADER
                ================================================= */}

                <div className="mb-8 text-center">

                  <div className="relative mx-auto mb-5 flex h-20 w-20 items-center justify-center">

                    <div className="absolute inset-0 rounded-2xl bg-purple-600/10 blur-xl" />

                    <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-600/20 via-fuchsia-600/10 to-transparent text-4xl shadow-[0_0_40px_rgba(168,85,247,0.25)]">
                      ⚔️
                    </div>

                  </div>

                  <p className="text-xs font-bold uppercase tracking-[0.35em] text-purple-400">
                    EVOQUEST
                  </p>

                  <h2 className="mt-2 text-3xl font-black tracking-tight">
                    Welcome Back
                  </h2>

                  <p className="mt-2 text-sm text-gray-500">
                    Continue your journey and keep evolving.
                  </p>

                </div>

                {/* =================================================
                    ERROR
                ================================================= */}

                {error && (
                  <div className="mb-5 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3">

                    <p className="text-sm text-red-400">
                      ⚠️ {error}
                    </p>

                  </div>
                )}

                {/* =================================================
                    EMAIL
                ================================================= */}

                <div className="mb-5">

                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-300"
                  >
                    Email
                  </label>

                  <div className="relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      ✉
                    </span>

                    <input
                      id="email"
                      type="email"
                      placeholder="hero@example.com"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.035] py-3.5 pl-11 pr-4 text-white outline-none transition duration-300 placeholder:text-gray-600 focus:border-purple-500/60 focus:bg-purple-500/[0.04] focus:ring-4 focus:ring-purple-500/10"
                      value={form.email}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          email: e.target.value,
                        })
                      }
                      required
                    />

                  </div>

                </div>

                {/* =================================================
                    PASSWORD
                ================================================= */}

                <div className="mb-6">

                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-300"
                  >
                    Password
                  </label>

                  <div className="relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      🔒
                    </span>

                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.035] py-3.5 pl-11 pr-4 text-white outline-none transition duration-300 placeholder:text-gray-600 focus:border-purple-500/60 focus:bg-purple-500/[0.04] focus:ring-4 focus:ring-purple-500/10"
                      value={form.password}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          password: e.target.value,
                        })
                      }
                      required
                    />

                  </div>

                </div>

                {/* =================================================
                    LOGIN BUTTON
                ================================================= */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 py-4 font-bold shadow-lg shadow-purple-900/30 transition duration-300 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <span className="relative z-10">

                    {loading
                      ? "⚡ Entering EvoQuest..."
                      : "⚔️ Enter EvoQuest"}

                  </span>

                  {!loading && (
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  )}

                </button>

                {/* =================================================
                    REGISTER
                ================================================= */}

                <div className="mt-7 text-center">

                  <p className="text-sm text-gray-500">
                    New adventurer?
                  </p>

                  <Link
                    to="/register"
                    className="mt-1 inline-block font-semibold text-purple-400 transition duration-300 hover:text-fuchsia-300"
                  >
                    Create your character →
                  </Link>

                </div>

                {/* =================================================
                    SECURITY
                ================================================= */}

                <div className="mt-7 flex items-center justify-center gap-2 border-t border-white/5 pt-5 text-xs text-gray-600">

                  <span>
                    🛡️
                  </span>

                  <span>
                    Your progress is protected
                  </span>

                </div>

              </form>

            </div>

            {/* Bottom tagline */}
            <p className="mt-5 text-center text-xs tracking-wide text-gray-600">
              Every quest completed makes you stronger.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}