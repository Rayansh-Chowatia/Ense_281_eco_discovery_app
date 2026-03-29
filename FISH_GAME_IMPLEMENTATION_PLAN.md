# Fish Guessing Game — Full Implementation Plan

**Project:** EcoDiscovery Freshwater Fish Guessing Game
**Target audience:** Children (ages 6–10)
**Stack:** Vanilla JS (MVC), CSS animations, Supabase (PostgreSQL)
**Working directory:** `EcoDiscovery_Development/public/`

---

## 1. Game Overview

When the child enters the game page:

1. Six animated creatures are already moving in the river scene (see Section 5)
2. The sticker book on the right shows **6 mystery cards**, each with a `?` and a color
3. The child picks a mystery card — a hint appears
4. They tap the fish they think matches the hint
5. Correct → card flips and reveals the fish
6. Wrong → a new hint auto-reveals, they try again
7. After all 6 cards are solved (or failed), the game is complete

**Active creatures in water (6 total):**

| Creature | Image file | CSS class |
|---|---|---|
| Walleye | `walleye.png` | `.game-fish` |
| Lake Sturgeon | `lake_sturgeon.png` | `.game-fish2` |
| Crayfish | `crayfish.png` | `.game-crab` |
| Lake Whitefish | `lake_whitefish.png` | `.game-fish3` |
| Goldeye | `goldeye.png` | `.game-fish4` |
| Northern Pike | `northen_pike.png` | `.game-fish5` |

---

## 2. UI Changes (Mandatory)

### 2.1 Rename Sections

| Current label | New label | New purpose |
|---|---|---|
| `Hint` (purple button) | `Guide` | Dynamic instruction text based on game state |
| `Fish Facts` (green button) | `Fish Facts` | Shows **only the most recent hint** for the active card |
| `Great job` area | Hint History | Shows **all unlocked hints** stacked vertically |

### 2.2 Guide — Dynamic Messages

The Guide box replaces the static "Hint" box. It must update immediately on every state change.

| Game state | Guide message |
|---|---|
| Default (no card selected) | `Pick a mystery sticker` |
| Card selected | `Now tap the fish you think matches` |
| Wrong guess, hints remaining | `Wrong guess, read another hint and try again` |
| New hint auto-revealed (after wrong guess) | `Wrong guess, read another hint and try again` *(unchanged)* |
| All hints used, still wrong | `That was not correct. Pick another card and try again` |
| Correct guess | `Great job! Pick another mystery sticker` |
| All 6 cards completed | `Amazing! You found all the fish!` |

**Rules:**
- Updates immediately after: card click, fish click, hint reveal, success, failure
- Never shows multiple messages at once
- Text must be short and readable for kids

### 2.3 Fish Facts Box (Latest Hint)

- Displays only the **single most recent hint** revealed for the active card
- Clears when a new card is selected
- Updates each time a new hint is revealed

### 2.4 Hint History (was "Great job" area)

- Displays **all hints unlocked so far** for the active card, stacked vertically
- Each hint pill:
  - Rounded rectangle
  - Background color matches the active card's color
  - Includes spark effect (`.sb-spark` elements)
  - Stacked from first to latest (top to bottom)
- Clears when a new card is selected

---

## 3. Card Interaction Rules

### 3.1 Default State

- All 6 cards pulse with the `cardSequentialGlow` animation (already implemented)
- Each card pulses in sequence with 1.2s stagger (already in CSS)

### 3.2 On Card Click

- **Stop** `cardSequentialGlow` on all cards (`animation-play-state: paused`)
- The clicked card switches to an **active state**:
  - Scale up slightly (e.g. `transform: scale(1.12)`)
  - Persistent glow matching its card color
  - CSS class: `.sb-card--active`
- Only one card can be active at a time

### 3.3 Active Card Clears When

- Another card is clicked (new card becomes active)
- The card is solved (correct guess)
- The card has failed (all hints exhausted, wrong)

### 3.4 Resuming Pulse

- When active card clears without selecting another, resume `cardSequentialGlow` on all remaining unsolved/unfailed cards

---

## 4. Gameplay Logic

### Step 1 — Select a Card

