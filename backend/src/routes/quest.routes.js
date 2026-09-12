const express = require('express');
const router = express.Router();
const {
  getQuests,
  createQuest,
  getQuestById,
  updateQuest,
  deleteQuest,
} = require('../controllers/quest.controller');
const { protect } = require('../middleware/auth.middleware');
const validate = require('../middleware/validate.middleware');
const { validateCreateQuest, validateUpdateQuest } = require('../validators/quest.validator');
const { questCompleteLimiter } = require('../middleware/rateLimiter.middleware');
router.use(protect); // every quest route requires auth

router.route('/').get(getQuests).post(validate(validateCreateQuest), createQuest);
router
  .route('/:id')
  .get(getQuestById)
  .patch(validate(validateUpdateQuest), updateQuest)
  .delete(deleteQuest);
router.post('/:id/complete',questCompleteLimiter, require('../controllers/quest.controller').completeQuest);
module.exports = router;