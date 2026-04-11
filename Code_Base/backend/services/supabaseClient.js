// ─── Supabase client (server-side only) ──────────────────────────────────────
// Uses the service role key — bypasses RLS, never sent to the browser.

import { createClient } from '@supabase/supabase-js';

const supabaseUrl     = process.env.SUPABASE_URL;
const serviceRoleKey  = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment variables.');
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

export default supabase;
