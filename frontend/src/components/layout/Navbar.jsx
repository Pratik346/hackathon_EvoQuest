import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

export default function Navbar({ onMenuClick }) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 py-3 bg-gray-950 border-b border-purple-800">
      <div className="flex items-center gap-3">
        <button onClick={onMenuClick} className="sm:hidden text-xl" aria-label="Toggle menu">
          ☰
        </button>
        <Link to="/dashboard" className="font-bold text-purple-400">⚔️ Life RPG</Link>
      </div>
      <div className="flex items-center gap-4 text-sm">
        <span className="text-gray-300 hidden sm:inline">{user?.name}</span>
        <button onClick={handleLogout} className="text-red-400 hover:text-red-300">Logout</button>
      </div>
    </nav>
  );
}