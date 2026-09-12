import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  getShopItems,
  purchaseItem,
} from "../api/shop.api";
import { useApiRequest } from "../hooks/useApiRequest";
import { useGame } from "../hooks/useGame";
import ShopGrid from "../components/shop/ShopGrid";
import PurchaseModal from "../components/shop/PurchaseModal";
import ErrorMessage from "../components/common/ErrorMessage";

const ITEM_FILTERS = [
  {
    key: "all",
    label: "All Rewards",
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

const RARITIES = [
  {
    label: "Common",
    icon: "◆",
    description: "Reliable rewards for steady progress.",
    className: "text-slate-300",
  },
  {
    label: "Rare",
    icon: "◇",
    description: "Rewards worth hunting for.",
    className: "text-cyan-300",
  },
  {
    label: "Epic",
    icon: "✦",
    description: "Rare finds for serious adventurers.",
    className: "text-violet-300",
  },
  {
    label: "Legendary",
    icon: "★",
    description: "The rewards everyone remembers.",
    className: "text-yellow-200",
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
    yellow:
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
        <span className="text-xl">{icon}</span>

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

function RarityCard({ rarity }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.02] p-4 transition duration-300 hover:-translate-y-1 hover:bg-white/[0.04]">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-lg ${rarity.className}`}
        >
          {rarity.icon}
        </div>

        <div>
          <div
            className={`text-xs font-black ${rarity.className}`}
          >
            {rarity.label}
          </div>

          <div className="mt-1 text-[9px] leading-4 text-slate-700">
            {rarity.description}
          </div>
        </div>
      </div>
    </div>
  );
}

function VaultSlot({
  number,
  icon,
  title,
  description,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[8px] text-slate-700">
          SLOT-{number}
        </span>

        <span className="text-[8px] uppercase tracking-widest text-slate-700">
          Reward Type
        </span>
      </div>

      <div className="mt-5 flex items-center gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-violet-300/10 bg-violet-300/5 text-xl">
          {icon}
        </div>

        <div>
          <div className="text-sm font-black">
            {title}
          </div>

          <div className="mt-1 text-[9px] leading-5 text-slate-700">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
}

function PurchaseNotice({ message }) {
  if (!message) {
    return null;
  }

  return (
    <div className="mb-6 rounded-2xl border border-rose-300/15 bg-rose-300/5 p-4">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-rose-300/5 text-lg">
          ⚠️
        </div>

        <div>
          <div className="text-[8px] font-bold uppercase tracking-widest text-rose-200">
            Purchase blocked
          </div>

          <div className="mt-1 text-xs leading-5 text-slate-400">
            {message}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ShopPage() {
  const {
    character,
    refreshCharacter,
  } = useGame();

  const {
    data,
    loading,
    error,
    run,
  } = useApiRequest(getShopItems);

  const [selected, setSelected] = useState(null);
  const [busy, setBusy] = useState(false);
  const [purchaseError, setPurchaseError] = useState("");
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    run();
  }, [run]);

  const items = data?.items ?? [];

  const getType = (item) => {
    return String(
      item?.type ||
        item?.itemType ||
        ""
    ).toLowerCase();
  };

  const filteredItems = useMemo(() => {
    const query = search.trim().toLowerCase();

    return items.filter((item) => {
      const itemType = getType(item);

      const matchesFilter =
        filter === "all" ||
        itemType === filter;

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

  const typeCounts = useMemo(
    () => ({
      all: items.length,

      theme: items.filter(
        (item) =>
          getType(item) === "theme"
      ).length,

      avatar: items.filter(
        (item) =>
          getType(item) === "avatar"
      ).length,

      badge: items.filter(
        (item) =>
          getType(item) === "badge"
      ).length,

      boost: items.filter(
        (item) =>
          getType(item) === "boost"
      ).length,
    }),
    [items]
  );

  const gold = character?.gold ?? 0;

  const handleConfirm = async () => {
    if (!selected || busy) {
      return;
    }

    setBusy(true);
    setPurchaseError("");

    try {
      const itemId =
        selected?._id ?? selected?.id;

      if (!itemId) {
        throw new Error(
          "Unable to identify the selected reward."
        );
      }

      await purchaseItem(itemId);

      await refreshCharacter();

      setSelected(null);

      await run();
    } catch (e) {
      setPurchaseError(
        e?.message ||
          "Purchase could not be completed."
      );
    } finally {
      setBusy(false);
    }
  };

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

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#06111b] text-white">
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-[-180px] top-[-160px] h-[600px] w-[600px] rounded-full bg-yellow-600/8 blur-[150px]" />
        <div className="absolute right-[-180px] top-[20%] h-[600px] w-[600px] rounded-full bg-violet-700/10 blur-[150px]" />
        <div className="absolute bottom-[-200px] left-[28%] h-[600px] w-[600px] rounded-full bg-fuchsia-600/10 blur-[150px]" />

        <div className="absolute inset-0 opacity-[0.025] bg-[radial-gradient(circle_at_center,white_1px,transparent_1px)] bg-[size:30px_30px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/5 bg-[#06111b]/85 backdrop-blur-2xl">
        <div className="mx-auto flex h-[78px] max-w-[1600px] items-center justify-between px-5 md:px-8">
          <Link
            to="/"
            className="group flex items-center gap-3"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-yellow-300/20 bg-yellow-300/5 text-xl transition group-hover:rotate-12">
              ◈
            </div>

            <div>
              <div className="text-lg font-black">
                Evo<span className="text-fuchsia-400">
                  Quest
                </span>
              </div>

              <div className="text-[7px] uppercase tracking-[0.45em] text-slate-600">
                Reward Hub
              </div>
            </div>
          </Link>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="rounded-full border border-emerald-300/10 bg-emerald-300/5 px-4 py-2">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-300" />

                <span className="text-[8px] font-bold uppercase tracking-widest text-emerald-200">
                  Shop Online
                </span>
              </div>
            </div>

            <div className="rounded-full border border-yellow-300/10 bg-yellow-300/5 px-4 py-2">
              <span className="text-[9px] font-bold text-yellow-200">
                🪙 {gold}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to="/inventory"
              className="rounded-full border border-white/10 bg-white/[0.02] px-4 py-2.5 text-[8px] font-bold uppercase tracking-widest text-slate-500 transition hover:text-white"
            >
              Collection
            </Link>

            <Link
              to="/dashboard"
              className="hidden rounded-full border border-violet-300/20 bg-violet-500/10 px-4 py-2.5 text-[8px] font-bold uppercase tracking-widest text-violet-200 sm:block"
            >
              Command Center
            </Link>
          </div>
        </div>
      </header>

      <div className="relative z-10 mx-auto max-w-[1600px] px-5 py-8 md:px-8 md:py-10">
        <section className="mb-8">
          <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
            <div>
              <div className="flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.4em] text-yellow-200">
                <span className="h-px w-8 bg-yellow-300/60" />
                Reward Hub
              </div>

              <h1 className="mt-4 font-serif text-5xl font-black leading-[0.9] sm:text-6xl md:text-7xl">
                Earn It.
                <span className="block bg-gradient-to-r from-yellow-200 via-fuchsia-300 to-violet-300 bg-clip-text text-transparent">
                  Choose It.
                </span>
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
                Turn your earned Gold into items that make your EvoQuest
                experience yours. Every reward is backed by real progress.
              </p>
            </div>

            <div className="flex gap-3">
              <div className="rounded-2xl border border-yellow-300/10 bg-yellow-300/5 px-6 py-4">
                <div className="text-[8px] uppercase tracking-widest text-slate-700">
                  Available Gold
                </div>

                <div className="mt-1 font-serif text-3xl font-black text-yellow-200">
                  🪙 {gold}
                </div>
              </div>

              <Link
                to="/quests"
                className="flex items-center rounded-2xl border border-violet-300/15 bg-violet-500/10 px-5 py-4 text-xs font-bold text-violet-200 transition hover:bg-violet-500/20"
              >
                Earn More →
              </Link>
            </div>
          </div>
        </section>

        <section className="relative mb-6 overflow-hidden rounded-[34px] border border-white/10 bg-white/[0.025]">
          <CornerFrame />

          <div className="absolute left-0 top-0 h-80 w-80 rounded-full bg-yellow-300/5 blur-[110px]" />
          <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-violet-500/10 blur-[120px]" />

          <div className="relative grid lg:grid-cols-[0.7fr_1.3fr]">
            <div className="relative flex min-h-[420px] items-center justify-center overflow-hidden border-b border-white/5 lg:border-b-0 lg:border-r">
              <div className="absolute h-[320px] w-[320px] rounded-full border border-yellow-300/10" />
              <div className="absolute h-[250px] w-[250px] rounded-full border border-violet-300/10 border-dashed" />
              <div className="absolute h-[190px] w-[190px] rounded-full bg-yellow-300/10 blur-[70px]" />

              <div className="relative text-center">
                <div className="text-[130px] drop-shadow-[0_30px_50px_rgba(0,0,0,0.8)]">
                  🏪
                </div>

                <div className="mt-2 font-serif text-3xl font-black">
                  Reward Hub
                </div>

                <div className="mt-2 text-[8px] uppercase tracking-[0.4em] text-yellow-200">
                  Trade progress for rewards
                </div>
              </div>

              <div className="absolute left-7 top-7">
                <div className="text-[8px] uppercase tracking-widest text-slate-700">
                  ECONOMY CORE
                </div>

                <div className="mt-1 font-mono text-[8px] text-yellow-200">
                  ONLINE
                </div>
              </div>

              <div className="absolute bottom-7 left-7 rounded-xl border border-yellow-300/10 bg-yellow-300/5 px-4 py-3">
                <div className="text-[7px] uppercase tracking-widest text-slate-700">
                  Treasury
                </div>

                <div className="mt-1 text-xs font-black text-yellow-200">
                  🪙 {gold}
                </div>
              </div>
            </div>

            <div className="p-7 md:p-9">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-fuchsia-300">
                    Personal Economy
                  </div>

                  <h2 className="mt-2 font-serif text-3xl font-black">
                    Progress has value.
                  </h2>

                  <p className="mt-3 max-w-xl text-xs leading-6 text-slate-600">
                    Complete missions, earn Gold and spend it on rewards
                    that personalize your journey.
                  </p>
                </div>

                <div className="hidden rounded-2xl border border-yellow-300/10 bg-yellow-300/5 px-5 py-4 text-right sm:block">
                  <div className="text-[8px] uppercase tracking-widest text-slate-700">
                    Treasury
                  </div>

                  <div className="mt-1 font-serif text-3xl font-black text-yellow-200">
                    {gold}
                  </div>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <StatCard
                  icon="🪙"
                  value={gold}
                  label="Gold"
                  description="Available currency"
                  tone="yellow"
                />

                <StatCard
                  icon="🎒"
                  value={items.length}
                  label="Rewards"
                  description="Available items"
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
                  icon="⚡"
                  value={typeCounts.boost}
                  label="Boosts"
                  description="Special items"
                  tone="fuchsia"
                />
              </div>

              <div className="mt-7">
                <div className="mb-3 flex items-center justify-between">
                  <div className="text-[8px] uppercase tracking-widest text-slate-700">
                    Reward categories
                  </div>

                  <div className="text-[8px] uppercase tracking-widest text-slate-700">
                    4 types
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {ITEM_FILTERS.slice(1).map(
                    (item) => (
                      <div
                        key={item.key}
                        className="rounded-xl border border-white/5 bg-black/20 p-3"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-lg">
                            {item.icon}
                          </span>

                          <span className="font-mono text-xs text-cyan-200">
                            {typeCounts[item.key]}
                          </span>
                        </div>

                        <div className="mt-2 text-[8px] uppercase tracking-widest text-slate-600">
                          {item.label}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-6">
          <div className="mb-4">
            <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
              Reward Tiers
            </div>

            <h2 className="mt-2 font-serif text-2xl font-black">
              Know What You Are Hunting For.
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {RARITIES.map(
              (rarity) => (
                <RarityCard
                  key={rarity.label}
                  rarity={rarity}
                />
              )
            )}
          </div>
        </section>

        <section className="mb-6">
          <Panel className="p-6 md:p-7">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-cyan-200">
                  Hero Loadout
                </div>

                <h2 className="mt-2 font-serif text-2xl font-black">
                  Rewards Can Shape Your World.
                </h2>
              </div>

              <Link
                to="/inventory"
                className="text-[9px] font-bold uppercase tracking-widest text-cyan-200"
              >
                Open Collection →
              </Link>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <VaultSlot
                number="01"
                icon="🧙"
                title="Avatar"
                description="Give your hero a distinct identity."
              />

              <VaultSlot
                number="02"
                icon="🎨"
                title="Theme"
                description="Change how your EvoQuest world feels."
              />

              <VaultSlot
                number="03"
                icon="🏆"
                title="Badge"
                description="Showcase something you have earned."
              />

              <VaultSlot
                number="04"
                icon="⚡"
                title="Boost"
                description="Unlock temporary progression advantages."
              />
            </div>
          </Panel>
        </section>

        <section className="mb-6 rounded-2xl border border-white/10 bg-white/[0.02] p-4">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-violet-300">
                Reward Search
              </div>

              <div className="mt-1 text-xs text-slate-600">
                Find the reward that fits your journey.
              </div>
            </div>

            <div className="flex flex-col gap-3 lg:flex-row">
              <div className="flex flex-wrap gap-2">
                {ITEM_FILTERS.map(
                  (item) => (
                    <FilterButton
                      key={item.key}
                      active={
                        filter === item.key
                      }
                      icon={item.icon}
                      label={item.label}
                      count={
                        typeCounts[item.key]
                      }
                      onClick={() =>
                        setFilter(
                          item.key
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
                  value={search}
                  onChange={(event) =>
                    setSearch(
                      event.target.value
                    )
                  }
                  placeholder="Search rewards..."
                  className="w-full rounded-full border border-white/10 bg-black/20 py-2.5 pl-10 pr-4 text-xs text-white outline-none placeholder:text-slate-700 focus:border-violet-300/30"
                />
              </div>
            </div>
          </div>
        </section>

        <PurchaseNotice
          message={purchaseError}
        />

        <section>
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-yellow-200">
                Available Rewards
              </div>

              <h2 className="mt-2 font-serif text-2xl font-black">
                Choose Your Reward.
              </h2>
            </div>

            <div className="text-[8px] uppercase tracking-widest text-slate-700">
              {filteredItems.length} items shown
            </div>
          </div>

          <Panel className="p-4 md:p-6">
            <ShopGrid
              items={filteredItems}
              loading={loading}
              gold={gold}
              onBuy={setSelected}
            />
          </Panel>
        </section>

        <section className="mt-6">
          <Panel className="border-yellow-300/10 bg-gradient-to-r from-yellow-300/[0.025] via-transparent to-violet-300/[0.04] p-7">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
              <div>
                <div className="text-[9px] font-bold uppercase tracking-[0.35em] text-yellow-200">
                  The EvoQuest Economy
                </div>

                <h2 className="mt-2 font-serif text-2xl font-black">
                  Rewards mean more when you earn them.
                </h2>

                <p className="mt-2 max-w-2xl text-xs leading-6 text-slate-600">
                  Gold is generated through real progress. Complete missions,
                  protect your momentum and choose what you want to unlock next.
                </p>
              </div>

              <Link
                to="/quests"
                className="whitespace-nowrap rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-500 px-6 py-3.5 text-center text-xs font-black uppercase tracking-widest shadow-xl shadow-violet-500/20 transition hover:-translate-y-0.5"
              >
                Earn More Gold →
              </Link>
            </div>
          </Panel>
        </section>

        <footer className="mt-8 flex flex-col justify-between gap-3 border-t border-white/5 pt-6 text-[8px] uppercase tracking-widest text-slate-700 sm:flex-row">
          <span>
            EvoQuest • Reward Hub
          </span>

          <span>
            Earn it. Choose it. Make it yours.
          </span>
        </footer>
      </div>

      <PurchaseModal
        item={selected}
        gold={gold}
        open={!!selected}
        onClose={() => {
          if (!busy) {
            setSelected(null);
            setPurchaseError("");
          }
        }}
        onConfirm={handleConfirm}
        busy={busy}
      />
    </main>
  );
}