const { parsePagination } = require('../utils/pagination');
const asyncHandler = require('../utils/asyncHandler');
const ActivityLog = require('../models/ActivityLog');

// @route GET /activity
exports.getActivity = asyncHandler(async (req, res) => {
  const { type } = req.query;

  const { page, limit, skip } = parsePagination(req.query);

  const filter = { user: req.user._id };

  if (type) filter.type = type;

  const [activities, total] = await Promise.all([
    ActivityLog.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),

    ActivityLog.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    message: 'Activity fetched successfully',
    data: {
      activities,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    },
  });
});