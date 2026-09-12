import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { getInventory } from "../api/inventory.api";
import { useApiRequest } from "../hooks/useApiRequest";
import InventoryGrid from "../components/inventory/InventoryGrid";
import ErrorMessage from "../components/common/ErrorMessage";

/*
|--------------------------------------------------------------------------
| EVOQUEST — COLLECTION VAULT
|--------------------------------------------------------------------------
| Existing API remains unchanged:
|
|   GET /inventory
|
| Existing data flow remains:
|
|   getInventory()
|        ↓
|   useApiRequest()
|        ↓
|   InventoryGrid
|
| This page adds a richer presentation layer around the existing data.
|--------------------------------------------------------------------------
*/

const ITEM_TYPES = [
  {
    key: "all",
    label: "All Items",
    icon: "✦",
  },
  {
    key: "theme",
    label: "Themes",
    icon: "🎨",
  },
  {
    key: "avatar",
    label: "Avatars",
    icon: "🧙",
  },
  {
    key: "badge",
    label: "Badges",
    icon: "🏆",
  },
  {
    key: "boost",
    label: "Boosts",
    icon: "⚡",
  },
];

const RARITY_DATA = [
  {
    name: "Common",
    icon: "◆",
    color: "text-slate-300",
  },
  {
    name: "Rare",
    icon: "◇",
    color: "text-cyan-300",
  },
  {
    name: "Epic",
    icon: "✦",
    color: "text-violet-300",
  },
  {
    name: "Legendary",
    icon: "★",
    color: "text-yellow-200",
  },
];

const DEMO_SLOTS = [
  {
    slot: "01",
    title: "Identity",
    icon: "🧙",
    text: "Your hero appearance",
  },
  {
    slot: "02",
    title: "Theme",
    icon: "🎨",
    text: "Your world appearance",
  },
  {
    slot: "03",
    title: "Badge",
    icon: "🏆",
    text: "Your visible milestone",
  },
  {
    slot: "04",
    title: "Boost",
    icon: "⚡",
    text: "Temporary progression item",
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
    gold:
      "border-yellow-300/10 bg-yellow-300/5 text-yellow-200",
    fuchsia:
      "border-fuchsia-300/10 bg-fuchsia-300/5 text-fuchsia-200",
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

        <span className="text-[8px] uppercase tracking-[0.25em] text-slate-700">
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
          : "border-white/10 bg-white/[0.02] text-slate-600 hover:border-white/20 hover:text-white"
      }`}
    >
      <span>{icon}</span>
      <span>{label}</span>

      <span
        className={`font-mono ${
          active
            ? "text-violet-300"
            : "text-slate-700"
        }`}
      >
        {count}
      </span>
    </button>
  );
}

function CollectionSlot({
  slot,
  title,
  icon,
  text,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4">

      <div className="flex items-center justify-between">

        <span className="font-mono text-[8px] text-slate-700">
          SLOT-{slot}
        </span>

        <span className="text-[8px] uppercase tracking-widest text-slate-700">
          Preview
        </span>

      </div>

      <div className="mt-5 flex items-center gap-4">

        <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-violet-300/10 bg-violet-300/5 text-2xl">
          {icon}
        </div>

        <div>
          <div className="text-sm font-black">
            {title}
          </div>

          <div className="mt-1 text-[10px] leading-5 text-slate-600">
            {text}
          </div>
        </div>

      </div>

    </div>
  );
}

function VaultBadge({
  icon,
  text,
  color,
}) {
  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[8px] ${
        color || "border-white/10 bg-white/5 text-slate-500"
      }`}
    >
      <span>{icon}</span>
      <span>{text}</span>
    </div>
  );
}

