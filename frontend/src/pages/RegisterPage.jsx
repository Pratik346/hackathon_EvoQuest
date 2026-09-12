import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function RegisterPage() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);


const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");

  if (form.password.length < 8) {
    setError("Password must be at least 8 characters long.");
    return;
  }

  setLoading(true);

  try {
    await register(form);
    navigate("/dashboard");
  } catch (err) {
    setError(err.message || "Registration failed");
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

        <div className="absolute left-[-180px] top-[-180px] h-[600px] w-[600px] rounded-full bg-purple-700/20 blur-[150px]" />

        <div className="absolute bottom-[-200px] right-[-150px] h-[600px] w-[600px] rounded-full bg-fuchsia-600/15 blur-[150px]" />

        <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-[130px]" />

        <div className="absolute right-[20%] top-[15%] h-[180px] w-[180px] rounded-full bg-cyan-500/5 blur-[90px]" />
      </div>

      {/* =========================================================
          GRID
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
          PARTICLES
      ========================================================= */}

      <div className="pointer-events-none absolute left-[8%] top-[20%] h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,1)]" />

      <div className="pointer-events-none absolute left-[35%] top-[12%] h-1 w-1 rounded-full bg-fuchsia-400 shadow-[0_0_12px_rgba(232,121,249,1)]" />

      <div className="pointer-events-none absolute bottom-[20%] left-[15%] h-1 w-1 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,1)]" />

      <div className="pointer-events-none absolute right-[12%] top-[30%] h-1.5 w-1.5 rounded-full bg-purple-400 shadow-[0_0_15px_rgba(168,85,247,1)]" />

      {/* =========================================================
          MAIN
      ========================================================= */}

      <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10">

        <div className="grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">

          {/* =====================================================
              LEFT SIDE
          ===================================================== */}

          <div className="relative hidden lg:block">

            {/* Character glow */}

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-600/10 blur-[100px]" />

            {/* =================================================
                BRAND
            ================================================= */}

            <div className="mb-9 flex items-center gap-4">

              <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-purple-500/40 bg-purple-500/10 text-3xl shadow-[0_0_40px_rgba(168,85,247,0.25)]">
                ⚔️
              </div>

              <div>

                <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-white via-purple-200 to-fuchsia-400 bg-clip-text text-transparent">
                  EvoQuest
                </h1>

                <p className="mt-1 text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">
                  Level Up Your Life
                </p>

              </div>

            </div>

            {/* =================================================
                TITLE
            ================================================= */}

            <p className="text-sm font-bold uppercase tracking-[0.4em] text-purple-400">
              Character Creation
            </p>

            <h2 className="mt-4 max-w-2xl text-5xl font-black leading-[1.05] xl:text-6xl">

              Create your

              <span className="block bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                own legend.
              </span>

            </h2>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-400">
              Every hero starts at Level 1. Create your identity, begin your
              quests and evolve through real-world achievements.
            </p>

            {/* =================================================
                CHARACTER PREVIEW
            ================================================= */}

            <div className="relative mt-10 flex max-w-2xl items-center">

              {/* Character Circle */}

              <div className="relative flex h-48 w-48 shrink-0 items-center justify-center">

                {/* Outer ring */}

                <div className="absolute inset-0 rounded-full border border-purple-500/20 shadow-[0_0_50px_rgba(168,85,247,0.1)]" />

                {/* Second ring */}

                <div className="absolute inset-4 rounded-full border border-fuchsia-500/20" />

                {/* Inner circle */}

                <div className="absolute inset-9 rounded-full bg-gradient-to-br from-purple-600/25 to-fuchsia-600/5 shadow-[0_0_80px_rgba(168,85,247,0.3)]" />

                {/* Character */}

                <div className="relative z-10 text-8xl drop-shadow-[0_0_30px_rgba(168,85,247,0.8)]">
                  🧙‍♂️
                </div>

              </div>

              {/* Character Information */}

              <div className="ml-9">

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-600">
                  Starting Rank
                </p>

                {/* LIVE NAME */}

                <h3 className="mt-2 max-w-xs truncate text-3xl font-black">
                  {form.name || "Your Hero"}
                </h3>

                <div className="mt-3 flex items-center gap-2">

                  <span className="rounded-lg border border-purple-500/20 bg-purple-500/10 px-3 py-1 text-xs font-bold text-purple-400">
                    LEVEL 1
                  </span>

                  <span className="rounded-lg border border-white/10 bg-white/[0.03] px-3 py-1 text-xs text-gray-500">
                    0 XP
                  </span>

                </div>

                {/* XP BAR */}

                <div className="mt-5 w-64">

                  <div className="mb-2 flex justify-between text-[10px] font-bold uppercase tracking-wider">

                    <span className="text-gray-600">
                      Experience
                    </span>

                    <span className="text-purple-400">
                      0 / 100 XP
                    </span>

                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/5">

                    <div className="h-full w-0 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 shadow-[0_0_12px_rgba(168,85,247,0.8)]" />

                  </div>

                </div>

              </div>

            </div>

            {/* =================================================
                STARTING ATTRIBUTES
            ================================================= */}

            <div className="mt-10 max-w-2xl">

              <div className="mb-4 flex items-center justify-between">

                <p className="text-xs font-bold uppercase tracking-[0.3em] text-gray-600">
                  Starting Attributes
                </p>

                <span className="text-xs text-gray-600">
                  Level 1
                </span>

              </div>

              <div className="grid grid-cols-2 gap-3">

                {/* INTELLIGENCE */}

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <span className="text-2xl">
                        🧠
                      </span>

                      <div>

                        <p className="text-sm font-bold">
                          Intelligence
                        </p>

                        <p className="text-[10px] uppercase tracking-wider text-gray-600">
                          INT
                        </p>

                      </div>

                    </div>

                    <span className="text-sm font-black text-purple-400">
                      10
                    </span>

                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">

                    <div className="h-full w-[55%] rounded-full bg-purple-500" />

                  </div>

                </div>

                {/* STRENGTH */}

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <span className="text-2xl">
                        💪
                      </span>

                      <div>

                        <p className="text-sm font-bold">
                          Strength
                        </p>

                        <p className="text-[10px] uppercase tracking-wider text-gray-600">
                          STR
                        </p>

                      </div>

                    </div>

                    <span className="text-sm font-black text-fuchsia-400">
                      10
                    </span>

                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">

                    <div className="h-full w-[55%] rounded-full bg-fuchsia-500" />

                  </div>

                </div>

                {/* DISCIPLINE */}

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <span className="text-2xl">
                        🎯
                      </span>

                      <div>

                        <p className="text-sm font-bold">
                          Discipline
                        </p>

                        <p className="text-[10px] uppercase tracking-wider text-gray-600">
                          DIS
                        </p>

                      </div>

                    </div>

                    <span className="text-sm font-black text-pink-400">
                      10
                    </span>

                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">

                    <div className="h-full w-[55%] rounded-full bg-pink-500" />

                  </div>

                </div>

                {/* VITALITY */}

                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl">

                  <div className="flex items-center justify-between">

                    <div className="flex items-center gap-3">

                      <span className="text-2xl">
                        ❤️
                      </span>

                      <div>

                        <p className="text-sm font-bold">
                          Vitality
                        </p>

                        <p className="text-[10px] uppercase tracking-wider text-gray-600">
                          VIT
                        </p>

                      </div>

                    </div>

                    <span className="text-sm font-black text-red-400">
                      10
                    </span>

                  </div>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-white/5">

                    <div className="h-full w-[55%] rounded-full bg-red-500" />

                  </div>

                </div>

              </div>

            </div>

            {/* Bottom status */}

            <div className="mt-7 flex items-center gap-3 text-sm text-gray-500">

              <span className="relative flex h-2.5 w-2.5">

                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />

                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.9)]" />

              </span>

              Character creation system online

            </div>

          </div>

          {/* =====================================================
              REGISTER CARD
          ===================================================== */}

          <div className="w-full max-w-lg justify-self-center">

            <div className="relative overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.035] p-1.5 shadow-2xl shadow-purple-950/40 backdrop-blur-2xl">

              {/* Card Glow */}

              <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-purple-600/20 blur-[90px]" />

              <form
                onSubmit={handleSubmit}
                className="relative rounded-[24px] border border-white/5 bg-[#090910]/95 p-7 sm:p-9"
              >

                {/* =================================================
                    MOBILE BRAND
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
                    HEADER
                ================================================= */}

                <div className="mb-8">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-xs font-bold uppercase tracking-[0.3em] text-purple-400">
                        New Player
                      </p>

                      <h2 className="mt-2 text-3xl font-black tracking-tight">
                        Create Character
                      </h2>

                    </div>

                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-purple-500/20 bg-purple-500/10 text-3xl shadow-[0_0_25px_rgba(168,85,247,0.15)]">
                      🧙
                    </div>

                  </div>

                  <div className="mt-5 h-px bg-gradient-to-r from-purple-500/40 via-fuchsia-500/20 to-transparent" />

                  <p className="mt-4 text-sm leading-6 text-gray-500">
                    Create your account and begin your journey through the
                    EvoQuest realm.
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
                    CHARACTER NAME
                ================================================= */}

                <div className="mb-5">

                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold text-gray-300"
                  >
                    Character Name
                  </label>

                  <div className="relative">

                    <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">
                      👤
                    </span>

                    <input
                      id="name"
                      type="text"
                      placeholder="Enter your hero name"
                      className="w-full rounded-xl border border-white/10 bg-white/[0.035] py-3.5 pl-11 pr-4 text-white outline-none transition duration-300 placeholder:text-gray-600 focus:border-purple-500/60 focus:bg-purple-500/[0.04] focus:ring-4 focus:ring-purple-500/10"
                      value={form.name}
                      onChange={(e) =>
                        setForm({
                          ...form,
                          name: e.target.value,
                        })
                      }
                      required
                    />

                  </div>

                  <p className="mt-2 text-xs text-gray-600">
                    This name will represent you throughout EvoQuest.
                  </p>

                </div>

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
                      placeholder="Create a secure password"
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

                  <p className="mt-2 text-xs text-gray-600">
                    Protect your character and progress with a strong password.
                  </p>

                </div>

                {/* =================================================
                    CREATE CHARACTER BUTTON
                ================================================= */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-purple-600 via-violet-600 to-fuchsia-600 py-4 font-bold shadow-lg shadow-purple-900/30 transition duration-300 hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(168,85,247,0.35)] disabled:cursor-not-allowed disabled:opacity-60"
                >

                  <span className="relative z-10">

                    {loading
                      ? "⚡ Creating Character..."
                      : "🧙 Begin Your Journey"}

                  </span>

                  {!loading && (
                    <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  )}

                </button>

                {/* =================================================
                    LOGIN
                ================================================= */}

                <div className="mt-7 text-center">

                  <p className="text-sm text-gray-500">
                    Already have a character?
                  </p>

                  <Link
                    to="/login"
                    className="mt-1 inline-block font-semibold text-purple-400 transition duration-300 hover:text-fuchsia-300"
                  >
                    Return to Login →
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
                    Your character data is protected
                  </span>

                </div>

              </form>

            </div>

            {/* Footer */}

            <p className="mt-5 text-center text-xs tracking-wide text-gray-600">
              EvoQuest • Level Up Your Life
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}