// ─── Admin Controller ─────────────────────────────────────────────────────────
// All routes here are protected by authMiddleware.

import { listFeedback, deleteFeedbackById } from '../models/feedbackModel.js';

/**
 * GET /api/admin/feedback
 * Returns all feedback rows ordered by created_at desc.
 */
export async function getFeedback(req, res) {
  try {
    const rows = await listFeedback();
    return res.status(200).json(rows);
  } catch (err) {
    console.error('[adminController] getFeedback:', err.message);
    return res.status(500).json({ error: 'Failed to fetch feedback.' });
  }
}

/**
 * DELETE /api/admin/feedback/:id
 * Deletes one feedback row by UUID.
 */
export async function deleteFeedback(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: 'id is required.' });
  }

  try {
    await deleteFeedbackById(id);
    return res.status(204).send();
  } catch (err) {
    console.error('[adminController] deleteFeedback:', err.message);
    return res.status(500).json({ error: 'Failed to delete feedback.' });
  }
}
