import { gamePageData } from "../models/gameModel.js";
import { renderGamePage, startGameTimer, stopGameTimer, stopDangerMode } from "../views/gameView.js";
import { fetchGameData } from "../services/apiService.js";
import { gameState, assignAnimalsToCards } from "../state/gameState.js";
import { initTrashDrag } from "./trashDrag.js";

// ── UI helpers ────────────────────────────────────────────────────────────────

function updateGuide(message) {
  const el = document.getElementById("guide-message");
  if (el) el.textContent = message;
}

function updateFishFacts(text) {
  const el = document.getElementById("fish-facts-text");
  if (el) el.textContent = text;
}

function updateCounter() {
  const label = document.getElementById("sb-count");
  const bar   = document.getElementById("sb-progress-bar");
  const pct   = gameState.animals.length
    ? (gameState.solvedCards.size / gameState.animals.length) * 100
    : 0;
  if (label) label.textContent = `${gameState.solvedCards.size} / ${gameState.animals.length}`;
  if (bar)   bar.style.width = pct + "%";
  document.querySelectorAll("#sb-stars .sb-star").forEach((star, i) => {
    star.classList.toggle("lit", i < gameState.solvedCards.size);
  });
}

// Render unlocked hints into the 3 pill slots.
// Locked pills show the "Hint 1/2/3" placeholder; unlocked pills show the actual hint text.
function renderHintHistory() {
  const pills = document.querySelectorAll("#hint-history-list .hint-pill");
  pills.forEach((pill, i) => {
    const textEl = pill.querySelector(".hint-pill-text");
    const hint   = gameState.unlockedHints[i];
    if (hint) {
      pill.classList.add("hint-pill--unlocked");
      if (textEl) textEl.textContent = hint;
    } else {
      pill.classList.remove("hint-pill--unlocked");
      if (textEl) textEl.textContent = "";
    }
  });
}

// ── Animation helpers ─────────────────────────────────────────────────────────

function pauseCardPulse() {
  document.querySelectorAll("#sb-grid .sb-card").forEach(card => {
    card.style.animationPlayState = "paused";
  });
}

function resumeCardPulse() {
  document.querySelectorAll("#sb-grid .sb-card").forEach((card, i) => {
    if (!gameState.solvedCards.has(i) && !gameState.failedCards.has(i)) {
      card.style.animationPlayState = "running";
    }
  });
}

function shakeCreature(slug) {
  const el = document.querySelector(`[data-animal-slug="${slug}"]`);
  if (!el) return;
  el.classList.add("game-creature--shake");
  el.addEventListener("animationend", () => el.classList.remove("game-creature--shake"), { once: true });
}

// Sync all hint-pill backgrounds and sb-feedback to the clicked card's color
function syncFeedbackColor(card) {
  const feedback = document.getElementById("sb-feedback");
  if (!feedback) return;
  const color = getComputedStyle(card).getPropertyValue("--card-color").trim();
  feedback.style.setProperty("--active-card-color", color);
}

// ── Stage 7: Card selection ───────────────────────────────────────────────────

function attachCardClickHandlers() {
  const cards = document.querySelectorAll("#sb-grid .sb-card");

  cards.forEach((card, i) => {
    card.addEventListener("click", () => {
      // Guard: Supabase data not loaded yet
      if (gameState.animals.length === 0) return;

      const cardIndex = i;
      const animalId  = card.dataset.animalId;

      // Solved / failed cards: replay all their hints for review (only if no active turn)
      if (gameState.solvedCards.has(cardIndex) || gameState.failedCards.has(cardIndex)) {
        if (gameState.activeCardId !== null) return; // don't disrupt an active turn
        const resolvedAnimalId = card.dataset.animalId;
        if (!resolvedAnimalId) return;
        const allHints = gameState.hintsByAnimal[resolvedAnimalId] ?? [];
        gameState.unlockedHints = allHints.map(h => h.hint_text);
        syncFeedbackColor(card);
        renderHintHistory();
        if (allHints.length > 0) updateFishFacts(allHints[allHints.length - 1].hint_text);
        return;
      }

      // Animal not stamped yet (shouldn't happen after load, but guard anyway)
      if (!animalId) return;

      // Same card re-clicked — do nothing
      if (gameState.activeCardId === cardIndex) return;

      // ── Activate this card ──
      cards.forEach(c => c.classList.remove("sb-card--active"));
      card.classList.add("sb-card--active");

      gameState.activeCardId   = cardIndex;
      gameState.activeAnimalId = animalId;
      gameState.currentHintIndex = 0;
      gameState.unlockedHints    = [];

      // Sync hint area color to this card's color
      syncFeedbackColor(card);

      // Pause all card pulse animations
      pauseCardPulse();

      // ── Stage 8: Load first hint ──
      const hints = gameState.hintsByAnimal[animalId];
      if (hints && hints.length > 0) {
        gameState.unlockedHints = [hints[0].hint_text];
        updateFishFacts(hints[0].hint_text);
      } else {
        updateFishFacts("No hints available");
      }
      renderHintHistory();

      updateGuide("Now tap the fish you think matches");
    });
  });
}

