const asyncHandler = require("../utils/asyncHandler");
const { getAdvice } = require("../services/gemini.service");

// @route POST /ai/advisor
exports.getAdvisorRecommendations = asyncHandler(async (req, res) => {
  try {
    const prompt =
      typeof req.body?.prompt === "string"
        ? req.body.prompt.trim()
        : "";

    const advice = await getAdvice(req.user, prompt);

    res.status(200).json({
      success: true,
      message: "AI advice generated successfully",
      data: advice,
    });
  } catch (err) {
    console.error("AI advisor failed:", err.message);

    res.status(503).json({
      success: false,
      message: "AI advisor is temporarily unavailable",
      errors: [],
    });
  }
});