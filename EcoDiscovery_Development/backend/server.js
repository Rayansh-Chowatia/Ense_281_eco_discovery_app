// ─── Eco Discovery — Express Server ──────────────────────────────────────────
// Serves the public/ frontend as static files and exposes /api/* routes.
// Run:  npm start      (node backend/server.js)
//       npm run dev    (nodemon backend/server.js)

import 'dotenv/config';
import express from 'express';
import helmet  from 'helmet';
import cors    from 'cors';
import path    from 'path';
import { fileURLToPath } from 'url';

import authRoutes     from './routes/authRoutes.js';
import gameRoutes     from './routes/gameRoutes.js';
import feedbackRoutes from './routes/feedbackRoutes.js';
import adminRoutes    from './routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname  = path.dirname(__filename);

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Security headers ─────────────────────────────────────────────────────────
app.use(helmet({
  // Allow inline scripts/styles used in the frontend
  contentSecurityPolicy: false
}));

// ── CORS (dev only — same-origin in production) ───────────────────────────────
if (process.env.NODE_ENV !== 'production') {
  app.use(cors());
}

// ── Body parser ───────────────────────────────────────────────────────────────
app.use(express.json());

// ── Static frontend files ─────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, '..', 'public')));

// ── API routes ────────────────────────────────────────────────────────────────
app.use('/api/auth',    authRoutes);
app.use('/api',         gameRoutes);
app.use('/api',         feedbackRoutes);
app.use('/api/admin',   adminRoutes);

// ── 404 handler for unknown /api/* routes ─────────────────────────────────────
app.use('/api', (req, res) => {
  res.status(404).json({ error: 'API route not found.' });
});

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Eco Discovery server running on http://localhost:${PORT}`);
});
