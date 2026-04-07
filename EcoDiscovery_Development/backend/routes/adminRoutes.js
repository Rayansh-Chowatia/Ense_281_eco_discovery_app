// ─── Admin Routes ─────────────────────────────────────────────────────────────
// GET    /api/admin/feedback      — JWT protected
// DELETE /api/admin/feedback/:id  — JWT protected

import { Router } from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getFeedback, deleteFeedback } from '../controllers/adminController.js';

const router = Router();

router.get('/feedback',     authMiddleware, getFeedback);
router.delete('/feedback/:id', authMiddleware, deleteFeedback);

export default router;
