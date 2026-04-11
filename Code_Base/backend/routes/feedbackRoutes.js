// ─── Feedback Routes ──────────────────────────────────────────────────────────
// POST /api/feedback  — public (any visitor can submit)

import { Router } from 'express';
import { submitFeedback } from '../controllers/feedbackController.js';

const router = Router();

router.post('/feedback', submitFeedback);

export default router;
