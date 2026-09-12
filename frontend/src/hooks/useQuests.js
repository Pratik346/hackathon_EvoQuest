
import { useState, useCallback } from "react";

import {
  getQuests,
  createQuest,
  updateQuest,
  deleteQuest,
  completeQuest,
} from "../api/quests.api";

export function useQuests() {
  const [quests, setQuests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchQuests = useCallback(async (params = {}) => {
    setLoading(true);
    setError("");

    try {
      const res = await getQuests(params);
      setQuests(res.data.quests);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const addQuest = useCallback(async (payload) => {
    const res = await createQuest(payload);

    setQuests((prev) => [
      res.data.quest,
      ...prev,
    ]);
  }, []);

  const editQuest = useCallback(async (id, payload) => {
    const res = await updateQuest(id, payload);

    setQuests((prev) =>
      prev.map((q) =>
        q._id === id
          ? res.data.quest
          : q
      )
    );
  }, []);

  const removeQuest = useCallback(async (id) => {
    await deleteQuest(id);

    setQuests((prev) =>
      prev.filter((q) => q._id !== id)
    );
  }, []);

  const finishQuest = useCallback(async (id) => {
    const res = await completeQuest(id);

    setQuests((prev) =>
      prev.map((q) =>
        q._id === id
          ? {
              ...q,
              completed: true,
            }
          : q
      )
    );

    return res.data;
  }, []);

  return {
    quests,
    loading,
    error,
    fetchQuests,
    addQuest,
    editQuest,
    removeQuest,
    finishQuest,
  };
}

