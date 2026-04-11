// ─── Feedback Controller ──────────────────────────────────────────────────────

import { insertFeedback } from '../models/feedbackModel.js';

/**
 * POST /api/feedback
 * Body: { name, role, message, email?, rating? }
 * Returns: 201 on success.
 */
export async function submitFeedback(req, res) {
  const { name, role, message, email, rating } = req.body;

  if (!name || !role || !message) {
    return res.status(400).json({ error: 'name, role, and message are required.' });
  }

  const row = { name, role, message };
  if (email)  row.email  = email;
  if (rating) row.rating = rating;

  try {
    await insertFeedback(row);
    return res.status(201).json({ message: 'Feedback received.' });
  } catch (err) {
    console.error('[feedbackController] submitFeedback:', err.message);
    return res.status(500).json({ error: 'Failed to save feedback.' });
  }
}
