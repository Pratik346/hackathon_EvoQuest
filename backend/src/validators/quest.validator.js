const { CATEGORIES, DIFFICULTIES } = require('../utils/constants');

const validateCreateQuest = (body) => {
  const errors = [];
  if (!body.title || body.title.trim() === '') {
    errors.push({ field: 'title', message: 'Title is required' });
  }
  if (!body.category || !CATEGORIES.includes(body.category)) {
    errors.push({ field: 'category', message: 'Invalid category' });
  }
  if (!body.difficulty || !DIFFICULTIES.includes(body.difficulty)) {
    errors.push({ field: 'difficulty', message: 'Invalid difficulty' });
  }
  return errors;
};

const validateUpdateQuest = (body) => {
  const errors = [];
  if (body.category && !CATEGORIES.includes(body.category)) {
    errors.push({ field: 'category', message: 'Invalid category' });
  }
  if (body.difficulty && !DIFFICULTIES.includes(body.difficulty)) {
    errors.push({ field: 'difficulty', message: 'Invalid difficulty' });
  }
  return errors;
};

module.exports = { validateCreateQuest, validateUpdateQuest };