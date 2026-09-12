import { useState, useEffect } from "react";
import { CATEGORIES, DIFFICULTIES } from "../../utils/constants";
import Button from "../common/Button";

const empty = { title: "", description: "", category: CATEGORIES[0], difficulty: DIFFICULTIES[0] };

export default function QuestForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState(initial || empty);

  useEffect(() => {
    setForm(initial || empty);
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        placeholder="Quest title"
        className="w-full p-2 rounded bg-gray-800"
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Description"
        className="w-full p-2 rounded bg-gray-800"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <div className="flex gap-2">
        <select
          className="flex-1 p-2 rounded bg-gray-800"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
        >
          {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <select
          className="flex-1 p-2 rounded bg-gray-800"
          value={form.difficulty}
          onChange={(e) => setForm({ ...form, difficulty: e.target.value })}
        >
          {DIFFICULTIES.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>
      <div className="flex justify-end gap-2 pt-2">
        {onCancel && <Button variant="ghost" type="button" onClick={onCancel}>Cancel</Button>}
        <Button type="submit">Save Quest</Button>
      </div>
    </form>
  );
}