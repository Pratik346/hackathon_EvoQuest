import { CATEGORIES, DIFFICULTIES } from "../../utils/constants";

export default function QuestFilters({ filters, onChange }) {
  return (
    <div className="flex flex-wrap gap-2 mb-4">
      <select
        className="bg-gray-800 rounded px-2 py-1 text-sm"
        value={filters.status || ""}
        onChange={(e) => onChange({ ...filters, status: e.target.value || undefined })}
      >
        <option value="">All statuses</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <select
        className="bg-gray-800 rounded px-2 py-1 text-sm"
        value={filters.category || ""}
        onChange={(e) => onChange({ ...filters, category: e.target.value || undefined })}
      >
        <option value="">All categories</option>
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>

      <select
        className="bg-gray-800 rounded px-2 py-1 text-sm"
        value={filters.difficulty || ""}
        onChange={(e) => onChange({ ...filters, difficulty: e.target.value || undefined })}
      >
        <option value="">All difficulties</option>
        {DIFFICULTIES.map((d) => (
          <option key={d} value={d}>{d}</option>
        ))}
      </select>
    </div>
  );
}