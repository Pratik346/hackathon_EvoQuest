const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const hpp = require('hpp');

const env = require('./config/env');

const notFound = require('./middleware/notFound.middleware');
const errorHandler = require('./middleware/error.middleware');
const { generalLimiter } = require('./middleware/rateLimiter.middleware');

const app = express();

// Security middleware
app.use(helmet());

app.use(hpp());

// CORS - must come before rate limiter
app.use(
  cors({
    origin: env.clientUrl,
    credentials: true,
  })
);

// Rate limiting
app.use(generalLimiter);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookies
app.use(cookieParser());

// Health check
app.get('/api/v1/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Life RPG API is running',
    data: {
      status: 'healthy',
    },
  });
});

// Routes
app.use('/api/v1/auth', require('./routes/auth.routes'));
app.use('/api/v1/character', require('./routes/character.routes'));
app.use('/api/v1/quests', require('./routes/quest.routes'));
app.use('/api/v1/activity', require('./routes/activity.routes'));
app.use('/api/v1/achievements', require('./routes/achievement.routes'));
app.use('/api/v1/shop', require('./routes/shop.routes'));
app.use('/api/v1/inventory', require('./routes/inventory.routes'));
app.use('/api/v1/ai', require('./routes/ai.routes'));

// Error handling
app.use(notFound);
app.use(errorHandler);

module.exports = app;