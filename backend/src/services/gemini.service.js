const { GoogleGenerativeAI } = require("@google/generative-ai");
const env = require("../config/env");
const Quest = require("../models/Quest");
const ActivityLog = require("../models/ActivityLog");

const genAI = new GoogleGenerativeAI(env.geminiApiKey);

const FALLBACK_ADVICE = {
  analysis:
    "Keep completing quests across different categories to build balanced attributes.",
  recommendations: [
    {
      title: "20-minute workout",
      category: "fitness",
      difficulty: "easy",
      attribute: "strength",
      reason: "Balances out non-physical activity.",
    },
    {
      title: "10-minute meditation",
      category: "wellness",
      difficulty: "easy",
      attribute: "discipline",
      reason: "Builds consistency.",
    },
    {
      title: "Read 10 pages",
      category: "reading",
      difficulty: "easy",
      attribute: "intelligence",
      reason: "Builds a consistent learning habit.",
    },
  ],
};

const buildPlayerProfile = async (user) => {
  const recentCompletedQuests = await Quest.find({
    user: user._id,
    completed: true,
  })
    .sort({ completedAt: -1 })
    .limit(10)
    .select("title category difficulty");

  const recentActivity = await ActivityLog.find({
    user: user._id,
  })
    .sort({ createdAt: -1 })
    .limit(10)
    .select("type message createdAt");

  return {
    level: user.level,
    xp: user.xp,
    attributes: user.attributes,
    currentStreak: user.currentStreak,
    longestStreak: user.longestStreak,

    recentCompletedQuests: recentCompletedQuests.map((q) => ({
      title: q.title,
      category: q.category,
      difficulty: q.difficulty,
    })),

    recentActivity: recentActivity.map((a) => ({
      type: a.type,
      message: a.message,
      createdAt: a.createdAt,
    })),
  };
};

const buildPrompt = (profile, userPrompt = "") => {
  const promptSection = userPrompt
    ? `
The player has also asked for:
"${userPrompt}"

Answer this request while considering the player's profile.
`
    : `
Give general personalized advice based on the player's profile.
`;

  return `
You are a game advisor for a life-gamification RPG app.

Analyze the player's progress and provide useful, realistic quest recommendations.

IMPORTANT RULES:
- Respond ONLY with valid JSON.
- Do not use markdown.
- Do not use code fences.
- Do not include text outside the JSON.
- You are an advisor only.
- Never change XP, Gold, Level, attributes, inventory, achievements, or purchases.
- Recommendations are suggestions only.
- Give exactly 3 recommendations.
- Prefer neglected categories and attributes.
${promptSection}

Player profile:
${JSON.stringify(profile, null, 2)}

Return exactly this JSON shape:

{
  "analysis": "1-2 sentence analysis of the player's progress, including strong and neglected attributes.",
  "recommendations": [
    {
      "title": "short quest title",
      "category": "one of: coding, study, fitness, wellness, reading, creative",
      "difficulty": "one of: easy, medium, hard, epic",
      "attribute": "one of: intelligence, strength, discipline, vitality",
      "reason": "1 sentence explaining why this is recommended"
    }
  ]
}
`;
};

const validateAdvice = (parsed) => {
  if (!parsed || typeof parsed !== "object") {
    return false;
  }

  if (typeof parsed.analysis !== "string" || !parsed.analysis.trim()) {
    return false;
  }

  if (
    !Array.isArray(parsed.recommendations) ||
    parsed.recommendations.length !== 3
  ) {
    return false;
  }

  const validCategories = new Set([
    "coding",
    "study",
    "fitness",
    "wellness",
    "reading",
    "creative",
  ]);

  const validDifficulties = new Set([
    "easy",
    "medium",
    "hard",
    "epic",
  ]);

  const validAttributes = new Set([
    "intelligence",
    "strength",
    "discipline",
    "vitality",
  ]);

  return parsed.recommendations.every((recommendation) => {
    return (
      recommendation &&
      typeof recommendation.title === "string" &&
      recommendation.title.trim() &&
      validCategories.has(recommendation.category) &&
      validDifficulties.has(recommendation.difficulty) &&
      validAttributes.has(recommendation.attribute) &&
      typeof recommendation.reason === "string" &&
      recommendation.reason.trim()
    );
  });
};

const getAdvice = async (user, userPrompt = "") => {
  const profile = await buildPlayerProfile(user);
  const prompt = buildPrompt(profile, userPrompt);

  const model = genAI.getGenerativeModel({
    model: "gemini-3.6-flash",
  });

  const result = await model.generateContent(prompt);
  const rawText = result.response.text();

  const cleaned = rawText
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    const parsed = JSON.parse(cleaned);

    if (!validateAdvice(parsed)) {
      throw new Error("Malformed AI response shape");
    }

    return parsed;
  } catch (err) {
    console.error(
      "Failed to parse/validate Gemini response, using fallback:",
      err.message
    );

    return FALLBACK_ADVICE;
  }
};

module.exports = {
  getAdvice,
};