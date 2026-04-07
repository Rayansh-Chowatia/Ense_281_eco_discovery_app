// ─── Animal Model ─────────────────────────────────────────────────────────────
// Queries the animals and animal_hints tables in Supabase.

import supabase from '../services/supabaseClient.js';

/**
 * Returns all active animals (is_active = true).
 */
export async function fetchActiveAnimals() {
  const { data, error } = await supabase
    .from('animals')
    .select('*')
    .eq('is_active', true);

  if (error) throw new Error(`fetchActiveAnimals: ${error.message}`);
  return data;
}

/**
 * Returns all hints ordered by hint_order ascending.
 */
export async function fetchAllHints() {
  const { data, error } = await supabase
    .from('animal_hints')
    .select('*')
    .order('hint_order', { ascending: true });

  if (error) throw new Error(`fetchAllHints: ${error.message}`);
  return data;
}
