// ─── Eco Discovery — Feedback Modal ──────────────────────────────────────────
// Global module — loaded on every page. Opens when any footer Feedback link
// (data-action="open-feedback") is clicked.


// ─── Modal HTML template ───────────────────────────────────────────────────
const MODAL_HTML = `
<div class="fb-backdrop" id="fb-backdrop" role="dialog" aria-modal="true" aria-labelledby="fb-title">

  <div class="fb-modal">

    <button class="fb-close" id="fb-close" aria-label="Close feedback form" type="button">
      <i class="fa-solid fa-xmark"></i>
    </button>

    <!-- Header -->
    <div class="fb-header">
      <span class="fb-icon">📬</span>
      <h2 class="fb-title" id="fb-title">Share Your Feedback</h2>
      <p class="fb-subtitle">Help us improve Eco Discovery!</p>
    </div>

    <!-- Form -->
    <form class="fb-form" id="fb-form" novalidate>

      <div>
        <label class="fb-label" for="fb-name">Your Name</label>
        <input class="fb-input" id="fb-name" type="text"
               placeholder="e.g. Alex" required maxlength="80">
      </div>

      <div>
        <label class="fb-label" for="fb-role">I am a</label>
        <select class="fb-select" id="fb-role" required>
          <option value="" disabled selected>Select one…</option>
          <option value="parent">Parent</option>
          <option value="kid">Kid</option>
          <option value="teacher">Teacher</option>
          <option value="other">Other</option>
        </select>
      </div>

      <div>
        <label class="fb-label" for="fb-message">Your Message</label>
        <textarea class="fb-textarea" id="fb-message"
                  placeholder="Tell us what you think…" required maxlength="1000"></textarea>
      </div>

      <div>
        <label class="fb-label" for="fb-email">
          Email <span style="font-weight:600;text-transform:none;letter-spacing:0;opacity:0.6;">(optional)</span>
        </label>
        <input class="fb-input" id="fb-email" type="email" placeholder="so we can follow up">
      </div>

      <div>
        <label class="fb-label">
          Rating <span style="font-weight:600;text-transform:none;letter-spacing:0;opacity:0.6;">(optional)</span>
        </label>
        <div class="fb-stars" id="fb-stars" role="group" aria-label="Star rating 1 to 5">
          <span class="fb-star" data-val="1" role="radio" tabindex="0" aria-label="1 star">★</span>
          <span class="fb-star" data-val="2" role="radio" tabindex="0" aria-label="2 stars">★</span>
          <span class="fb-star" data-val="3" role="radio" tabindex="0" aria-label="3 stars">★</span>
          <span class="fb-star" data-val="4" role="radio" tabindex="0" aria-label="4 stars">★</span>
          <span class="fb-star" data-val="5" role="radio" tabindex="0" aria-label="5 stars">★</span>
        </div>
      </div>

      <p class="fb-error" id="fb-error" role="alert"></p>

      <button class="fb-submit" id="fb-submit" type="submit">Send Feedback</button>
    </form>

    <!-- Success state (hidden until submit) -->
    <div class="fb-success" id="fb-success" aria-live="polite">
      <div class="fb-success-icon">✅</div>
      <h3 class="fb-success-title" id="fb-success-title">Thank you!</h3>
      <p class="fb-success-msg">
        Your feedback was received.<br>We read every message. 💙
      </p>
      <button class="fb-goback" id="fb-goback" type="button">← Go Back to App</button>
    </div>

  </div>
</div>
`;

// ─── State ─────────────────────────────────────────────────────────────────
let selectedRating = 0;