export default function InventoryPage() {
  const {
    data,
    loading,
    error,
    run,
  } = useApiRequest(getInventory);

  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    run();
  }, [run]);

  if (error) {
    return (
      <main className="min-h-screen bg-[#06111b] px-5 py-10 text-white md:px-8">

        <div className="mx-auto max-w-[1200px]">

          <ErrorMessage
            message={error}
            onRetry={run}
          />

        </div>

      </main>
    );
  }

  const items = data?.items ?? [];

  const getItemType = (item) => {
    return (
      item?.type ||
      item?.itemType ||
      "unknown"
    ).toLowerCase();
  };

  const filteredItems = useMemo(() => {
    const query =
      search.trim().toLowerCase();

    return items.filter((item) => {

      const type = getItemType(item);

      const matchesFilter =
        filter === "all" ||
        type === filter;

      const searchableText = [
        item?.name,
        item?.title,
        item?.description,
        item?.type,
        item?.itemType,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      const matchesSearch =
        !query ||
        searchableText.includes(query);

      return (
        matchesFilter &&
        matchesSearch
      );
    });
  }, [items, filter, search]);

  const typeCounts = useMemo(() => {
    return {
      all: items.length,

      theme: items.filter(
        (item) =>
          getItemType(item) === "theme"
      ).length,

      avatar: items.filter(
        (item) =>
          getItemType(item) === "avatar"
      ).length,

      badge: items.filter(
        (item) =>
          getItemType(item) === "badge"
      ).length,

      boost: items.filter(
        (item) =>
          getItemType(item) === "boost"
      ).length,
    };
  }, [items]);

  const uniqueTypes = new Set(
    items.map((item) =>
      getItemType(item)
    )
  );

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
          PAGE CONTENT
      ====================================================== */}

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 py-8 md:px-8 md:py-10">

        {/* ===================================================
            HEADER
        ==================================================== */}

        <section className="mb-8">

          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

            <div>

              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.4em] text-violet-200">

                <span className="h-px w-8 bg-violet-300/60" />

                Collection Vault

              </div>

              <h1 className="mt-4 font-serif text-5xl font-black leading-[0.92] sm:text-6xl md:text-7xl">

                Your
                <span className="block bg-gradient-to-r from-violet-300 via-fuchsia-300 to-cyan-200 bg-clip-text text-transparent">
                  Collection.
                </span>

              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                Everything you earn throughout your EvoQuest journey lives
                here. Collect new items, review your rewards and customize
                the identity of your hero.
              </p>

            </div>

            <div className="flex gap-3">

              <Link
                to="/shop"
                className="rounded-xl border border-yellow-300/10 bg-yellow-300/5 px-5 py-3 text-xs font-bold text-yellow-200 transition hover:bg-yellow-300/10"
              >
                🪙 Reward Hub →
              </Link>

              <Link
                to="/character"
                className="rounded-xl border border-violet-300/20 bg-violet-500/10 px-5 py-3 text-xs font-bold text-violet-200 transition hover:bg-violet-500/20"
              >
                🧙 Hero Profile →
              </Link>

            </div>

          </div>

        </section>

        {/* ===================================================
            VAULT HERO
        ==================================================== */}

        <section className="relative mb-6 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.025]">

          <CornerFrame />

          <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-violet-500/10 blur-[120px]" />

          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[120px]" />

          <div className="relative grid lg:grid-cols-[0.72fr_1.28fr]">

            {/* Vault visual */}

            <div className="relative flex min-h-[400px] items-center justify-center overflow-hidden border-b border-white/5 lg:border-b-0 lg:border-r">

              <div className="absolute h-[310px] w-[310px] rounded-full border border-violet-300/10" />

              <div className="absolute h-[245px] w-[245px] rounded-full border border-cyan-300/10 border-dashed" />

              <div className="absolute h-52 w-52 rounded-full bg-violet-500/10 blur-[75px]" />

              <div className="relative text-center">

                <div className="text-[125px] drop-shadow-[0_25px_45px_rgba(0,0,0,0.8)]">
                  🎒
                </div>

                <div className="mt-3 font-serif text-3xl font-black">
                  The Vault
                </div>

                <div className="mt-2 text-[8px] uppercase tracking-[0.4em] text-violet-200">
                  {items.length} items collected
                </div>

              </div>

              <div className="absolute left-7 top-7">

                <div className="text-[8px] uppercase tracking-widest text-slate-700">
                  COLLECTION CORE
                </div>

                <div className="mt-1 font-mono text-[8px] text-cyan-200">
                  ONLINE
                </div>

              </div>

              <div className="absolute bottom-7 left-7 rounded-xl border border-emerald-300/10 bg-emerald-300/5 px-4 py-3">

                <div className="text-[7px] uppercase tracking-widest text-slate-700">
                  Status
                </div>

                <div className="mt-1 text-xs font-bold text-emerald-200">
                  {loading
                    ? "Syncing..."
                    : "Synchronized"}
                </div>

              </div>

            </div>

            {/* Vault stats */}

            <div className="p-7 md:p-9">

              <div className="flex items-start justify-between gap-5">

                <div>

                  <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-200">
                    Inventory Overview
                  </div>

                  <h2 className="mt-2 font-serif text-3xl font-black">
                    What have you collected?
                  </h2>

                  <p className="mt-3 max-w-xl text-xs leading-6 text-slate-600">
                    Items earned or purchased throughout your journey
                    appear here as part of your personal collection.
                  </p>

                </div>

                <div className="hidden rounded-2xl border border-cyan-300/10 bg-cyan-300/5 px-5 py-4 text-right sm:block">

                  <div className="text-[8px] uppercase tracking-widest text-slate-700">
                    Item types
                  </div>

                  <div className="mt-1 font-serif text-3xl font-black text-cyan-200">
                    {uniqueTypes.size}
                  </div>

                </div>

              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">

                <StatCard
                  icon="🎒"
                  value={items.length}
                  label="All items"
                  description="Total collected"
                  tone="violet"
                />

                <StatCard
                  icon="🎨"
                  value={typeCounts.theme}
                  label="Themes"
                  description="World styles"
                  tone="cyan"
                />

                <StatCard
                  icon="🏆"
                  value={typeCounts.badge}
                  label="Badges"
                  description="Visible milestones"
                  tone="gold"
                />

                <StatCard
                  icon="⚡"
                  value={typeCounts.boost}
                  label="Boosts"
                  description="Progress items"
                  tone="fuchsia"
                />

              </div>

              <div className="mt-7 rounded-2xl border border-violet-300/10 bg-violet-300/5 p-5">

                <div className="flex items-center justify-between">

                  <div>

                    <div className="text-[8px] uppercase tracking-widest text-slate-700">
                      Collection identity
                    </div>

                    <div className="mt-2 text-lg font-black">
                      The Collector
                    </div>

                  </div>

                  <div className="text-3xl">
                    ✦
                  </div>

                </div>

                <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">

                  {RARITY_DATA.map(
                    (rarity) => (
                      <VaultBadge
                        key={rarity.name}
                        icon={rarity.icon}
                        text={rarity.name}
                        color={`${rarity.color} border-white/10 bg-black/20`}
                      />
                    )
                  )}

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            EQUIPMENT PREVIEW
        ==================================================== */}

        <section className="mb-6">

          <Panel className="p-6 md:p-7">

            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

              <div>

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-fuchsia-300">
                  Hero Loadout
                </div>

                <h2 className="mt-2 font-serif text-2xl font-black">
                  Your Collection Slots
                </h2>

                <p className="mt-2 text-xs text-slate-600">
                  A preview of the roles your collected items can play.
                </p>

              </div>

              <Link
                to="/shop"
                className="text-[9px] font-bold uppercase tracking-widest text-violet-300"
              >
                Find new rewards →
              </Link>

            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

              {DEMO_SLOTS.map(
                (slot) => (
                  <CollectionSlot
                    key={slot.slot}
                    slot={slot.slot}
                    title={slot.title}
                    icon={slot.icon}
                    text={slot.text}
                  />
                )
              )}

            </div>

          </Panel>

        </section>

        {/* ===================================================
            FILTERS
        ==================================================== */}

        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">

          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">

            <div>

              <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-200">
                Collection Search
              </div>

              <div className="mt-1 text-xs text-slate-600">
                Find exactly what you are looking for.
              </div>

            </div>

            <div className="flex flex-col gap-3 lg:flex-row">

              <div className="flex flex-wrap gap-2">

                {ITEM_TYPES.map(
                  (type) => (
                    <FilterButton
                      key={type.key}
                      active={
                        filter ===
                        type.key
                      }
                      icon={type.icon}
                      label={type.label}
                      count={
                        typeCounts[
                          type.key
                        ] ?? 0
                      }
                      onClick={() =>
                        setFilter(
                          type.key
                        )
                      }
                    />
                  )
                )}

              </div>

              <div className="relative min-w-[240px]">

                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-700">
                  ⌕
                </span>

                <input
                  type="text"
                  placeholder="Search collection..."
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target
                        .value
                    )
                  }
                  className="w-full rounded-full border border-white/10 bg-black/20 py-2.5 pl-10 pr-4 text-xs text-white outline-none placeholder:text-slate-700 focus:border-violet-300/30"
                />

              </div>

            </div>

          </div>

        </section>

        {/* ===================================================
            INVENTORY
        ==================================================== */}

        <section>

          <div className="mb-5 flex items-end justify-between">

            <div>

              <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
                Collected Items
              </div>

              <h2 className="mt-2 font-serif text-2xl font-black">
                Your Collection
              </h2>

            </div>

            <div className="text-[8px] uppercase tracking-widest text-slate-700">
              {filteredItems.length} items shown
            </div>

          </div>

          <Panel className="p-4 md:p-6">

            {filteredItems.length > 0 ? (
              <InventoryGrid
                items={filteredItems}
                loading={loading}
              />
            ) : loading ? (
              <InventoryGrid
                items={[]}
                loading={true}
              />
            ) : (
              <div className="flex min-h-[300px] flex-col items-center justify-center text-center">

                <div className="text-6xl">
                  🔎
                </div>

                <h3 className="mt-5 font-serif text-2xl font-black">
                  Nothing found
                </h3>

                <p className="mt-2 max-w-sm text-xs leading-6 text-slate-600">
                  Try another category or search term.
                </p>

                <button
                  type="button"
                  onClick={() => {
                    setFilter("all");
                    setSearch("");
                  }}
                  className="mt-6 rounded-xl border border-violet-300/20 bg-violet-500/10 px-5 py-3 text-xs font-bold text-violet-200"
                >
                  Reset Collection
                </button>

              </div>
            )}

          </Panel>

        </section>

        {/* ===================================================
            EMPTY / MOTIVATIONAL
        ==================================================== */}

        <section className="mt-6">

          <Panel className="border-yellow-300/10 bg-gradient-to-r from-yellow-300/[0.025] via-transparent to-violet-300/[0.04] p-7">

            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

              <div>

                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-yellow-200">
                  Expand Your Collection
                </div>

                <h2 className="mt-2 font-serif text-2xl font-black">
                  The vault grows with your journey.
                </h2>

                <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-600">
                  Complete missions, earn rewards and discover new items
                  that make your EvoQuest experience feel uniquely yours.
                </p>

              </div>

              <Link
                to="/shop"
                className="whitespace-nowrap rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3.5 text-center text-xs font-black uppercase tracking-widest shadow-xl shadow-violet-500/20 transition hover:-translate-y-0.5"
              >
                Visit Reward Hub →
              </Link>

            </div>

          </Panel>

        </section>

        {/* ===================================================
            FOOTER
        ==================================================== */}

        <footer className="mt-8 flex flex-col justify-between gap-3 border-t border-white/5 pt-6 text-[8px] uppercase tracking-widest text-slate-700 sm:flex-row">

          <span>
            EvoQuest • Collection Vault
          </span>

          <span>
            Earn it. Collect it. Make it yours.
          </span>

        </footer>

      </div>

    </main>
  );
}