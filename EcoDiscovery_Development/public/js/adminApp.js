// ─── Eco Discovery — Admin Controller ────────────────────────────────────────
// Uses Supabase Auth (window.supabase from CDN) + REST API to manage feedback.

import { SUPABASE_URL, SUPABASE_ANON_KEY } from './config.js';

// ─── Supabase client (Auth) ────────────────────────────────────────────────
const { createClient } = window.supabase;
const sb = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ─── DOM refs ──────────────────────────────────────────────────────────────
const loginScreen  = document.getElementById('adm-login-screen');
const dashboard    = document.getElementById('adm-dashboard');
const loginForm    = document.getElementById('adm-login-form');
const loginError   = document.getElementById('adm-login-error');
const loginBtn     = document.getElementById('adm-login-btn');
const logoutBtn    = document.getElementById('adm-logout');
const refreshBtn   = document.getElementById('adm-refresh');
const userEmailEl  = document.getElementById('adm-user-email');
const tableContainer = document.getElementById('adm-table-container');

// Stats
const statTotal   = document.getElementById('stat-total');
const statParents = document.getElementById('stat-parents');
const statKids    = document.getElementById('stat-kids');
const statAvg     = document.getElementById('stat-avg');

// ─── Init ──────────────────────────────────────────────────────────────────
async function init() {
  // Check for existing session (so admin stays logged in on refresh)
  const { data: { session } } = await sb.auth.getSession();
  if (session) {
    showDashboard(session.user.email);
    await loadFeedback(session.access_token);
  } else {
    showLogin();
  }

  // ── Login form ───────────────────────────────────────────────────────────
  loginForm.addEventListener('submit', async e => {
    e.preventDefault();
    await handleLogin();
  });

  // ── Logout ───────────────────────────────────────────────────────────────
  logoutBtn.addEventListener('click', async () => {
    await sb.auth.signOut();
    showLogin();
  });

  // ── Refresh table ────────────────────────────────────────────────────────
  refreshBtn.addEventListener('click', async () => {
    const { data: { session } } = await sb.auth.getSession();
    if (session) {
      tableContainer.innerHTML = '<p class="adm-loading"><i class="fa-solid fa-circle-notch fa-spin"></i> Loading feedback…</p>';
      await loadFeedback(session.access_token);
    }
  });
}

// ─── Login handler ─────────────────────────────────────────────────────────
async function handleLogin() {
  const email    = document.getElementById('adm-email').value.trim();
  const password = document.getElementById('adm-password').value;

  if (!email || !password) {
    return showLoginError('Please enter your email and password.');
  }

  setLoginLoading(true);
  hideLoginError();

  const { data, error } = await sb.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    setLoginLoading(false);
    return showLoginError('Invalid email or password. Please try again.');
  }

  setLoginLoading(false);
  showDashboard(data.user.email);
  await loadFeedback(data.session.access_token);
}

// ─── Show / hide screens ───────────────────────────────────────────────────
function showLogin() {
  loginScreen.style.display = 'flex';
  dashboard.style.display   = 'none';
  loginForm.reset();
  hideLoginError();
}

function showDashboard(email) {
  loginScreen.style.display = 'none';
  dashboard.style.display   = 'flex';
  if (userEmailEl) userEmailEl.textContent = email;
}

