// ── Trash drag-and-drop ───────────────────────────────────────────────────────
// Lets the player drag sinking trash items to the trash bin drop zone.
// The bin glows yellow and shows trash_happy.png while trash hovers over it.
// On a successful drop the trash item fades out, +20s is added to the timer.

import { addTimerSeconds, showTimerBonus } from "../views/gameView.js";

export function initTrashDrag() {
  const dropZone = document.getElementById("trash-drop-zone");
  if (!dropZone) return;

  let ghost      = null;
  let activeItem = null;
  let offsetX    = 0;
  let offsetY    = 0;

  // Attach to all current sinking-trash elements
  document.querySelectorAll(".sinking-trash").forEach(attachItem);

  function attachItem(item) {
    item.addEventListener("pointerdown", onPointerDown);
  }

  function onPointerDown(e) {
    e.preventDefault();
    activeItem = e.currentTarget;
    activeItem.setPointerCapture(e.pointerId);

    const rect = activeItem.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Build ghost clone
    ghost = document.createElement("img");
    ghost.src = activeItem.src;
    ghost.className = "trash-drag-ghost";
    ghost.style.width = rect.width + "px";
    document.body.appendChild(ghost);

    activeItem.classList.add("is-dragging");
    moveGhost(e.clientX, e.clientY);

    activeItem.addEventListener("pointermove", onPointerMove);
    activeItem.addEventListener("pointerup",   onPointerUp);
  }

  function moveGhost(x, y) {
    if (!ghost) return;
    ghost.style.left = x - offsetX + "px";
    ghost.style.top  = y - offsetY + "px";
  }

  function isOverBin(x, y) {
    const r = dropZone.getBoundingClientRect();
    return x >= r.left && x <= r.right && y >= r.top && y <= r.bottom;
  }

  function onPointerMove(e) {
    moveGhost(e.clientX, e.clientY);
    dropZone.classList.toggle("bin-active", isOverBin(e.clientX, e.clientY));
  }

  function onPointerUp(e) {
    const dropped = isOverBin(e.clientX, e.clientY);

    // Remove ghost
    if (ghost) { ghost.remove(); ghost = null; }

    if (dropped && activeItem) {
      // Consume: animate out then remove from DOM
      activeItem.classList.remove("is-dragging");
      activeItem.classList.add("trash-consumed");
      const item = activeItem;
      setTimeout(() => item.remove(), 550);
      // Reward: +20 seconds on the game timer
      addTimerSeconds(20);
      showTimerBonus("+20s");
    } else if (activeItem) {
      activeItem.classList.remove("is-dragging");
    }

    // Deactivate bin after a short pause so the transition looks smooth
    setTimeout(() => dropZone.classList.remove("bin-active"), 380);

    if (activeItem) {
      activeItem.removeEventListener("pointermove", onPointerMove);
      activeItem.removeEventListener("pointerup",   onPointerUp);
    }
    activeItem = null;
  }
}
