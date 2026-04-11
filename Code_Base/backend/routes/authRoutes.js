// ─── Auth Routes ──────────────────────────────────────────────────────────────
// POST /api/auth/login    — rate-limited, no auth required
// POST /api/auth/logout   — auth required
// GET  /api/auth/me       — auth required (session check on page load)

import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { login, logout, getMe } from '../controllers/authController.js';

const router = Router();

// 10 login attempts per 15 minutes per IP — brute-force protection
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many login attempts. Please try again in 15 minutes.' }
});

router.post('/login',  loginRateLimiter, login);
router.post('/logout', authMiddleware,   logout);
router.get('/me',      authMiddleware,   getMe);

export default router;
