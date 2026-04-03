require('dotenv').config()
const express    = require('express')
const cors       = require('cors')
const mongoose   = require('mongoose')
const morgan     = require('morgan')

const patientRoutes   = require('./routes/patients')
const volunteerRoutes = require('./routes/volunteers')
const aiRoutes        = require('./routes/ai')

const app = express()

// ── Middleware ─────────────────────────────────────────────────────
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('dev'))
}

// ── MongoDB ───────────────────────────────────────────────────────
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/careconnect'

mongoose.connect(MONGODB_URI)
  .then(() => console.log(`✅ MongoDB connected: ${MONGODB_URI}`))
  .catch((err) => {
    console.warn(`⚠️  MongoDB connection failed: ${err.message}`)
    console.warn('Running in mock-data mode (data won\'t persist).')
  })

// ── Routes ────────────────────────────────────────────────────────
app.use('/api/patients',   patientRoutes)
app.use('/api/volunteers', volunteerRoutes)
app.use('/api/ai',         aiRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'CareConnect API',
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
  })
})

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: `Route ${req.originalUrl} not found` })
})

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  })
})

// ── Start ─────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`🚀 CareConnect API running on http://localhost:${PORT}`)
})

module.exports = app