// ── Stage 9: Fish click validation ────────────────────────────────────────────

function attachCreatureClickHandlers() {
  document.querySelectorAll(".game-creature").forEach(creature => {
    creature.addEventListener("click", () => {
      // No card selected — ignore
      if (gameState.activeCardId === null) return;

      const clickedSlug   = creature.dataset.animalSlug;
      const clickedAnimal = gameState.animals.find(a => a.slug === clickedSlug);
      if (!clickedAnimal) return;

      if (clickedAnimal.id === gameState.activeAnimalId) {
        handleCorrectGuess();
      } else {
        handleWrongGuess(clickedSlug);
      }
    });
  });
}

// ── Stage 8 / 10: Correct guess ───────────────────────────────────────────────

function handleCorrectGuess() {
  const cardIndex = gameState.activeCardId;
  const animal    = gameState.animals.find(a => a.id === gameState.activeAnimalId);
  const cardEl    = document.querySelectorAll("#sb-grid .sb-card")[cardIndex];
  if (!cardEl || !animal) return;

  // Flip + reveal
  cardEl.classList.remove("sb-card--active");
  cardEl.classList.add("sb-card--flipped", "sb-card--solved");

  const faceEl = cardEl.querySelector(".sb-card-face");
  if (faceEl) {
    faceEl.innerHTML = `
      <span class="sb-card-face-name">${animal.name}</span>
      <img src="./assets/images/${animal.local_asset_key}" alt="${animal.name}" class="sb-card-reveal-img">
      <span class="sb-card-check" aria-hidden="true">✓</span>
    `;
  }

  // Update state — leave unlockedHints intact so the child can see which clues they used.
  // Hints are cleared when the next card is selected (in attachCardClickHandlers).
  gameState.solvedCards.add(cardIndex);
  gameState.activeCardId     = null;
  gameState.activeAnimalId   = null;
  gameState.currentHintIndex = 0;

  updateFishFacts("Select a card to see a hint!");
  updateCounter();
  resumeCardPulse();

  // Guide message
  const allDone = gameState.solvedCards.size + gameState.failedCards.size >= gameState.animals.length;
  if (allDone) {
    showEndOverlay();
  } else {
    updateGuide("Great job! Pick another mystery sticker");
  }
}

// ── Stage 8 / 11: Wrong guess ─────────────────────────────────────────────────

function handleWrongGuess(clickedSlug) {
  shakeCreature(clickedSlug);

  // Flash the active card red to reinforce the wrong feedback
  const activeCardEl = document.querySelectorAll("#sb-grid .sb-card")[gameState.activeCardId];
  if (activeCardEl) {
    activeCardEl.classList.add("sb-card--wrong-flash");
    activeCardEl.addEventListener("animationend", () => {
      activeCardEl.classList.remove("sb-card--wrong-flash");
    }, { once: true });
  }

  const hints   = gameState.hintsByAnimal[gameState.activeAnimalId] ?? [];
  const nextIdx = gameState.currentHintIndex + 1;

  if (nextIdx < hints.length) {
    // Reveal next hint
    gameState.currentHintIndex = nextIdx;
    const newHint = hints[nextIdx].hint_text;
    gameState.unlockedHints.push(newHint);
    updateFishFacts(newHint);
    renderHintHistory();
    updateGuide("Wrong guess, read another hint and try again");
  } else {
    // All hints exhausted → failure
    handleFailure();
  }
}

