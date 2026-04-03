const express = require('express')
const router  = express.Router()
const Patient = require('../models/Patient')
const { analyzeSymptoms } = require('../services/aiService')

// In-memory fallback when MongoDB is unavailable
const mockPatients = []

const isMongoConnected = () => {
  const mongoose = require('mongoose')
  return mongoose.connection.readyState === 1
}

// POST /api/patients — Create patient + AI analysis
router.post('/', async (req, res) => {
  try {
    const { name, age, phone, email, city, symptoms, urgency } = req.body

    // Validation
    if (!name || !age || !phone || !symptoms || !city) {
      return res.status(400).json({ message: 'Name, age, phone, city, and symptoms are required.' })
    }

    // Run AI analysis
    const aiResponse = await analyzeSymptoms({ name, age, city, symptoms, urgency })

    if (isMongoConnected()) {
      // Persist to MongoDB
      const patient = new Patient({
        name, age: Number(age), phone, email, city, symptoms,
        urgency: urgency || 'medium',
        aiResponse,
      })
      await patient.save()

      return res.status(201).json({
        message: 'Patient request submitted successfully.',
        data: patient,
        aiResponse,
      })
    } else {
      // In-memory fallback
      const mockPatient = {
        _id: Date.now().toString(),
        name, age: Number(age), phone, email, city, symptoms,
        urgency: urgency || 'medium',
        aiResponse,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockPatients.unshift(mockPatient)
      return res.status(201).json({
        message: 'Patient request submitted (stored in memory — MongoDB unavailable).',
        data: mockPatient,
        aiResponse,
      })
    }
  } catch (err) {
    console.error('Patient POST error:', err)
    res.status(500).json({ message: 'Server error: ' + err.message })
  }
})

// GET /api/patients — List all patients (admin)
router.get('/', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const patients = await Patient.find().sort({ createdAt: -1 }).lean()
      return res.json({ data: patients, count: patients.length })
    } else {
      return res.json({ data: mockPatients, count: mockPatients.length })
    }
  } catch (err) {
    console.error('Patient GET error:', err)
    res.status(500).json({ message: 'Server error: ' + err.message })
  }
})

// GET /api/patients/:id — Single patient
router.get('/:id', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const patient = await Patient.findById(req.params.id).lean()
      if (!patient) return res.status(404).json({ message: 'Patient not found' })
      return res.json({ data: patient })
    } else {
      const patient = mockPatients.find(p => p._id === req.params.id)
      if (!patient) return res.status(404).json({ message: 'Patient not found' })
      return res.json({ data: patient })
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error: ' + err.message })
  }
})

module.exports = router
