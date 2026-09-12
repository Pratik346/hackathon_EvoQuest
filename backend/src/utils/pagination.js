// Centralizes page/limit parsing + clamping so every list route behaves identically
// and can't be abused with ?limit=999999.

const parsePagination = (query) => {
  let page = Number.parseInt(query.page, 10);
  let limit = Number.parseInt(query.limit, 10);

  if (!Number.isInteger(page) || page < 1) page = 1;
  if (!Number.isInteger(limit) || limit < 1) limit = 20;
  if (limit > 100) limit = 100; // hard ceiling

  const skip = (page - 1) * limit;
  return { page, limit, skip };
};

module.exports = { parsePagination };