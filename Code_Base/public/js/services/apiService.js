// ─── Eco Discovery — API Service ──────────────────────────────────────────────
// Fetches game data from the Express backend.
// No credentials — the backend owns all Supabase access.

/**
 * Fetches all active animals + their hints from the backend in two parallel requests.
 * Returns: { animals: [...], hintsByAnimal: { [animal_id]: [...hints sorted by hint_order] } }
 */
export async function fetchGameData() {
  const [animalsRes, hintsRes] = await Promise.all([
    fetch('/api/animals'),
    fetch('/api/hints')
  ]);

  if (!animalsRes.ok) throw new Error(`Failed to fetch animals: ${animalsRes.status}`);
  if (!hintsRes.ok)   throw new Error(`Failed to fetch hints: ${hintsRes.status}`);

  const animals = await animalsRes.json();
  const hints   = await hintsRes.json();

  // Group hints by animal_id (same structure the game controller expects)
  const hintsByAnimal = {};
  for (const hint of hints) {
    if (!hintsByAnimal[hint.animal_id]) hintsByAnimal[hint.animal_id] = [];
    hintsByAnimal[hint.animal_id].push(hint);
  }

  return { animals, hintsByAnimal };
}

/**
 * Maps a Supabase animal record's local_asset_key to the correct local image path.
 * Never fetches images remotely — always uses local assets.
 */
export function getAnimalImagePath(animal) {
  return `./assets/images/${animal.local_asset_key}`;
}
