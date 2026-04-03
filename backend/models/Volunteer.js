const mongoose = require('mongoose')

const volunteerSchema = new mongoose.Schema(
  {
    name:         { type: String, required: true, trim: true },
    email:        { type: String, required: true, trim: true },
    phone:        { type: String, required: true, trim: true },
    city:         { type: String, required: true, trim: true },
    profession:   { type: String, trim: true, default: '' },
    availability: { type: String, required: true },
    skills:       { type: [String], default: [] },
    motivation:   { type: String, trim: true, default: '' },
    hasTraining:  { type: Boolean, default: false },
    status: {
      type: String,
      enum: ['active', 'inactive', 'pending'],
      default: 'active',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Volunteer', volunteerSchema)
