// ─── Feedback Model ───────────────────────────────────────────────────────────
// Queries the feedback table in Supabase.

import supabase from '../services/supabaseClient.js';

/**
 * Inserts a new feedback row.
 * @param {{ name: string, role: string, message: string, email?: string, rating?: number }} data
 */
export async function insertFeedback(data) {
  const { error } = await supabase
    .from('feedback')
    .insert([data]);

  if (error) throw new Error(`insertFeedback: ${error.message}`);
}

/**
 * Returns all feedback rows ordered by created_at descending.
 */
export async function listFeedback() {
  const { data, error } = await supabase
    .from('feedback')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) throw new Error(`listFeedback: ${error.message}`);
  return data;
}

/**
 * Deletes a feedback row by its UUID.
 * @param {string} id
 */
export async function deleteFeedbackById(id) {
  const { error } = await supabase
    .from('feedback')
    .delete()
    .eq('id', id);

  if (error) throw new Error(`deleteFeedbackById: ${error.message}`);
}