1. Player clicks a mystery card
2. Look up which `animal` is assigned to this card (from `shuffledCards` state)
3. Fetch that animal's hints from `hintsByAnimal` (already loaded on game start)
4. Set `currentHintIndex = 0`
5. Show first hint in **Fish Facts** box
6. Add first hint to `unlockedHints`
7. Update **Guide** → `"Now tap the fish you think matches"`

---

### Step 2 — Player Clicks a Fish

#### If correct (clicked fish matches active card's animal):

1. Play card flip animation (`.sb-card--flipped`)
2. Replace `?` on card face with:
   - Fish image (mapped from `local_asset_key`)
   - Fish name below the image
3. Mark card as **solved** → add to `solvedCards`
4. Clear `activeCardId`
5. Resume pulse animation on remaining cards
6. Update **Guide** → `"Great job! Pick another mystery sticker"`
7. Increment `0 / 6 found` counter by 1
8. Check if all 6 solved → if yes, update Guide → `"Amazing! You found all the fish!"`

#### If wrong:

1. Play **shake animation** on the clicked fish image
2. Increment internal wrong-guess counter for this card
3. Check if next hint exists (`currentHintIndex + 1 < totalHints`):
   - Yes → auto-reveal next hint:
     - Increment `currentHintIndex`
     - Update **Fish Facts** with new hint text
     - Add to `unlockedHints`
     - Update **Guide** → `"Wrong guess, read another hint and try again"`
   - No (all hints exhausted) → failure state:
     - Flip card anyway (`.sb-card--flipped`)
     - Show fish name + image on card
     - Overlay large `✕` on card face
     - Apply dim filter (`.sb-card--failed` → `filter: brightness(0.55) saturate(0.4)`)
     - Add to `failedCards`
     - Clear `activeCardId`
     - Resume pulse on remaining cards
     - Update **Guide** → `"That was not correct. Pick another card and try again"`

---

## 5. Fish in Water — Positions and Animations

All 6 creatures must move according to their real freshwater habitat and behavior.

> **Scene reference:**
> - Bottom 5–15% = riverbed / sandy floor
> - Bottom 15–40% = deep water
> - Bottom 40–55% = mid water
> - Bottom 55–65% = near surface
> The background image (`Game-page-image.png`) shows the split-view river.

---

### 5.1 Walleye — `.game-fish` — `walleye.png`

**Habitat:** Bottom and mid-water. Low-light predator. Active near rocky substrate. Avoids bright surface light.

**Size:** `clamp(85px, 7.5vw, 140px)` (current)

**Animation:** `fishDive` — 11s — dives from riverbed up to mid-water and back

```css
/* Current — keep as-is */
@keyframes fishDive {
  0%   { left: 32%; bottom: 10%; transform: rotate(-20deg); }
  44%  { left: 64%; bottom: 44%; transform: rotate(-20deg); }
  50%  { left: 64%; bottom: 44%; transform: scaleX(-1) rotate(20deg); }
  94%  { left: 32%; bottom: 10%; transform: scaleX(-1) rotate(20deg); }
  100% { left: 32%; bottom: 10%; transform: rotate(-20deg); }
}
```

---

### 5.2 Lake Sturgeon — `.game-fish2` — `lake_sturgeon.png`

**Habitat:** Deep riverbed. Slow, large bottom feeder. Stays near the deepest channel. Does not surface.

**Size:** `clamp(90px, 8vw, 150px)` (current)

**Animation:** `fishSwimDeep` — 25s — slow deep sweeps staying near the bottom

```css
/* Current — keep as-is */
@keyframes fishSwimDeep {
  0%   { left: 78%; bottom: 40%; transform: scaleX(-1) rotate(18deg); }
  30%  { left: 52%; bottom: 14%; transform: scaleX(-1) rotate(18deg); }
  43%  { left: 28%; bottom: 11%; transform: scaleX(-1) rotate(3deg);  }
  50%  { left: 28%; bottom: 40%; transform: scaleX(-1) rotate(-18deg); }
  52%  { left: 28%; bottom: 40%; transform: scaleX(1)  rotate(18deg); }
  65%  { left: 52%; bottom: 14%; transform: scaleX(1)  rotate(18deg); }
  80%  { left: 68%; bottom: 11%; transform: scaleX(1)  rotate(3deg);  }
  97%  { left: 78%; bottom: 40%; transform: scaleX(1)  rotate(-18deg); }
  100% { left: 78%; bottom: 40%; transform: scaleX(-1) rotate(18deg); }
}
```

