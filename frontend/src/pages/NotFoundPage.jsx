import { Link } from "react-router-dom";

function CornerFrame() {
  return (
    <>
      <span className="absolute left-2 top-2 h-5 w-5 border-l border-t border-white/15" />
      <span className="absolute right-2 top-2 h-5 w-5 border-r border-t border-white/15" />
      <span className="absolute bottom-2 left-2 h-5 w-5 border-b border-l border-white/15" />
      <span className="absolute bottom-2 right-2 h-5 w-5 border-b border-r border-white/15" />
    </>
  );
}

function PortalRing() {
  return (
    <div className="relative flex h-72 w-72 items-center justify-center">

      <div className="absolute inset-0 rounded-full border border-violet-300/10" />

      <div className="absolute inset-6 rounded-full border border-cyan-300/10 border-dashed" />

      <div className="absolute inset-12 rounded-full border border-fuchsia-300/10" />

      <div className="absolute inset-20 rounded-full bg-violet-500/10 blur-[50px]" />

      <div className="relative z-10 text-center">

        <div className="text-[100px] drop-shadow-[0_25px_45px_rgba(0,0,0,0.8)]">
          🗺️
        </div>

        <div className="mt-3 font-mono text-[9px] uppercase tracking-[0.4em] text-violet-200">
          Lost Route
        </div>

      </div>

      <div className="absolute left-3 top-16 flex h-8 w-8 items-center justify-center rounded-full border border-yellow-300/30 bg-yellow-300/5 text-sm text-yellow-200">
        ?
      </div>

      <div className="absolute bottom-12 right-0 flex h-9 w-9 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-300/5 text-sm text-cyan-200">
        !
      </div>

    </div>
  );
}

function RouteCard({
  icon,
  number,
  title,
  text,
  to,
}) {
  return (
    <Link
      to={to}
      className="group rounded-2xl border border-white/10 bg-white/[0.02] p-4 text-left transition duration-300 hover:-translate-y-1 hover:border-violet-300/30 hover:bg-violet-300/[0.04]"
    >

      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-xl">
          {icon}
        </div>

        <div className="flex-1">

          <div className="text-[8px] uppercase tracking-widest text-slate-700">
            Route {number}
          </div>

          <div className="mt-1 text-sm font-black">
            {title}
          </div>

          <div className="mt-1 text-[10px] leading-5 text-slate-600">
            {text}
          </div>

        </div>

        <span className="text-slate-700 transition group-hover:translate-x-1 group-hover:text-violet-200">
          →
        </span>

      </div>

    </Link>
  );
}

