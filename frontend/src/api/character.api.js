import api from "./axios";

export const getCharacter = () => api.get("/character");