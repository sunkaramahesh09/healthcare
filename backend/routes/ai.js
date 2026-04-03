const express = require('express')
const router  = express.Router()
const { analyzeSymptoms } = require('../services/aiService')

// POST /api/ai/analyze — Standalone AI symptom analysis
router.post('/analyze', async (req, res) => {
  try {
    const { symptoms, name, age, city, urgency } = req.body

    if (!symptoms || symptoms.trim().length < 5) {
      return res.status(400).json({
        message: 'Please provide a meaningful symptom description (at least 5 characters).',
      })
    }

    const aiResponse = await analyzeSymptoms({ symptoms, name, age, city, urgency })

    res.json({
      message: 'AI analysis complete.',
      aiResponse,
    })
  } catch (err) {
    console.error('AI analyze error:', err)
    res.status(500).json({ message: 'AI service error: ' + err.message })
  }
})

module.exports = router
