import api from "./axios";

export const getAchievements = () => api.get("/achievements");