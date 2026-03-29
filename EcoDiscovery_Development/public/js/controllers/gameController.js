import { gamePageData } from "../models/gameModel.js";
import { renderGamePage, startGameTimer } from "../views/gameView.js";
import { fetchGameData } from "../services/supabaseService.js";
import { gameState, assignAnimalsToCards } from "../state/gameState.js";

export async function initGamePage() {
  // 1. Render static page shell immediately — user sees UI right away
  renderGamePage(gamePageData);
  startGameTimer(300);

  // 2. Load animals + hints from Supabase
  try {
    const { animals, hintsByAnimal } = await fetchGameData();

    // 3. Store in central state
    gameState.animals       = animals;
    gameState.hintsByAnimal = hintsByAnimal;
    gameState.gameStatus    = "playing";

    // 4. Shuffle animals into card positions and stamp data-animal-id on DOM
    assignAnimalsToCards(animals);

    // Stage 5 verification — open DevTools console to confirm
    console.log(`✅ Supabase loaded: ${animals.length} animals, cards shuffled`);
    gameState.shuffledCards.forEach(({ cardIndex, animalId }) => {
      const animal = animals.find(a => a.id === animalId);
      console.log(`  Card ${cardIndex} → ${animal?.name} (${animal?.slug})`);
    });

  } catch (err) {
    console.error("❌ Failed to load game data from Supabase:", err);
  }
}
