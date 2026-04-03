const express   = require('express')
const router    = express.Router()
const Volunteer = require('../models/Volunteer')

const mockVolunteers = []

const isMongoConnected = () => {
  const mongoose = require('mongoose')
  return mongoose.connection.readyState === 1
}

// POST /api/volunteers — Register volunteer
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, city, profession, availability, skills, motivation, hasTraining } = req.body

    if (!name || !email || !phone || !city || !availability) {
      return res.status(400).json({ message: 'Name, email, phone, city, and availability are required.' })
    }
    if (!skills || skills.length === 0) {
      return res.status(400).json({ message: 'Please select at least one skill area.' })
    }

    if (isMongoConnected()) {
      const volunteer = new Volunteer({
        name, email, phone, city, profession,
        availability, skills, motivation, hasTraining,
      })
      await volunteer.save()

      return res.status(201).json({
        message: 'Volunteer registered successfully. Welcome to CareConnect!',
        data: volunteer,
      })
    } else {
      const mockVolunteer = {
        _id: Date.now().toString(),
        name, email, phone, city, profession,
        availability, skills, motivation, hasTraining,
        status: 'active',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      mockVolunteers.unshift(mockVolunteer)
      return res.status(201).json({
        message: 'Volunteer registered (in-memory — MongoDB unavailable). Welcome to CareConnect!',
        data: mockVolunteer,
      })
    }
  } catch (err) {
    console.error('Volunteer POST error:', err)
    res.status(500).json({ message: 'Server error: ' + err.message })
  }
})

// GET /api/volunteers — List all volunteers (admin)
router.get('/', async (req, res) => {
  try {
    if (isMongoConnected()) {
      const volunteers = await Volunteer.find().sort({ createdAt: -1 }).lean()
      return res.json({ data: volunteers, count: volunteers.length })
    } else {
      return res.json({ data: mockVolunteers, count: mockVolunteers.length })
    }
  } catch (err) {
    console.error('Volunteer GET error:', err)
    res.status(500).json({ message: 'Server error: ' + err.message })
  }
})

module.exports = router
