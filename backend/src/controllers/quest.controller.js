const { parsePagination } = require('../utils/pagination');
const asyncHandler = require('../utils/asyncHandler');
const Quest = require('../models/Quest');
const { DIFFICULTY_REWARDS, CATEGORY_ATTRIBUTE_MAP } = require('../utils/constants');
const { applyXpGain } = require('../utils/calculateLevel');
const { calculateStreak } = require('../services/streak.service');
const { logActivity } = require('../services/activity.service');
const { checkAndUnlockAchievements } = require('../services/achievement.service');
// @route GET /quests
exports.getQuests = asyncHandler(async (req, res) => {
  const { status, category, difficulty } = req.query;

  const { page, limit, skip } = parsePagination(req.query);

  const filter = { user: req.user._id };

  if (status === 'active') filter.completed = false;
  if (status === 'completed') filter.completed = true;
  if (category) filter.category = category;
  if (difficulty) filter.difficulty = difficulty;

  const [quests, total] = await Promise.all([
    Quest.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    Quest.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    message: 'Quests fetched successfully',
    data: {
      quests,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
});

// @route POST /quests
exports.createQuest = asyncHandler(async (req, res) => {
  const { title, description, category, difficulty } = req.body;

  // Backend calculates rewards — frontend cannot override these
  const reward = DIFFICULTY_REWARDS[difficulty];
  const attribute = CATEGORY_ATTRIBUTE_MAP[category];

  const quest = await Quest.create({
    user: req.user._id,
    title,
    description,
    category,
    difficulty,
    xpReward: reward.xp,
    goldReward: reward.gold,
    attribute,
  });

  res.status(201).json({
    success: true,
    message: 'Quest created successfully',
    data: { quest },
  });
});

// @route GET /quests/:id
exports.getQuestById = asyncHandler(async (req, res) => {
  const quest = await Quest.findOne({ _id: req.params.id, user: req.user._id });

  if (!quest) {
    return res.status(404).json({ success: false, message: 'Quest not found', errors: [] });
  }

  res.status(200).json({
    success: true,
    message: 'Quest fetched successfully',
    data: { quest },
  });
});

// @route PATCH /quests/:id
exports.updateQuest = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // Only title/description are safely editable post-creation.
  // Category/difficulty changes would desync xpReward/goldReward — reject those here.

  const quest = await Quest.findOne({ _id: req.params.id, user: req.user._id });
  if (!quest) {
    return res.status(404).json({ success: false, message: 'Quest not found', errors: [] });
  }
  if (quest.completed) {
    return res.status(400).json({
      success: false,
      message: 'Cannot edit a completed quest',
      errors: [],
    });
  }

  if (title !== undefined) quest.title = title;
  if (description !== undefined) quest.description = description;
  await quest.save();

  res.status(200).json({
    success: true,
    message: 'Quest updated successfully',
    data: { quest },
  });
});

// @route DELETE /quests/:id
exports.deleteQuest = asyncHandler(async (req, res) => {
  const quest = await Quest.findOneAndDelete({ _id: req.params.id, user: req.user._id });

  if (!quest) {
    return res.status(404).json({ success: false, message: 'Quest not found', errors: [] });
  }

  res.status(200).json({
    success: true,
    message: 'Quest deleted successfully',
    data: null,
  });
});
exports.completeQuest = asyncHandler(async (req, res) => {
  const questId = req.params.id;
  const userId = req.user._id;

  // Atomic update: only succeeds if quest exists, belongs to user, and is NOT
  // already completed. This is the duplicate-completion / anti-cheat guard —
  // two simultaneous requests can't both succeed.
  const quest = await Quest.findOneAndUpdate(
    { _id: questId, user: userId, completed: false },
    { completed: true, completedAt: new Date() },
    { new: true }
  );

  if (!quest) {
    // Either it doesn't exist, isn't owned by this user, or was already completed.
    const exists = await Quest.findOne({ _id: questId, user: userId });
    if (exists && exists.completed) {
      return res.status(409).json({
        success: false,
        message: 'Quest has already been completed',
        errors: [],
      });
    }
    return res.status(404).json({ success: false, message: 'Quest not found', errors: [] });
  }

  const user = req.user;

  // Apply XP + level up (possibly multiple levels)
  const xpResult = applyXpGain(user.level, user.xp, quest.xpReward);
  user.level = xpResult.level;
  user.xp = xpResult.xp;

  // Apply gold + attribute
  user.gold += quest.goldReward;
  user.attributes[quest.attribute] = (user.attributes[quest.attribute] || 0) + quest.xpReward / 5;
  // ^ attribute gain formula: 1 attribute point per 5 XP. Adjust if the problem
  //   statement specifies exact numbers later (e.g. their example shows +10 Intelligence for +50 XP, which matches this 5:1 ratio).

  // Apply streak
  const streakResult = calculateStreak(user.lastQuestCompletedAt, user.currentStreak, user.longestStreak);
  user.currentStreak = streakResult.currentStreak;
  user.longestStreak = streakResult.longestStreak;
  user.lastQuestCompletedAt = new Date();

  await user.save();

  // Log the completion
  await logActivity({
    userId: user._id,
    type: 'quest_completed',
    message: `Completed "${quest.title}"`,
    xpEarned: quest.xpReward,
    goldEarned: quest.goldReward,
  });

  if (xpResult.leveledUp) {
    await logActivity({
      userId: user._id,
      type: 'level_up',
      message: `Reached Level ${xpResult.newLevel}`,
    });
  }

  // Check achievements (Day 6 wires this in — see note below)
  const unlockedAchievements = await checkAndUnlockAchievements(user);

  res.status(200).json({
    success: true,
    message: 'Quest completed!',
    data: {
      quest: {
        id: quest._id,
        completed: quest.completed,
        completedAt: quest.completedAt,
      },
      rewards: {
        xp: quest.xpReward,
        gold: quest.goldReward,
        attribute: quest.attribute,
        attributeXP: quest.xpReward / 5,
      },
      character: user.toCharacterJSON(xpResult.xpToNextLevel),
      events: {
        levelUp: xpResult.leveledUp,
        previousLevel: xpResult.previousLevel,
        newLevel: xpResult.newLevel,
        unlockedAchievements,
      },
    },
  });
});