// ── Stage 8 / 11: Failure state ───────────────────────────────────────────────

function handleFailure() {
  const cardIndex = gameState.activeCardId;
  const animal    = gameState.animals.find(a => a.id === gameState.activeAnimalId);
  const cardEl    = document.querySelectorAll("#sb-grid .sb-card")[cardIndex];
  if (!cardEl || !animal) return;

  // Flip + fail
  cardEl.classList.remove("sb-card--active");
  cardEl.classList.add("sb-card--flipped", "sb-card--failed");

  const faceEl = cardEl.querySelector(".sb-card-face");
  if (faceEl) {
    faceEl.innerHTML = `
      <span class="sb-card-face-name">${animal.name}</span>
      <img src="./assets/images/${animal.local_asset_key}" alt="${animal.name}" class="sb-card-reveal-img sb-card-reveal-img--failed">
      <span class="sb-card-fail-x" aria-hidden="true">✕</span>
    `;
  }

  // Update state — keep unlockedHints so renderHintHistory shows ALL hints the child saw.
  // Hints are cleared when the next card is selected (in attachCardClickHandlers).
  gameState.failedCards.add(cardIndex);
  gameState.activeCardId     = null;
  gameState.activeAnimalId   = null;
  gameState.currentHintIndex = 0;

  // Show all accumulated hints in history, then clear the Fish Facts box.
  renderHintHistory();
  updateFishFacts("Select a card to see a hint!");
  updateCounter();
  resumeCardPulse();

  const allDone = gameState.solvedCards.size + gameState.failedCards.size >= gameState.animals.length;
  if (allDone) {
    showEndOverlay();
  } else {
    updateGuide("That was not correct. Pick another card and try again");
  }
}

// ── Stage 13: Reset helpers ───────────────────────────────────────────────────

// The 6 card colors from the model — shuffled independently of animals on reset.
const CARD_COLORS = ["#f9a8d4", "#93c5fd", "#fcd34d", "#86efac", "#c4b5fd", "#fdba74"];

function shuffleColors() {
  return [...CARD_COLORS].sort(() => Math.random() - 0.5);
}

// Stamp new --card-color on each card and sync the 3 hint-pill default colors.
function applyShuffledColors(colors) {
  const cards = document.querySelectorAll("#sb-grid .sb-card");
  cards.forEach((card, i) => card.style.setProperty("--card-color", colors[i]));

  // Hint pills 0-2 take the first 3 new card colors as their locked placeholder color.
  const pills = document.querySelectorAll("#hint-history-list .hint-pill");
  pills.forEach((pill, i) => pill.style.setProperty("--pill-color", colors[i]));
}

// Returns a Promise that resolves once all 6 card shuffle animations finish.
function playShuffleAnimation() {
  return new Promise(resolve => {
    const cards  = [...document.querySelectorAll("#sb-grid .sb-card")];
    let done = 0;

    cards.forEach(card => {
      card.classList.add("sb-card--shuffling");
      card.addEventListener("animationend", () => {
        card.classList.remove("sb-card--shuffling");
        if (++done === cards.length) resolve();
      }, { once: true });
    });
  });
}

// ── End-game overlay ─────────────────────────────────────────────────────────

