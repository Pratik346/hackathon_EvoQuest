import api from "./axios";

export const getShopItems = () => api.get("/shop/items");
export const purchaseItem = (itemId) => api.post("/shop/purchase", { itemId });