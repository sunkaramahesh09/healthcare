const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema(
  {
    name:       { type: String, required: true, trim: true },
    age:        { type: Number, required: true, min: 1, max: 120 },
    phone:      { type: String, required: true, trim: true },
    email:      { type: String, trim: true, default: '' },
    city:       { type: String, required: true, trim: true },
    symptoms:   { type: String, required: true, trim: true },
    urgency:    { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    aiResponse: {
      possibleCondition:    { type: String },
      doctorType:           { type: String },
      urgencyRecommendation:{ type: String },
      precautions:          { type: [String] },
      patientSummary:       { type: String },
      disclaimer:           { type: String },
    },
    status: {
      type: String,
      enum: ['pending', 'assigned', 'resolved'],
      default: 'pending',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Patient', patientSchema)
