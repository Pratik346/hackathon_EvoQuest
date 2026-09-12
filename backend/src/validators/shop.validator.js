const mongoose = require('mongoose');

const validatePurchase = (body) => {
  const errors = [];
  if (!body.itemId) {
    errors.push({ field: 'itemId', message: 'itemId is required' });
  } else if (!mongoose.Types.ObjectId.isValid(body.itemId)) {
    errors.push({ field: 'itemId', message: 'itemId is not a valid ID' });
  }
  return errors;
};

module.exports = { validatePurchase };