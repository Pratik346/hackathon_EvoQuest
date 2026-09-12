import api from "./axios";

export const getAdvice = (prompt = "") =>
api.post("/ai/advisor", { prompt });