function showEndOverlay() {
  gameState.gameStatus = "complete";

  // Stop the timer and clear danger mode
  stopGameTimer();
  stopDangerMode();

  // Freeze all scene animations (birds, fish, crab, trash)
  const sceneContainer = document.querySelector(".game-scene-container");
  if (sceneContainer) sceneContainer.classList.add("game-scene--frozen");

  // Stop reset-button pulse if running
  const resetBtn = document.getElementById("btn-reset");
  if (resetBtn) resetBtn.classList.remove("sb-reset-btn--pulse");

  const solved = gameState.solvedCards.size;
  const total  = gameState.animals.length || 6;

  let message;
  if      (solved === total)                          message = "Great job! You found them all! 🎉";
  else if (solved >= Math.ceil(total * 0.75))         message = "So close! Amazing work!";
  else if (solved >= Math.ceil(total / 2))            message = "Good try! Can you beat your score?";
  else if (solved > 0)                                message = "Keep exploring! Try again!";
  else                                                message = "Don't give up! You'll do better next time!";

  // Remove any stale overlay first
  document.getElementById("game-end-overlay")?.remove();

  const overlay = document.createElement("div");
  overlay.className = "game-start-overlay game-end-overlay";
  overlay.id        = "game-end-overlay";
  overlay.innerHTML = `
    <div class="game-start-content">
      <p class="game-end-score">${solved}<span class="game-end-total"> / ${total}</span></p>
      <p class="game-end-label">animals discovered</p>
      <p class="game-start-tagline">${message}</p>
      <button class="game-start-btn" id="btn-end-restart">&#8635; Restart</button>
    </div>
  `;

  document.querySelector(".game-scene-container")?.appendChild(overlay);

  document.getElementById("btn-end-restart")?.addEventListener("click", () => {
    overlay.classList.add("game-start-overlay--out");
    overlay.addEventListener("animationend", () => overlay.remove(), { once: true });
    handleReset();
  });

  updateGuide("Press Restart or Reset Sticker Book to play again!");
}

// ── Timer expiry: force-fail all remaining cards ──────────────────────────────

function handleTimerExpiry() {
  if (gameState.animals.length === 0) return;
  stopDangerMode();

  const cards = document.querySelectorAll("#sb-grid .sb-card");

  // Cancel any active selection cleanly
  if (gameState.activeCardId !== null) {
    const activeCard = cards[gameState.activeCardId];
    if (activeCard) activeCard.classList.remove("sb-card--active");
    gameState.activeCardId     = null;
    gameState.activeAnimalId   = null;
    gameState.currentHintIndex = 0;
  }

  // Flip every card still unsolved/unfailed into the failed state
  cards.forEach((cardEl, i) => {
    if (gameState.solvedCards.has(i) || gameState.failedCards.has(i)) return;

    const animalId = cardEl.dataset.animalId;
    if (!animalId) return;
    const animal = gameState.animals.find(a => a.id === animalId);
    if (!animal) return;

    const faceEl = cardEl.querySelector(".sb-card-face");
    if (faceEl) {
      faceEl.innerHTML = `
        <span class="sb-card-face-name">${animal.name}</span>
        <img src="./assets/images/${animal.local_asset_key}" alt="${animal.name}"
             class="sb-card-reveal-img sb-card-reveal-img--failed">
        <span class="sb-card-fail-x" aria-hidden="true">✕</span>
      `;
    }

    cardEl.classList.remove("sb-card--active");
    cardEl.classList.add("sb-card--flipped", "sb-card--failed");
    gameState.failedCards.add(i);
  });

  // Clear hint UI
  gameState.unlockedHints = [];
  renderHintHistory();
  updateFishFacts("Time's up! Better luck next time!");
  resumeCardPulse();

  // Small delay so card flip animations finish before overlay appears
  setTimeout(showEndOverlay, 600);
}

// ── Stage 13: Reset ───────────────────────────────────────────────────────────

let _resetting = false;