---

### 5.3 Crayfish — `.game-crab` — `crayfish.png`

**Habitat:** River bottom, walks along substrate. Scavenges near rocks and debris.

**Animation:** `crabWalk` — 32s — walks left and right along the riverbed (current — keep as-is)

---

### 5.4 Lake Whitefish — `.game-fish3` — `lake_whitefish.png` *(NEW)*

**Habitat:** Cold, clear, deep water. Schools near the bottom but makes slow upward arcs into mid-water. Methodical swimmer with wide sweeping turns.

**Size:** `clamp(70px, 6vw, 110px)`

**CSS to add:**

```css
.game-fish3 {
  position: absolute;
  width: clamp(70px, 6vw, 110px);
  height: auto;
  z-index: 3;
  filter: drop-shadow(2px 3px 6px rgba(0, 0, 0, 0.28));
  animation: whitefishSwim 20s ease-in-out 3s infinite;
}

@keyframes whitefishSwim {
  /* Start deep left */
  0%   { left: 30%; bottom: 12%; transform: scaleX(1)  rotate(5deg);  }
  /* Arc upward to mid-water centre */
  30%  { left: 52%; bottom: 34%; transform: scaleX(1)  rotate(-8deg); }
  /* Level out, continue right */
  50%  { left: 72%; bottom: 28%; transform: scaleX(1)  rotate(4deg);  }
  /* Turn */
  52%  { left: 72%; bottom: 28%; transform: scaleX(-1) rotate(-4deg); }
  /* Return arc — descend back to deep left */
  75%  { left: 50%; bottom: 14%; transform: scaleX(-1) rotate(6deg);  }
  98%  { left: 30%; bottom: 12%; transform: scaleX(-1) rotate(4deg);  }
  100% { left: 30%; bottom: 12%; transform: scaleX(1)  rotate(5deg);  }
}
```

**HTML to add in `gameView.js` (inside `.game-scene-container`):**

```html
<img src="./assets/images/lake_whitefish.png" alt="Lake Whitefish" class="game-fish3">
```

---

### 5.5 Goldeye — `.game-fish4` — `goldeye.png` *(NEW)*

**Habitat:** Open water, near the surface of rivers and lakes. Fast, active feeder. Darts near the water surface, often skimming just below the top. Small and nimble.

**Size:** `clamp(50px, 4.5vw, 82px)`

**CSS to add:**

```css
.game-fish4 {
  position: absolute;
  width: clamp(50px, 4.5vw, 82px);
  height: auto;
  z-index: 3;
  filter: drop-shadow(2px 3px 6px rgba(0, 0, 0, 0.22));
  animation: goldeyeDart 9s ease-in-out 1s infinite;
}

@keyframes goldeyeDart {
  /* Near surface left, heading right */
  0%   { left: 28%; bottom: 54%; transform: scaleX(1)  rotate(-5deg); }
  /* Quick dart across surface */
  35%  { left: 58%; bottom: 58%; transform: scaleX(1)  rotate(-3deg); }
  /* Brief dip mid-water */
  50%  { left: 70%; bottom: 46%; transform: scaleX(1)  rotate(8deg);  }
  /* Turn */
  52%  { left: 70%; bottom: 46%; transform: scaleX(-1) rotate(-8deg); }
  /* Surface again, dart back left */
  75%  { left: 46%; bottom: 55%; transform: scaleX(-1) rotate(-4deg); }
  98%  { left: 28%; bottom: 54%; transform: scaleX(-1) rotate(-5deg); }
  100% { left: 28%; bottom: 54%; transform: scaleX(1)  rotate(-5deg); }
}
```

**HTML to add:**

```html
<img src="./assets/images/goldeye.png" alt="Goldeye" class="game-fish4">
```

---

### 5.6 Northern Pike — `.game-fish5` — `northen_pike.png` *(NEW)*

**Habitat:** Ambush predator. Lurks near underwater vegetation and the shallow edges of rivers. Large body, slow stalking movement, then a brief quick dart. Prefers mid-water near the sides of the scene (near vegetation visible in the background image).

**Size:** `clamp(95px, 8.5vw, 155px)`

**CSS to add:**

