import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { User, Phone, Mail, FileText, AlertCircle, Send, CheckCircle } from 'lucide-react'
import { submitPatient } from '../services/api'
import AIResponseCard from '../components/AIResponseCard'

const URGENCY_OPTIONS = [
  { value: 'low',    label: '🟢 Low',    desc: 'Non-urgent, routine follow-up' },
  { value: 'medium', label: '🟡 Medium', desc: 'Needs attention within 2–3 days' },
  { value: 'high',   label: '🔴 High',   desc: 'Urgent — needs care today' },
]

const initialForm = {
  name: '', age: '', phone: '', email: '',
  symptoms: '', urgency: 'medium', city: '',
}

export default function PatientForm() {
  const [form, setForm]             = useState(initialForm)
  const [errors, setErrors]         = useState({})
  const [loading, setLoading]       = useState(false)
  const [submitted, setSubmitted]   = useState(false)
  const [aiResponse, setAiResponse] = useState(null)

  const validate = () => {
    const e = {}
    if (!form.name.trim())       e.name     = 'Full name is required'
    if (!form.age || form.age < 1 || form.age > 120) e.age = 'Enter a valid age (1–120)'
    if (!form.phone.trim())      e.phone    = 'Phone number is required'
    if (!form.symptoms.trim())   e.symptoms = 'Please describe your symptoms'
    if (form.symptoms.trim().length < 10) e.symptoms = 'Please provide more detail (min 10 characters)'
    if (!form.city.trim())       e.city     = 'City is required'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(f => ({ ...f, [name]: value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    const toastId = toast.loading('Submitting your request and running AI analysis…')
    try {
      const res = await submitPatient(form)
      setAiResponse(res.aiResponse)
      setSubmitted(true)
      toast.success('Your request has been submitted! AI analysis is ready.', { id: toastId })
    } catch (err) {
      toast.error(err.message || 'Submission failed. Please try again.', { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setForm(initialForm)
    setErrors({})
    setSubmitted(false)
    setAiResponse(null)
  }

  // ── Success State ──────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-navy-900 pt-24 pb-16 px-4">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="card p-8 text-center mb-6">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle size={32} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-2">Request Submitted!</h2>
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-2">
              We've received your support request and our AI has analyzed your symptoms.
              A care coordinator will reach out to <strong className="text-gray-700 dark:text-gray-200">{form.name}</strong> shortly.
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500">
              Reference: #CC-{Date.now().toString().slice(-6)}
            </p>
          </motion.div>

          {aiResponse && <AIResponseCard response={aiResponse} patientName={form.name} />}

          <button onClick={handleReset} className="w-full mt-6 btn-secondary justify-center">
            Submit Another Request
          </button>
        </div>
      </div>
    )
  }

  // ── Form ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="section-tag">Patient Support</span>
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
            Request <span className="gradient-text">Healthcare Support</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Fill out the form below. Our AI will analyze your symptoms and a care coordinator will follow up.
          </p>
        </motion.div>

        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-2 bg-teal-50 border border-teal-200 rounded-xl p-3.5 mb-6
                     dark:bg-teal-500/10 dark:border-teal-500/30"
        >
          <span className="text-xl">🤖</span>
          <p className="text-teal-700 dark:text-teal-300 text-sm">
            <strong>AI-Powered:</strong> After submission, our AI assistant will instantly analyze your symptoms and generate a personalized health recommendation.
          </p>
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card p-8"
        >
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div className="sm:col-span-1">
                <label className="form-label" htmlFor="name">
                  <User size={14} className="inline mr-1" /> Full Name *
                </label>
                <input
                  id="name" name="name" type="text"
                  className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                  placeholder="e.g. Priya Sharma"
                  value={form.name} onChange={handleChange}
                />
                {errors.name && <p className="form-error"><AlertCircle size={12}/>{errors.name}</p>}
              </div>

              {/* Age */}
              <div>
                <label className="form-label" htmlFor="age">Age *</label>
                <input
                  id="age" name="age" type="number"
                  className={`form-input ${errors.age ? 'form-input-error' : ''}`}
                  placeholder="e.g. 45" min="1" max="120"
                  value={form.age} onChange={handleChange}
                />
                {errors.age && <p className="form-error"><AlertCircle size={12}/>{errors.age}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="form-label" htmlFor="phone">
                  <Phone size={14} className="inline mr-1" /> Phone Number *
                </label>
                <input
                  id="phone" name="phone" type="tel"
                  className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                  placeholder="+91 98765 43210"
                  value={form.phone} onChange={handleChange}
                />
                {errors.phone && <p className="form-error"><AlertCircle size={12}/>{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="form-label" htmlFor="email">
                  <Mail size={14} className="inline mr-1" /> Email (Optional)
                </label>
                <input
                  id="email" name="email" type="email"
                  className="form-input"
                  placeholder="patient@email.com"
                  value={form.email} onChange={handleChange}
                />
              </div>

              {/* City */}
              <div className="sm:col-span-2">
                <label className="form-label" htmlFor="city">City / District *</label>
                <input
                  id="city" name="city" type="text"
                  className={`form-input ${errors.city ? 'form-input-error' : ''}`}
                  placeholder="e.g. Mumbai"
                  value={form.city} onChange={handleChange}
                />
                {errors.city && <p className="form-error"><AlertCircle size={12}/>{errors.city}</p>}
              </div>

              {/* Symptoms */}
              <div className="sm:col-span-2">
                <label className="form-label" htmlFor="symptoms">
                  <FileText size={14} className="inline mr-1" /> Describe Your Symptoms *
                </label>
                <textarea
                  id="symptoms" name="symptoms" rows={4}
                  className={`form-input resize-none ${errors.symptoms ? 'form-input-error' : ''}`}
                  placeholder="e.g. I've had a persistent cough for 5 days, mild fever, and sore throat..."
                  value={form.symptoms} onChange={handleChange}
                />
                <div className="flex justify-between mt-1">
                  {errors.symptoms
                    ? <p className="form-error"><AlertCircle size={12}/>{errors.symptoms}</p>
                    : <span />
                  }
                  <span className="text-xs text-gray-400 dark:text-gray-500">{form.symptoms.length}/500</span>
                </div>
              </div>

              {/* Urgency */}
              <div className="sm:col-span-2">
                <label className="form-label">Urgency Level *</label>
                <div className="grid grid-cols-3 gap-3">
                  {URGENCY_OPTIONS.map((opt) => (
                    <label
                      key={opt.value}
                      className={`cursor-pointer border-2 rounded-xl p-3 transition-all ${
                        form.urgency === opt.value
                          ? 'border-teal-500 bg-teal-50 dark:bg-teal-500/10'
                          : 'border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20'
                      }`}
                    >
                      <input
                        type="radio" name="urgency" value={opt.value}
                        className="sr-only"
                        checked={form.urgency === opt.value}
                        onChange={handleChange}
                      />
                      <div className="text-sm font-semibold text-gray-800 dark:text-white mb-0.5">{opt.label}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400">{opt.desc}</div>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-6 py-4 text-base"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Analyzing with AI…
                </>
              ) : (
                <>
                  <Send size={18} />
                  Submit & Get AI Analysis
                </>
              )}
            </button>

            <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-3">
              🔒 Your data is encrypted and only shared with assigned care coordinators
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