async function handleReset() {
  if (_resetting) return;
  _resetting = true;

  // Remove any end overlay and reset-button pulse
  document.getElementById("game-end-overlay")?.remove();
  const resetBtn = document.getElementById("btn-reset");
  if (resetBtn) resetBtn.classList.remove("sb-reset-btn--pulse");

  // Unfreeze scene so animations run again
  const sceneContainer = document.querySelector(".game-scene-container");
  if (sceneContainer) sceneContainer.classList.remove("game-scene--frozen");

  // 1. Clear game state
  gameState.solvedCards      = new Set();
  gameState.failedCards      = new Set();
  gameState.unlockedHints    = [];
  gameState.activeCardId     = null;
  gameState.activeAnimalId   = null;
  gameState.currentHintIndex = 0;
  gameState.gameStatus       = "playing";

  // 2. Clear feedback area color and UI text immediately
  const feedback = document.getElementById("sb-feedback");
  if (feedback) feedback.style.removeProperty("--active-card-color");

  updateFishFacts("Select a card to see a hint!");
  updateGuide("Click on a mystery box to start");
  updateCounter();
  renderHintHistory();

  // 3. Restore all cards to clean mystery state before animating
  document.querySelectorAll("#sb-grid .sb-card").forEach(card => {
    card.classList.remove("sb-card--active", "sb-card--flipped", "sb-card--solved", "sb-card--failed");
    card.style.animationPlayState = "";

    const faceEl = card.querySelector(".sb-card-face");
    if (faceEl) faceEl.innerHTML = `<span class="sb-card-qmark" aria-hidden="true">?</span>`;

    const nameEl = card.querySelector(".sb-card-name");
    if (nameEl) nameEl.textContent = "Mystery Fish";
  });

  // 4. Restart timer right away — counts down while cards animate
  stopDangerMode();
  startGameTimer(120, handleTimerExpiry);

  // 5. Play shuffle bounce animation on all 6 mystery cards
  await playShuffleAnimation();

  // 6. After animation: apply shuffled colors + re-assign animals
  const newColors = shuffleColors();
  applyShuffledColors(newColors);
  assignAnimalsToCards(gameState.animals);

  _resetting = false;
}

// ── Init ──────────────────────────────────────────────────────────────────────

function attachStartButton() {
  const startBtn      = document.getElementById("btn-start");
  const overlay       = document.getElementById("game-start-overlay");
  const sceneContainer = document.querySelector(".game-scene-container");

  if (!startBtn) return;

  startBtn.addEventListener("click", () => {
    // 1. Unfreeze scene creatures and birds
    if (sceneContainer) sceneContainer.classList.remove("game-scene--frozen");

    // 2. Resume sticker card pulses (only unsolved/unfailed cards)
    resumeCardPulse();

    // 3. Start the countdown timer
    startGameTimer(120, handleTimerExpiry);

    // 4. Animate the overlay out then remove it
    if (overlay) {
      overlay.classList.add("game-start-overlay--out");
      overlay.addEventListener("animationend", () => overlay.remove(), { once: true });
    }

    // 5. Update guide for the real game
    updateGuide("Click on a mystery box to start");
  });
}

export async function initGamePage() {
  // 1. Render static page shell immediately — user sees UI right away
  renderGamePage(gamePageData);

  // 2. Freeze scene & cards until Start is pressed
  const sceneContainer = document.querySelector(".game-scene-container");
  if (sceneContainer) sceneContainer.classList.add("game-scene--frozen");
  pauseCardPulse();
  const timerEl = document.getElementById("game-timer");
  if (timerEl) timerEl.textContent = "02:00";

  // Init trash drag-and-drop
  initTrashDrag();
  updateGuide("Press ▶ Start to begin your adventure!");

  // 3. Attach card click handlers (color sync + Stage 7 selection logic)
  attachCardClickHandlers();

  // 4. Wire reset button
  const resetBtn = document.getElementById("btn-reset");
  if (resetBtn) resetBtn.addEventListener("click", handleReset);

  // 5. Wire start button
  attachStartButton();

  // 6. Load animals + hints from Supabase
  try {
    const { animals, hintsByAnimal } = await fetchGameData();

    gameState.animals       = animals;
    gameState.hintsByAnimal = hintsByAnimal;
    gameState.gameStatus    = "playing";

    // Shuffle animals into card positions — stamps data-animal-id on DOM
    assignAnimalsToCards(animals);

    // 7. Attach creature click handlers after animal data is ready (Stage 9)
    attachCreatureClickHandlers();

    console.log(`✅ Supabase loaded: ${animals.length} animals, cards shuffled`);
    gameState.shuffledCards.forEach(({ cardIndex, animalId }) => {
      const animal = animals.find(a => a.id === animalId);
      console.log(`  Card ${cardIndex} → ${animal?.name} (${animal?.slug})`);
    });

  } catch (err) {
    console.error("❌ Failed to load game data from Supabase:", err);
  }
}
