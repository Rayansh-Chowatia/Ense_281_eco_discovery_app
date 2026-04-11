// ─── Auth Controller ──────────────────────────────────────────────────────────
// Handles admin login, logout, and session check entirely server-side.
// The browser never calls Supabase directly — all auth goes through these routes.

import supabase from '../services/supabaseClient.js';

/**
 * POST /api/auth/login
 * Body: { email, password }
 * Returns: { accessToken, email }
 */
export async function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.session) {
    return res.status(401).json({ error: 'Invalid email or password.' });
  }

  return res.status(200).json({
    accessToken: data.session.access_token,
    email: data.user.email
  });
}

/**
 * POST /api/auth/logout
 * Authorization: Bearer <token>
 * Returns: { message }
 */
export async function logout(req, res) {
  // Token is stateless (JWT) — expiry is handled by Supabase.
  // Frontend will clear its stored token on receipt of this response.
  return res.status(200).json({ message: 'Logged out.' });
}

/**
 * GET /api/auth/me
 * Authorization: Bearer <token>
 * Returns: { email } — used on page load to restore session without re-login.
 */
export async function getMe(req, res) {
  // req.user is attached by authMiddleware
  return res.status(200).json({ email: req.user.email });
}
