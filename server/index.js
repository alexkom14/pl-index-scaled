import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import standingsRouter from './routes/standings.js'
import scorersRouter  from './routes/scorers.js'
import { errorHandler } from './middleware/errorHandler.js'

const app = express()
const PORT = process.env.PORT || 3001

// ── Middleware ──────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:5173' })) // Vite dev server
app.use(express.json())

// ── Routes ─────────────────────────────────────────────
app.use('/api/standings', standingsRouter)
app.use('/api/scorers',   scorersRouter)

// Health check — useful for Railway/Render to confirm server is up
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// ── 404 ────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.path} not found` })
})

// ── Error handler ──────────────────────────────────────
app.use(errorHandler)

// ── Start ──────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
  console.log(`API_KEY: ${process.env.API_KEY ? '✓ loaded' : '✗ missing — set it in .env'}`)
})
