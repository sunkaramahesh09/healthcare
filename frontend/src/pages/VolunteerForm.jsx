import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { User, Phone, Mail, Briefcase, Clock, CheckCircle, AlertCircle } from 'lucide-react'
import { submitVolunteer } from '../services/api'

const SKILL_OPTIONS = [
  'Doctor / Physician', 'Nurse / Medical Staff', 'Pharmacist',
  'Therapist / Counselor', 'Social Worker', 'Patient Transport',
  'Administrative Support', 'Community Outreach', 'Medical Student',
]

const AVAILABILITY_OPTIONS = [
  { value: '1-5hrs',   label: '1–5 hours/week' },
  { value: '5-10hrs',  label: '5–10 hours/week' },
  { value: '10-20hrs', label: '10–20 hours/week' },
  { value: 'fulltime', label: '20+ hours (Full-time)' },
]

const initialForm = {
  name: '', email: '', phone: '', city: '',
  profession: '', availability: '', skills: [],
  motivation: '', hasTraining: false,
}

export default function VolunteerForm() {
  const [form, setForm]           = useState(initialForm)
  const [errors, setErrors]       = useState({})
  const [loading, setLoading]     = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const toggleSkill = (skill) => {
    setForm(f => ({
      ...f,
      skills: f.skills.includes(skill)
        ? f.skills.filter(s => s !== skill)
        : [...f.skills, skill],
    }))
    if (errors.skills) setErrors(e => ({ ...e, skills: '' }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())   e.name         = 'Full name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required'
    if (!form.phone.trim())  e.phone        = 'Phone number is required'
    if (!form.city.trim())   e.city         = 'City is required'
    if (!form.availability)  e.availability = 'Please select your availability'
    if (form.skills.length === 0) e.skills  = 'Select at least one skill area'
    return e
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }))
    if (errors[name]) setErrors(er => ({ ...er, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setLoading(true)
    const toastId = toast.loading('Registering your volunteer profile…')
    try {
      await submitVolunteer(form)
      setSubmitted(true)
      toast.success('Welcome to the CareConnect volunteer family! 🎉', { id: toastId })
    } catch (err) {
      toast.error(err.message || 'Registration failed. Please try again.', { id: toastId })
    } finally {
      setLoading(false)
    }
  }

  // ── Success State ──────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-navy-900 pt-24 pb-16 px-4 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full card p-10 text-center"
        >
          <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-teal-500/30">
            <CheckCircle size={36} className="text-white" />
          </div>
          <h2 className="font-display text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Welcome, {form.name}! 🎉
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-6">
            You've successfully joined our volunteer network! Our coordination team will reach out within 24 hours
            with your onboarding details and first assignment.
          </p>
          <div className="bg-teal-50 border border-teal-200 rounded-xl p-4 mb-6 text-left
                          dark:bg-teal-500/10 dark:border-teal-500/30">
            <p className="text-xs font-semibold text-teal-700 dark:text-teal-400 uppercase tracking-wider mb-2">Your Profile Summary</p>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <p><span className="font-medium">Skills:</span> {form.skills.join(', ')}</p>
              <p><span className="font-medium">Availability:</span> {form.availability.replace('hrs', ' hrs/week')}</p>
              <p><span className="font-medium">City:</span> {form.city}</p>
            </div>
          </div>
          <button
            onClick={() => { setForm(initialForm); setSubmitted(false) }}
            className="btn-secondary w-full justify-center"
          >
            Register Another Volunteer
          </button>
        </motion.div>
      </div>
    )
  }

  // ── Form ──────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 pt-24 pb-16 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
          <span className="section-tag">Volunteer Registration</span>
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
            Join Our <span className="gradient-text">Care Network</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
            Your skills can save lives. Register as a volunteer and help connect patients with the care they need.
          </p>
        </motion.div>

        {/* Impact stats */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}
          className="grid grid-cols-3 gap-4 mb-6"
        >
          {[
            { val: '840+', label: 'Active volunteers' },
            { val: '84',   label: 'Cities covered' },
            { val: '12K+', label: 'Patients served' },
          ].map(s => (
            <div key={s.label} className="text-center card p-4">
              <div className="font-display text-xl font-black gradient-text">{s.val}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{s.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="card p-8"
        >
          <form onSubmit={handleSubmit} noValidate>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label className="form-label" htmlFor="v-name">
                  <User size={14} className="inline mr-1" /> Full Name *
                </label>
                <input
                  id="v-name" name="name" type="text"
                  className={`form-input ${errors.name ? 'form-input-error' : ''}`}
                  placeholder="e.g. Rahul Gupta"
                  value={form.name} onChange={handleChange}
                />
                {errors.name && <p className="form-error"><AlertCircle size={12}/>{errors.name}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="form-label" htmlFor="v-email">
                  <Mail size={14} className="inline mr-1" /> Email Address *
                </label>
                <input
                  id="v-email" name="email" type="email"
                  className={`form-input ${errors.email ? 'form-input-error' : ''}`}
                  placeholder="volunteer@email.com"
                  value={form.email} onChange={handleChange}
                />
                {errors.email && <p className="form-error"><AlertCircle size={12}/>{errors.email}</p>}
              </div>

              {/* Phone */}
              <div>
                <label className="form-label" htmlFor="v-phone">
                  <Phone size={14} className="inline mr-1" /> Phone Number *
                </label>
                <input
                  id="v-phone" name="phone" type="tel"
                  className={`form-input ${errors.phone ? 'form-input-error' : ''}`}
                  placeholder="+91 98765 43210"
                  value={form.phone} onChange={handleChange}
                />
                {errors.phone && <p className="form-error"><AlertCircle size={12}/>{errors.phone}</p>}
              </div>

              {/* City */}
              <div>
                <label className="form-label" htmlFor="v-city">City / District *</label>
                <input
                  id="v-city" name="city" type="text"
                  className={`form-input ${errors.city ? 'form-input-error' : ''}`}
                  placeholder="e.g. Delhi"
                  value={form.city} onChange={handleChange}
                />
                {errors.city && <p className="form-error"><AlertCircle size={12}/>{errors.city}</p>}
              </div>

              {/* Profession */}
              <div>
                <label className="form-label" htmlFor="v-profession">
                  <Briefcase size={14} className="inline mr-1" /> Your Profession
                </label>
                <input
                  id="v-profession" name="profession" type="text"
                  className="form-input"
                  placeholder="e.g. Nurse, Social Worker…"
                  value={form.profession} onChange={handleChange}
                />
              </div>

              {/* Availability */}
              <div>
                <label className="form-label" htmlFor="v-availability">
                  <Clock size={14} className="inline mr-1" /> Weekly Availability *
                </label>
                <select
                  id="v-availability" name="availability"
                  className={`form-input ${errors.availability ? 'form-input-error' : ''}`}
                  value={form.availability} onChange={handleChange}
                >
                  <option value="">Select hours per week</option>
                  {AVAILABILITY_OPTIONS.map(o => (
                    <option key={o.value} value={o.value}>{o.label}</option>
                  ))}
                </select>
                {errors.availability && <p className="form-error"><AlertCircle size={12}/>{errors.availability}</p>}
              </div>

              {/* Skills */}
              <div className="sm:col-span-2">
                <label className="form-label">Volunteering Skills / Areas * (select all that apply)</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-1">
                  {SKILL_OPTIONS.map((s) => (
                    <button
                      key={s} type="button"
                      onClick={() => toggleSkill(s)}
                      className={`px-3 py-2 rounded-lg text-xs font-medium border-2 transition-all text-left ${
                        form.skills.includes(s)
                          ? 'border-teal-500 bg-teal-50 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300'
                          : 'border-gray-200 text-gray-600 hover:border-gray-300 dark:border-white/10 dark:text-gray-400 dark:hover:border-white/20'
                      }`}
                    >
                      {form.skills.includes(s) && '✓ '}{s}
                    </button>
                  ))}
                </div>
                {errors.skills && <p className="form-error mt-1"><AlertCircle size={12}/>{errors.skills}</p>}
              </div>

              {/* Motivation */}
              <div className="sm:col-span-2">
                <label className="form-label" htmlFor="v-motivation">Why do you want to volunteer? (Optional)</label>
                <textarea
                  id="v-motivation" name="motivation" rows={3}
                  className="form-input resize-none"
                  placeholder="Share what motivates you to make a difference…"
                  value={form.motivation} onChange={handleChange}
                />
              </div>

              {/* Training */}
              <div className="sm:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                    form.hasTraining
                      ? 'bg-teal-600 border-teal-600'
                      : 'border-gray-300 dark:border-white/20 group-hover:border-teal-400'
                  }`}>
                    {form.hasTraining && <CheckCircle size={12} className="text-white" />}
                  </div>
                  <input
                    type="checkbox" name="hasTraining" className="sr-only"
                    checked={form.hasTraining} onChange={handleChange}
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    I agree to CareConnect's volunteer code of conduct and data processing terms
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full justify-center mt-6 py-4 text-base"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Registering…
                </>
              ) : (
                <>
                  <CheckCircle size={18} />
                  Register as Volunteer
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}
