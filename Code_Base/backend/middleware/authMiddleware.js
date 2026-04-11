// ─── Auth Middleware ──────────────────────────────────────────────────────────
// Verifies the Supabase JWT on every protected route.
// Reads the Authorization: Bearer <token> header and calls supabase.auth.getUser().

import supabase from '../services/supabaseClient.js';

export async function authMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  const token = authHeader.slice(7); // strip "Bearer "

  const { data: { user }, error } = await supabase.auth.getUser(token);

  if (error || !user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  req.user = user;
  next();
}
