// ─── Central game state ───────────────────────────────────────────────────────
// Single source of truth for all runtime game data.
// Import this wherever you need to read or write game state.

export const gameState = {
  // Loaded from Supabase
  animals: [],          // Array<{ id, name, slug, local_asset_key, icon_asset_key }>
  hintsByAnimal: {},    // { [animal_id]: Array<{ hint_text, hint_order }> }

  // Card assignment — populated after Supabase loads
  shuffledCards: [],    // Array<{ cardIndex: 0-5, animalId: string }>

  // Active turn
  activeCardId: null,   // cardIndex of selected card (0–5), or null
  activeAnimalId: null, // Supabase animal.id assigned to the active card

  // Hint progression for the active card
  currentHintIndex: 0,  // current position in hintsByAnimal[activeAnimalId]
  unlockedHints: [],    // Array<string> — hint_text values revealed so far

  // Completion tracking
  solvedCards: new Set(),  // cardIndex values for correct guesses
  failedCards: new Set(),  // cardIndex values where all hints were exhausted wrong

  // Timer (managed by gameView startGameTimer)
  timerSeconds: 300,
  timerInterval: null,

  // Overall status
  gameStatus: "idle"    // "idle" | "playing" | "complete"
};

// ─── Assign shuffled Supabase animals to card positions ───────────────────────
// Shuffles the Supabase animal list and maps each to a visual card slot (0–5).
// Sets gameState.shuffledCards and also stamps data-animal-id on each card DOM element.
export function assignAnimalsToCards(supabaseAnimals) {
  const shuffled = [...supabaseAnimals].sort(() => Math.random() - 0.5);

  gameState.shuffledCards = shuffled.map((animal, cardIndex) => ({
    cardIndex,
    animalId: animal.id
  }));

  // Stamp each card element so click handlers can resolve the animal
  const cardEls = document.querySelectorAll("#sb-grid .sb-card");
  cardEls.forEach((el, i) => {
    if (gameState.shuffledCards[i]) {
      el.dataset.animalId = gameState.shuffledCards[i].animalId;
    }
  });

  return gameState.shuffledCards;
}

// ─── Helper: look up which animal is behind a card ───────────────────────────
export function getAnimalForCard(cardIndex) {
  const entry = gameState.shuffledCards.find(c => c.cardIndex === cardIndex);
  if (!entry) return null;
  return gameState.animals.find(a => a.id === entry.animalId) ?? null;
}
