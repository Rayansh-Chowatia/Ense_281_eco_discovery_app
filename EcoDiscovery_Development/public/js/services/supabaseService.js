import { SUPABASE_URL, SUPABASE_ANON_KEY } from "../config.js";

const HEADERS = {
  "apikey": SUPABASE_ANON_KEY,
  "Authorization": `Bearer ${SUPABASE_ANON_KEY}`,
  "Content-Type": "application/json"
};

/**
 * Fetches all active animals + their hints in two parallel requests.
 * Returns: { animals: [...], hintsByAnimal: { [animal_id]: [...hints sorted by hint_order] } }
 */
export async function fetchGameData() {
  const [animalsRes, hintsRes] = await Promise.all([
    fetch(`${SUPABASE_URL}/rest/v1/animals?is_active=eq.true&select=*`, { headers: HEADERS }),
    fetch(`${SUPABASE_URL}/rest/v1/animal_hints?select=*&order=hint_order.asc`,  { headers: HEADERS })
  ]);

  if (!animalsRes.ok) throw new Error(`Failed to fetch animals: ${animalsRes.status}`);
  if (!hintsRes.ok)   throw new Error(`Failed to fetch hints: ${hintsRes.status}`);

  const animals = await animalsRes.json();
  const hints   = await hintsRes.json();

  // Group hints by animal_id
  const hintsByAnimal = {};
  for (const hint of hints) {
    if (!hintsByAnimal[hint.animal_id]) hintsByAnimal[hint.animal_id] = [];
    hintsByAnimal[hint.animal_id].push(hint);
  }

  return { animals, hintsByAnimal };
}

/**
 * Maps a Supabase animal record's local_asset_key to the correct local image path.
 * Never fetches images from Supabase — always uses local assets.
 */
export function getAnimalImagePath(animal) {
  return `./assets/images/${animal.local_asset_key}`;
}