```css
.game-fish5 {
  position: absolute;
  width: clamp(95px, 8.5vw, 155px);
  height: auto;
  z-index: 3;
  filter: drop-shadow(2px 3px 6px rgba(0, 0, 0, 0.32));
  animation: pikeStalk 30s ease-in-out 8s infinite;
}

@keyframes pikeStalk {
  /* Lurk left edge near vegetation, mid-water */
  0%   { left: 26%; bottom: 36%; transform: scaleX(1)  rotate(2deg);  }
  /* Very slow stalk toward centre */
  20%  { left: 38%; bottom: 32%; transform: scaleX(1)  rotate(0deg);  }
  /* Pause / hold */
  35%  { left: 44%; bottom: 30%; transform: scaleX(1)  rotate(1deg);  }
  /* Quick dart at prey (right) */
  42%  { left: 62%; bottom: 34%; transform: scaleX(1)  rotate(-4deg); }
  /* Slow drift deeper */
  55%  { left: 68%; bottom: 20%; transform: scaleX(1)  rotate(6deg);  }
  /* Turn around */
  57%  { left: 68%; bottom: 20%; transform: scaleX(-1) rotate(-6deg); }
  /* Slow return to left edge */
  80%  { left: 42%; bottom: 28%; transform: scaleX(-1) rotate(-2deg); }
  98%  { left: 26%; bottom: 36%; transform: scaleX(-1) rotate(2deg);  }
  100% { left: 26%; bottom: 36%; transform: scaleX(1)  rotate(2deg);  }
}
```

**HTML to add:**

```html
<img src="./assets/images/northen_pike.png" alt="Northern Pike" class="game-fish5">
```

---

## 6. Supabase Schema

### Table: `animals`

```sql
CREATE TABLE animals (
  id               UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name             TEXT NOT NULL,
  slug             TEXT NOT NULL UNIQUE,
  local_asset_key  TEXT NOT NULL,
  icon_asset_key   TEXT NOT NULL,
  is_active        BOOLEAN NOT NULL DEFAULT true,
  created_at       TIMESTAMPTZ DEFAULT now()
);
```

### Table: `animal_hints`

```sql
CREATE TABLE animal_hints (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  animal_id    UUID NOT NULL REFERENCES animals(id) ON DELETE CASCADE,
  hint_text    TEXT NOT NULL,
  hint_order   INTEGER NOT NULL,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_animal_hints_animal_id ON animal_hints(animal_id);
CREATE INDEX idx_animal_hints_order     ON animal_hints(animal_id, hint_order);
```

### Seed Data

```sql
-- Animals
INSERT INTO animals (name, slug, local_asset_key, icon_asset_key) VALUES
  ('Walleye',        'walleye',        'walleye.png',        'icon_walleye.png'),
  ('Lake Sturgeon',  'lake-sturgeon',  'lake_sturgeon.png',  'icon_sturgeon.png'),
  ('Crayfish',       'crayfish',       'crayfish.png',       'icon_crayfish.png'),
  ('Lake Whitefish', 'lake-whitefish', 'lake_whitefish.png', 'icon_whitefish.png'),
  ('Goldeye',        'goldeye',        'goldeye.png',        'icon_goldeye.png'),
  ('Northern Pike',  'northern-pike',  'northen_pike.png',   'icon_pike.png');

-- Walleye hints (most specific last)
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'I like to swim in dark, deep water', 1 FROM animals WHERE slug = 'walleye';
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'I come out to hunt at dawn and dusk', 2 FROM animals WHERE slug = 'walleye';
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'My eyes glow in the dark — they help me see underwater', 3 FROM animals WHERE slug = 'walleye';

-- Lake Sturgeon hints
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'I am one of the biggest fish in the river', 1 FROM animals WHERE slug = 'lake-sturgeon';
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'I swim very slowly along the riverbed', 2 FROM animals WHERE slug = 'lake-sturgeon';
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'I have armour-like plates on my body instead of scales', 3 FROM animals WHERE slug = 'lake-sturgeon';

-- Crayfish hints
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'I walk on the sandy bottom of the river', 1 FROM animals WHERE slug = 'crayfish';
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'I have claws and look like a tiny lobster', 2 FROM animals WHERE slug = 'crayfish';
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'I hide under rocks and eat what sinks to the bottom', 3 FROM animals WHERE slug = 'crayfish';

-- Lake Whitefish hints
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'I love cold, deep, and very clear water', 1 FROM animals WHERE slug = 'lake-whitefish';
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'I swim in slow wide circles near the bottom', 2 FROM animals WHERE slug = 'lake-whitefish';
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'My body is silver and shaped like a torpedo', 3 FROM animals WHERE slug = 'lake-whitefish';

-- Goldeye hints
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'I swim close to the top of the water', 1 FROM animals WHERE slug = 'goldeye';
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'I dart around quickly and love open water', 2 FROM animals WHERE slug = 'goldeye';
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'I have golden-yellow eyes that shine in the light', 3 FROM animals WHERE slug = 'goldeye';

-- Northern Pike hints
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'I hide near underwater plants and wait very still', 1 FROM animals WHERE slug = 'northern-pike';
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'I am a hunter — I dart out fast to catch other fish', 2 FROM animals WHERE slug = 'northern-pike';
INSERT INTO animal_hints (animal_id, hint_text, hint_order)
SELECT id, 'I have a long body with a flat snout like a duck bill', 3 FROM animals WHERE slug = 'northern-pike';
```

