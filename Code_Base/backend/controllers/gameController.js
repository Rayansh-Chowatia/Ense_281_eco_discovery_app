// ─── Game Controller ──────────────────────────────────────────────────────────

import { fetchActiveAnimals, fetchAllHints } from '../models/animalModel.js';

/**
 * GET /api/animals
 * Returns all active animals as JSON array.
 */
export async function getAnimals(req, res) {
  try {
    const animals = await fetchActiveAnimals();
    return res.status(200).json(animals);
  } catch (err) {
    console.error('[gameController] getAnimals:', err.message);
    return res.status(500).json({ error: 'Failed to fetch animals.' });
  }
}

/**
 * GET /api/hints
 * Returns all hints as JSON array, ordered by hint_order asc.
 */
export async function getHints(req, res) {
  try {
    const hints = await fetchAllHints();
    return res.status(200).json(hints);
  } catch (err) {
    console.error('[gameController] getHints:', err.message);
    return res.status(500).json({ error: 'Failed to fetch hints.' });
  }
}
