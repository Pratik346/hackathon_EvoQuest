import api from "./axios";

export const getActivity = (params) => api.get("/activity", { params });