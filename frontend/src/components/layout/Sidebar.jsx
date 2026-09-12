import { NavLink } from "react-router-dom";

const links = [
  { to: "/dashboard", label: "🏠 Dashboard" },
  { to: "/quests", label: "⚔️ Quests" },
  { to: "/character", label: "🧙 Character" },
  { to: "/achievements", label: "🏆 Achievements" },
  { to: "/shop", label: "🏪 Shop" },
  { to: "/inventory", label: "🎒 Inventory" },
  { to: "/activity", label: "📜 Activity" },
  { to: "/ai-advisor", label: "🤖 AI Advisor" },
];

export default function Sidebar({ onNavigate }) {
  return (
    <aside className="w-56 bg-gray-950 border-r border-purple-800 min-h-[calc(100vh-56px)] p-4 space-y-1">
      {links.map((link) => (
        <NavLink
          key={link.to}
          to={link.to}
          onClick={onNavigate}
          className={({ isActive }) =>
            `block px-3 py-2 rounded-lg text-sm ${
              isActive ? "bg-purple-700 text-white" : "text-gray-400 hover:bg-gray-800"
            }`
          }
        >
          {link.label}
        </NavLink>
      ))}
    </aside>
  );
}