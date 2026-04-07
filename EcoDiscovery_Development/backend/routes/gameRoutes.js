// ─── Game Routes ──────────────────────────────────────────────────────────────
// GET /api/animals   — public
// GET /api/hints     — public

import { Router } from 'express';
import { getAnimals, getHints } from '../controllers/gameController.js';

const router = Router();

router.get('/animals', getAnimals);
router.get('/hints',   getHints);

export default router;