### Fetch Rules

- Fetch all `animals` where `is_active = true` on game load
- Fetch all `animal_hints` for those animals in one query
- Group hints by `animal_id` in JavaScript
- Sort hints by `hint_order` ascending
- **Never** fetch images from Supabase — map `local_asset_key` to local path: `./assets/images/<local_asset_key>`

---

## 7. Game State Design

Define in `gameModel.js` (or a separate `gameState.js`):

```js
const gameState = {
  // Loaded from Supabase
  animals: [],           // Array<{ id, name, slug, local_asset_key, icon_asset_key }>
  hintsByAnimal: {},     // { [animal_id]: Array<{ hint_text, hint_order }> }

  // Card assignment (shuffled on game start / reset)
  shuffledCards: [],     // Array<{ cardIndex: 0-5, animalId: string }>

  // Active turn
  activeCardId: null,    // cardIndex of selected card (0–5) or null
  activeAnimalId: null,  // animal.id assigned to the active card

  // Hint progression for active card
  currentHintIndex: 0,   // index into hintsByAnimal[activeAnimalId]
  unlockedHints: [],     // Array<string> — hint_text values revealed so far

  // Completion tracking
  solvedCards: new Set(),  // Set of cardIndex values — correct guesses
  failedCards: new Set(),  // Set of cardIndex values — exhausted all hints wrong

  // Timer
  timerSeconds: 300,     // 5-minute countdown (already implemented)
  timerInterval: null,

  // Game completion
  gameStatus: 'idle'     // 'idle' | 'playing' | 'complete'
};
```

---

## 8. Data Fetching Layer

Create `EcoDiscovery_Development/public/js/services/supabaseService.js`:

```js
const SUPABASE_URL  = '<your-supabase-url>';
const SUPABASE_KEY  = '<your-anon-key>';

async function fetchGameData() {
  const [animalsRes, hintsRes] = await Promise.all([
    fetch(`${SUPABASE_URL}/rest/v1/animals?is_active=eq.true&select=*`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
    }),
    fetch(`${SUPABASE_URL}/rest/v1/animal_hints?select=*&order=hint_order.asc`, {
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` }
    })
  ]);

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
```

Map `local_asset_key` to a local image path in the controller:

```js
function getAnimalImagePath(animal) {
  return `./assets/images/${animal.local_asset_key}`;
}
```

---

## 9. Asset Mapping

The 6 fish in the scene must be clickable. Each fish element must carry a `data-animal-slug` attribute so click handlers can resolve which animal was tapped:

```html
<img src="./assets/images/walleye.png"        data-animal-slug="walleye"        class="game-fish  game-creature" alt="Walleye">
<img src="./assets/images/lake_sturgeon.png"  data-animal-slug="lake-sturgeon"  class="game-fish2 game-creature" alt="Lake Sturgeon">
<img src="./assets/images/crayfish.png"       data-animal-slug="crayfish"       class="game-crab  game-creature" alt="Crayfish">
<img src="./assets/images/lake_whitefish.png" data-animal-slug="lake-whitefish" class="game-fish3 game-creature" alt="Lake Whitefish">
<img src="./assets/images/goldeye.png"        data-animal-slug="goldeye"        class="game-fish4 game-creature" alt="Goldeye">
<img src="./assets/images/northen_pike.png"   data-animal-slug="northern-pike"  class="game-fish5 game-creature" alt="Northern Pike">
```

Add `.game-creature { cursor: pointer; }` in `game.css`.

---

## 10. Card Assignment (Shuffle)

On game start and on reset, assign one animal to each card randomly:

```js
function assignAnimalsToCards(animals) {
  const shuffled = [...animals].sort(() => Math.random() - 0.5);
  return shuffled.map((animal, index) => ({ cardIndex: index, animalId: animal.id }));
}
```

This produces `gameState.shuffledCards`. Card 0–5 each map to exactly one animal.

---

## 11. Card CSS States

Add these classes to `game.css`:

```css
/* Active card */
.sb-card--active {
  animation: none !important;
  transform: scale(1.12);
  filter: drop-shadow(0 0 14px var(--card-color)) drop-shadow(0 0 28px var(--card-color));
  transition: transform 0.2s ease, filter 0.2s ease;
}