// ─── Boot ──────────────────────────────────────────────────────────────────
function init() {
  // Inject modal once into the page
  document.body.insertAdjacentHTML('beforeend', MODAL_HTML);

  const backdrop    = document.getElementById('fb-backdrop');
  const modal       = backdrop.querySelector('.fb-modal');
  const closeBtn    = document.getElementById('fb-close');
  const form        = document.getElementById('fb-form');
  const errorEl     = document.getElementById('fb-error');
  const submitBtn   = document.getElementById('fb-submit');
  const successEl   = document.getElementById('fb-success');
  const successTitle= document.getElementById('fb-success-title');
  const goBackBtn   = document.getElementById('fb-goback');
  const stars       = document.querySelectorAll('.fb-star');

  // ── Star rating ─────────────────────────────────────────────────────────
  stars.forEach(star => {
    const val = parseInt(star.dataset.val, 10);

    star.addEventListener('click', () => {
      selectedRating = val;
      highlightStars(stars, selectedRating);
    });

    star.addEventListener('mouseenter', () => highlightStars(stars, val));
    star.addEventListener('mouseleave', () => highlightStars(stars, selectedRating));

    star.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        selectedRating = val;
        highlightStars(stars, selectedRating);
      }
    });
  });

  // ── Open via event delegation ────────────────────────────────────────────
  // Catches clicks on any [data-action="open-feedback"] link,
  // even those rendered dynamically by views.
  document.addEventListener('click', e => {
    if (e.target.closest('[data-action="open-feedback"]')) {
      e.preventDefault();
      openModal(backdrop, form, successEl, errorEl);
    }
  });

  // ── Close ────────────────────────────────────────────────────────────────
  closeBtn.addEventListener('click', () => closeModal(backdrop));
  goBackBtn.addEventListener('click', () => closeModal(backdrop));

  // Click outside modal
  backdrop.addEventListener('click', e => {
    if (!modal.contains(e.target)) closeModal(backdrop);
  });

  // Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && backdrop.classList.contains('fb-open')) {
      closeModal(backdrop);
    }
  });

  // ── Submit ───────────────────────────────────────────────────────────────
  form.addEventListener('submit', async e => {
    e.preventDefault();
    await handleSubmit({ submitBtn, errorEl, form, successEl, successTitle });
  });
}

// ─── Open / Close helpers ──────────────────────────────────────────────────
function openModal(backdrop, form, successEl, errorEl) {
  // Reset state
  form.reset();
  form.style.display = '';
  successEl.classList.remove('visible');
  errorEl.classList.remove('visible');
  errorEl.textContent = '';
  selectedRating = 0;
  document.querySelectorAll('.fb-star').forEach(s => s.classList.remove('active'));

  backdrop.classList.add('fb-open');
  document.body.style.overflow = 'hidden';

  // Focus first input for accessibility
  setTimeout(() => {
    const first = document.getElementById('fb-name');
    if (first) first.focus();
  }, 320);
}

function closeModal(backdrop) {
  backdrop.classList.remove('fb-open');
  document.body.style.overflow = '';
}

// ─── Star helpers ──────────────────────────────────────────────────────────
function highlightStars(stars, upTo) {
  stars.forEach(s => {
    s.classList.toggle('active', parseInt(s.dataset.val, 10) <= upTo);
  });
}

// ─── Submit handler ────────────────────────────────────────────────────────
async function handleSubmit({ submitBtn, errorEl, form, successEl, successTitle }) {
  const name    = document.getElementById('fb-name').value.trim();
  const role    = document.getElementById('fb-role').value;
  const message = document.getElementById('fb-message').value.trim();
  const email   = document.getElementById('fb-email').value.trim() || null;

  // Validate
  if (!name)    return showError(errorEl, 'Please enter your name.');
  if (!role)    return showError(errorEl, 'Please select who you are.');
  if (!message) return showError(errorEl, 'Please write your message.');
  errorEl.classList.remove('visible');

  submitBtn.disabled = true;
  submitBtn.textContent = 'Sending…';

  const body = { name, role, message };
  if (email)              body.email  = email;
  if (selectedRating > 0) body.rating = selectedRating;

  try {
    const res = await fetch('/api/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // Show success screen
    successTitle.textContent = `Thank you, ${name}!`;
    form.style.display = 'none';
    successEl.classList.add('visible');

  } catch (err) {
    showError(errorEl, 'Something went wrong — please try again.');
    console.error('[Feedback submit]', err);
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = 'Send Feedback';
  }
}

function showError(el, msg) {
  el.textContent = msg;
  el.classList.add('visible');
}

// ─── Run ───────────────────────────────────────────────────────────────────
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
