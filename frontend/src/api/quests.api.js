import api from "./axios";

export const getQuests = (params) => api.get("/quests", { params });
export const getQuest = (id) => api.get(`/quests/${id}`);
export const createQuest = (payload) => api.post("/quests", payload);
export const updateQuest = (id, payload) => api.patch(`/quests/${id}`, payload);
export const deleteQuest = (id) => api.delete(`/quests/${id}`);
export const completeQuest = (id) => api.post(`/quests/${id}/complete`);