export default function NotFoundPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#06111b] text-white">

      {/* =====================================================
          BACKGROUND ATMOSPHERE
      ====================================================== */}

      <div className="pointer-events-none fixed inset-0">

        <div className="absolute left-[-180px] top-[-160px] h-[600px] w-[600px] rounded-full bg-violet-700/10 blur-[150px]" />

        <div className="absolute right-[-180px] top-[25%] h-[600px] w-[600px] rounded-full bg-cyan-600/10 blur-[150px]" />

        <div className="absolute bottom-[-200px] left-[28%] h-[600px] w-[600px] rounded-full bg-fuchsia-600/10 blur-[150px]" />

        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:30px_30px]" />

      </div>

      {/* =====================================================
          TOP BRAND
      ====================================================== */}

      <header className="relative z-20 border-b border-white/5 bg-[#06111b]/75 backdrop-blur-xl">

        <div className="mx-auto flex h-[78px] max-w-[1500px] items-center justify-between px-5 lg:px-8">

          <Link
            to="/"
            className="group flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-violet-300/30 bg-violet-500/10 text-xl transition group-hover:rotate-12">
              ◈
            </div>

            <div>

              <div className="text-lg font-black tracking-tight">
                Evo<span className="text-fuchsia-400">
                  Quest
                </span>
              </div>

              <div className="text-[7px] uppercase tracking-[0.45em] text-slate-600">
                Level Up Your Life
              </div>

            </div>

          </Link>

          <div className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 text-[8px] uppercase tracking-widest text-slate-600">
            Navigation System
          </div>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ====================================================== */}

      <section className="relative z-10 flex min-h-[calc(100vh-78px)] items-center px-5 py-12 lg:px-8">

        <div className="mx-auto w-full max-w-[1200px]">

          <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">

            {/* =================================================
                LEFT VISUAL
            ================================================== */}

            <div className="relative flex min-h-[500px] items-center justify-center">

              <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-violet-300/10" />

              <div className="absolute left-1/2 top-1/2 h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/10 border-dashed" />

              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/10 blur-[90px]" />

              <PortalRing />

              {/* floating fragments */}

              <div className="absolute left-[8%] top-[12%] rounded-xl border border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur-md">

                <div className="text-[7px] uppercase tracking-widest text-slate-700">
                  Map status
                </div>

                <div className="mt-1 flex items-center gap-2 text-xs text-yellow-200">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-yellow-200" />
                  Route Lost
                </div>

              </div>

              <div className="absolute right-[5%] top-[25%] rounded-xl border border-cyan-300/10 bg-slate-950/70 px-4 py-3 backdrop-blur-md">

                <div className="text-[7px] uppercase tracking-widest text-slate-700">
                  Coordinates
                </div>

                <div className="mt-1 font-mono text-xs text-cyan-200">
                  ?? / ??
                </div>

              </div>

              <div className="absolute bottom-[18%] left-[10%] rounded-xl border border-fuchsia-300/10 bg-slate-950/70 px-4 py-3 backdrop-blur-md">

                <div className="text-[7px] uppercase tracking-widest text-slate-700">
                  Realm
                </div>

                <div className="mt-1 text-xs font-bold text-fuchsia-200">
                  Unknown
                </div>

              </div>

              <div className="absolute bottom-[12%] right-[7%] rounded-xl border border-violet-300/10 bg-slate-950/70 px-4 py-3 backdrop-blur-md">

                <div className="text-[7px] uppercase tracking-widest text-slate-700">
                  Signal
                </div>

                <div className="mt-1 text-xs font-bold text-violet-200">
                  Searching...
                </div>

              </div>

            </div>

            {/* =================================================
                RIGHT CONTENT
            ================================================== */}

            <div>

              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.4em] text-violet-200">

                <span className="h-px w-8 bg-violet-300/60" />

                Lost Route

              </div>

              <div className="mt-5 font-mono text-[9px] uppercase tracking-[0.5em] text-slate-700">
                ERROR 404 • WORLD MAP
              </div>

              <h1 className="mt-5 font-serif text-6xl font-black leading-[0.9] sm:text-7xl md:text-8xl">

                The Path
                <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-200 bg-clip-text text-transparent">
                  Disappeared.
                </span>

              </h1>

              <p className="mt-7 max-w-xl text-sm leading-7 text-slate-400 md:text-base">
                This route does not exist in the EvoQuest world. The map
                seems to have lost the destination you were looking for.
              </p>

              <div className="mt-7 rounded-2xl border border-yellow-300/10 bg-yellow-300/5 p-5">

                <div className="flex items-start gap-4">

                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-yellow-300/5 text-xl">
                    🧭
                  </div>

                  <div>

                    <div className="text-[8px] font-bold uppercase tracking-[0.3em] text-yellow-200">
                      Navigator message
                    </div>

                    <p className="mt-2 text-xs leading-6 text-slate-400">
                      Even the best adventurers take a wrong turn.
                      Choose a known route and continue your journey.
                    </p>

                  </div>

                </div>

              </div>

              <div className="mt-7 grid gap-3">

                <RouteCard
                  icon="🏠"
                  number="01"
                  title="Command Center"
                  text="Return to your main adventure dashboard."
                  to="/dashboard"
                />

                <RouteCard
                  icon="⚔️"
                  number="02"
                  title="Missions"
                  text="Find a real-world mission and keep progressing."
                  to="/quests"
                />

                <RouteCard
                  icon="🧙"
                  number="03"
                  title="Hero Profile"
                  text="Inspect the character you have built."
                  to="/character"
                />

              </div>

              <div className="mt-7 flex flex-wrap gap-3">

                <Link
                  to="/dashboard"
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-4 text-xs font-black uppercase tracking-widest shadow-xl shadow-violet-500/20 transition hover:-translate-y-0.5"
                >
                  Return To Command Center →
                </Link>

                <Link
                  to="/"
                  className="rounded-xl border border-white/10 bg-white/[0.025] px-6 py-4 text-xs font-bold uppercase tracking-widest text-slate-400 transition hover:bg-white/[0.05] hover:text-white"
                >
                  Return To World
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="relative z-10 border-t border-white/5 bg-[#03090f]">

        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-3 px-5 py-6 text-[8px] uppercase tracking-widest text-slate-700 sm:flex-row lg:px-8">

          <span>
            EvoQuest • Lost Route
          </span>

          <span>
            Every wrong turn can lead to a new mission.
          </span>

        </div>

      </footer>

    </main>
  );
}