/* Solved card */
.sb-card--solved .sb-card-face {
  border: 3px solid #27ae60;
}

/* Failed card */
.sb-card--failed {
  animation: none !important;
}
.sb-card--failed .sb-card-face {
  filter: brightness(0.55) saturate(0.4);
  border: 3px solid #e74c3c;
}

/* Flip animation */
.sb-card--flipped .sb-card-face {
  animation: cardFlip 0.5s ease forwards;
}

@keyframes cardFlip {
  0%   { transform: rotateY(0deg); }
  50%  { transform: rotateY(90deg); }
  100% { transform: rotateY(0deg); }
}

/* Failed X overlay */
.sb-card-fail-x {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 2.5rem;
  font-weight: 900;
  color: rgba(231, 76, 60, 0.88);
  text-shadow: 0 2px 6px rgba(0, 0, 0, 0.4);
  pointer-events: none;
  z-index: 5;
}
```

---

## 12. Fish Shake Animation (Wrong Guess)

Add to `game.css`:

```css
.game-creature--shake {
  animation: fishShake 0.45s ease !important;
}

@keyframes fishShake {
  0%   { filter: drop-shadow(0 0 8px rgba(231, 76, 60, 0.9)); }
  20%  { transform: translateX(-8px) rotate(-5deg); }
  40%  { transform: translateX(8px)  rotate(5deg); }
  60%  { transform: translateX(-5px) rotate(-3deg); }
  80%  { transform: translateX(5px)  rotate(3deg); }
  100% { transform: translateX(0)    rotate(0deg); filter: none; }
}
```

Apply in controller:

```js
function shakeCreature(slug) {
  const el = document.querySelector(`[data-animal-slug="${slug}"]`);
  el.classList.add('game-creature--shake');
  el.addEventListener('animationend', () => el.classList.remove('game-creature--shake'), { once: true });
}
```

---

## 13. Reset Logic

When "Reset Sticker Book" is clicked:

1. Re-shuffle animals → new `shuffledCards`
2. Clear `solvedCards`, `failedCards`, `unlockedHints`
3. Set `activeCardId = null`, `activeAnimalId = null`, `currentHintIndex = 0`
4. Remove `.sb-card--active`, `.sb-card--flipped`, `.sb-card--solved`, `.sb-card--failed` from all cards
5. Remove any `.sb-card-fail-x` overlays
6. Clear Fish Facts box
7. Clear Hint History list
8. Set Guide → `"Pick a mystery sticker"`
9. Reset timer to 300s (re-call `startGameTimer(300)`)
10. Resume `cardSequentialGlow` on all 6 cards
11. Fish animations continue uninterrupted

---

## 14. Development Stages

### Stage 1 — Analysis
- [ ] Read current `gameView.js`, `gameModel.js`, `gameController.js`, `game.css` fully
- [ ] Document current sticker book HTML structure
- [ ] Identify all CSS classes used for cards, buttons, feedback area

### Stage 2 — Add 3 Missing Fish to Scene
- [ ] Add `.game-fish3`, `.game-fish4`, `.game-fish5` CSS classes with animations to `game.css` (see Section 5.4–5.6)
- [ ] Add 3 new `<img>` tags in `gameView.js` inside `.game-scene-container`
- [ ] Add `data-animal-slug` attribute to all 6 creature `<img>` tags
- [ ] Add `.game-creature { cursor: pointer; }` to `game.css`
- [ ] Verify all 6 creatures animate correctly in browser

### Stage 3 — Supabase Setup
- [ ] Create Supabase project
- [ ] Run `animals` table DDL
- [ ] Run `animal_hints` table DDL
- [ ] Run seed INSERT statements (all 6 fish, 3 hints each)
- [ ] Verify data in Supabase dashboard

### Stage 4 — Data Fetching Layer
- [ ] Create `public/js/services/supabaseService.js`
- [ ] Implement `fetchGameData()` — returns `{ animals, hintsByAnimal }`
- [ ] Test fetch in browser console, confirm 6 animals + 18 hints

### Stage 5 — Refactor Model and Controller
- [ ] Replace static `gamePageData.game.stickerBook.animals` in `gameModel.js` with dynamic Supabase data
- [ ] Define `gameState` object (Section 7)
- [ ] Implement `assignAnimalsToCards(animals)` shuffle
- [ ] Load data in `initGamePage()` before rendering

### Stage 6 — Rename UI Labels
- [ ] In `gameView.js`: rename `Hint` button to `Guide`
- [ ] Update sub-label text on Guide button: remove old hint description
- [ ] Update `Fish Facts` sub-label: `"The latest hint for your selected card"`
- [ ] Rename "Great job" feedback title to hint history container
- [ ] Update `game.css` if label classes need adjusting

### Stage 7 — Implement Card Selection Logic
- [ ] Attach click handler to each `.sb-card`
- [ ] On click: set `activeCardId`, `activeAnimalId`
- [ ] Apply `.sb-card--active` to clicked card
- [ ] Remove `.sb-card--active` from previous card
- [ ] Pause all card pulse animations
- [ ] Load first hint for selected animal
- [ ] Update Guide text

### Stage 8 — Implement Hint System
- [ ] On card select: show `hintsByAnimal[activeAnimalId][0].hint_text` in Fish Facts box
- [ ] Add that hint to `unlockedHints`, render in Hint History
- [ ] On wrong guess: auto-increment `currentHintIndex`, show next hint
- [ ] If no more hints: trigger failure state

### Stage 9 — Implement Fish Click Validation
- [ ] Attach click handler to all `.game-creature` elements
- [ ] On click: if no `activeCardId`, do nothing
- [ ] Resolve clicked slug → animal ID
- [ ] Compare against `activeAnimalId`
- [ ] Route to success or wrong-guess handler

### Stage 10 — Implement Success State
- [ ] Add `.sb-card--flipped` → play flip animation
- [ ] Replace card face content: show fish image + name
- [ ] Add to `solvedCards`
- [ ] Clear active state, resume pulse on remaining cards
- [ ] Update counter ("1 / 6 found")
- [ ] Update Guide
- [ ] Check if all 6 complete

### Stage 11 — Implement Failure State
- [ ] Add `.sb-card--flipped`, `.sb-card--failed`
- [ ] Inject `.sb-card-fail-x` overlay (`✕`)
- [ ] Show all hints in Hint History
- [ ] Add to `failedCards`
- [ ] Clear active state, resume pulse
- [ ] Update Guide

### Stage 12 — Implement Pulse Control
- [ ] On card select: `animation-play-state: paused` for all cards
- [ ] Active card uses `.sb-card--active` override
- [ ] On success/failure/reset: remove active class, resume pulse only on unsolved/unfailed cards

### Stage 13 — Implement Reset
- [ ] Wire "Reset Sticker Book" button
- [ ] Implement full reset sequence (Section 13)

### Stage 14 — Polish and Animations
- [ ] Add `cardFlip` keyframe and `.sb-card--flipped` class
- [ ] Add `fishShake` keyframe and JS helper
- [ ] Add spark elements to hint history pills
- [ ] Add hint pill styles (rounded, card-color background)
- [ ] Test all 6 fish animations visually
- [ ] Test Guide messages at every state transition

### Stage 15 — Full Gameplay Loop Testing
- [ ] Test correct guess flow for each of the 6 fish
- [ ] Test wrong guess flow with progressive hint reveal
- [ ] Test failure flow (all hints exhausted)
- [ ] Test reset from mid-game
- [ ] Test timer behavior (reset correctly on Reset click)
- [ ] Test all Guide messages appear at correct moments
- [ ] Test on smaller screen widths (responsive layout)