// ─── Fetch + render feedback ───────────────────────────────────────────────
async function loadFeedback(accessToken) {
  try {
    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/feedback?select=*&order=created_at.desc`,
      {
        headers: {
          'apikey':        SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type':  'application/json'
        }
      }
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const rows = await res.json();
    renderStats(rows);
    renderTable(rows);

  } catch (err) {
    tableContainer.innerHTML =
      `<p class="adm-empty"><i class="fa-solid fa-triangle-exclamation"></i> Failed to load feedback. Please refresh.</p>`;
    console.error('[Admin] loadFeedback error:', err);
  }
}

// ─── Stats ─────────────────────────────────────────────────────────────────
function renderStats(rows) {
  const total   = rows.length;
  const parents = rows.filter(r => r.role === 'parent').length;
  const kids    = rows.filter(r => r.role === 'kid').length;

  const withRating = rows.filter(r => r.rating != null);
  const avg = withRating.length
    ? (withRating.reduce((s, r) => s + r.rating, 0) / withRating.length).toFixed(1)
    : '—';

  statTotal.textContent   = total;
  statParents.textContent = parents;
  statKids.textContent    = kids;
  statAvg.textContent     = avg !== '—' ? `${avg} ★` : '—';
}

// ─── Table ─────────────────────────────────────────────────────────────────
let currentRows = []; // keep a local copy so we can update stats without re-fetching

function renderTable(rows) {
  currentRows = rows;

  if (rows.length === 0) {
    tableContainer.innerHTML =
      '<p class="adm-empty"><i class="fa-solid fa-inbox"></i> No feedback yet. Check back later!</p>';
    return;
  }

  const rowsHTML = rows.map((r, i) => `
    <tr data-id="${r.id}">
      <td>${escapeHtml(r.name)}</td>
      <td><span class="adm-role-badge adm-role-${r.role}">${r.role}</span></td>
      <td class="adm-msg-cell">
        <div class="adm-msg-text" data-row="${i}" title="Click to expand">${escapeHtml(r.message)}</div>
      </td>
      <td>${r.email
        ? `<span class="adm-email">${escapeHtml(r.email)}</span>`
        : `<span class="adm-email-none">—</span>`
      }</td>
      <td>${renderStars(r.rating)}</td>
      <td class="adm-date">${formatDate(r.created_at)}</td>
      <td>
        <button class="adm-delete-btn" data-id="${r.id}" title="Delete this feedback" type="button">
          <i class="fa-solid fa-trash"></i>
        </button>
      </td>
    </tr>
  `).join('');

  tableContainer.innerHTML = `
    <table class="adm-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Message</th>
          <th>Email</th>
          <th>Rating</th>
          <th>Date</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${rowsHTML}</tbody>
    </table>
  `;

  // Click to expand messages
  tableContainer.querySelectorAll('.adm-msg-text').forEach(el => {
    el.addEventListener('click', () => el.classList.toggle('expanded'));
  });

  // Delete buttons — event delegation on the table container
  tableContainer.addEventListener('click', async e => {
    const btn = e.target.closest('.adm-delete-btn');
    if (!btn) return;
    const id = btn.dataset.id;
    await handleDelete(id, btn);
  });
}

// ─── Delete handler ─────────────────────────────────────────────────────────
async function handleDelete(id, btn) {
  if (!confirm('Delete this feedback entry? This cannot be undone.')) return;

  btn.disabled = true;
  btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i>';

  try {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) throw new Error('No session');

    const res = await fetch(
      `${SUPABASE_URL}/rest/v1/feedback?id=eq.${id}`,
      {
        method: 'DELETE',
        headers: {
          'apikey':        SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type':  'application/json'
        }
      }
    );

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    // Remove row from DOM with a fade
    const row = document.querySelector(`tr[data-id="${id}"]`);
    if (row) {
      row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      row.style.opacity = '0';
      row.style.transform = 'translateX(20px)';
      setTimeout(() => row.remove(), 300);
    }

    // Update local cache + stats
    currentRows = currentRows.filter(r => r.id !== id);
    renderStats(currentRows);

    // Show empty state if no rows left
    if (currentRows.length === 0) {
      setTimeout(() => {
        tableContainer.innerHTML =
          '<p class="adm-empty"><i class="fa-solid fa-inbox"></i> No feedback yet. Check back later!</p>';
      }, 350);
    }

  } catch (err) {
    btn.disabled = false;
    btn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    alert('Failed to delete. Please try again.');
    console.error('[Admin] delete error:', err);
  }
}

// ─── Helpers ───────────────────────────────────────────────────────────────
function renderStars(rating) {
  if (!rating) return '<span class="adm-stars-empty">— — — — —</span>';
  const filled = '★'.repeat(rating);
  const empty  = '☆'.repeat(5 - rating);
  return `<span class="adm-stars">${filled}</span><span class="adm-stars-empty">${empty}</span>`;
}

function formatDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  return d.toLocaleDateString('en-CA', { year: 'numeric', month: 'short', day: 'numeric' });
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function showLoginError(msg) {
  loginError.textContent = msg;
  loginError.classList.add('visible');
}

function hideLoginError() {
  loginError.classList.remove('visible');
  loginError.textContent = '';
}

function setLoginLoading(loading) {
  const btnText = document.getElementById('adm-btn-text');
  loginBtn.disabled  = loading;
  if (btnText) btnText.textContent = loading ? 'Signing in…' : 'Sign In';
}

// ─── Boot ──────────────────────────────────────────────────────────────────
init();
