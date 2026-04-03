import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, Sparkles, AlertTriangle } from 'lucide-react'
import { analyzeSymptoms } from '../services/api'
import AIResponseCard from '../components/AIResponseCard'

const EXAMPLE_SYMPTOMS = [
  'Persistent cough and mild fever',
  'Severe chest pain and shortness of breath',
  'Stomach ache and nausea after eating',
  'Skin rash and itching',
  'Headache and dizziness for 3 days',
]

export default function AIAssistant() {
  const [symptoms, setSymptoms] = useState('')
  const [name, setName]         = useState('')
  const [result, setResult]     = useState(null)
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const resultRef               = useRef(null)

  const handleAnalyze = async (e) => {
    e?.preventDefault()
    if (!symptoms.trim() || symptoms.trim().length < 5) {
      setError('Please describe your symptoms in at least 5 characters.')
      return
    }
    setError('')
    setLoading(true)
    setResult(null)
    try {
      const res = await analyzeSymptoms({ symptoms, name: name || 'User' })
      setResult(res.aiResponse || res)
    } catch (err) {
      setError(err.message || 'AI analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [result])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50/30 dark:from-navy-900 dark:to-navy-900 pt-24 pb-16 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-teal-500/30">
            <Bot size={30} className="text-white" />
          </div>
          <span className="section-tag">AI Health Assistant</span>
          <h1 className="font-display text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-3">
            Smart Symptom <span className="gradient-text">Analyzer</span>
          </h1>
          <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
            Describe your symptoms and our AI will provide an initial health assessment,
            recommend the right doctor, and suggest urgency level — instantly.
          </p>
        </motion.div>

        {/* Disclaimer banner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6
                     dark:bg-amber-500/10 dark:border-amber-500/30"
        >
          <AlertTriangle size={18} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <p className="text-amber-800 dark:text-amber-300 text-sm">
            <strong>Important:</strong> This AI assistant provides general health information only.
            It is <strong>not a substitute for professional medical diagnosis or treatment.</strong>{' '}
            Always consult a qualified healthcare professional for medical advice.
          </p>
        </motion.div>

        {/* Input Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card p-8 mb-6"
        >
          <form onSubmit={handleAnalyze}>
            <div className="space-y-5">
              {/* Optional name */}
              <div>
                <label className="form-label" htmlFor="ai-name">Your Name (Optional)</label>
                <input
                  id="ai-name" type="text"
                  className="form-input"
                  placeholder="Enter your name for personalized response…"
                  value={name} onChange={e => setName(e.target.value)}
                />
              </div>

              {/* Symptoms */}
              <div>
                <label className="form-label" htmlFor="ai-symptoms">
                  Describe Your Symptoms *
                </label>
                <textarea
                  id="ai-symptoms" rows={5}
                  className={`form-input resize-none ${error ? 'form-input-error' : ''}`}
                  placeholder="e.g. I've had a severe headache and dizziness for the past 3 days, along with some nausea and sensitivity to light…"
                  value={symptoms}
                  onChange={e => {
                    setSymptoms(e.target.value)
                    if (error) setError('')
                  }}
                />
                {error && <p className="form-error mt-1"><AlertTriangle size={12}/>{error}</p>}
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-gray-400 dark:text-gray-500">{symptoms.length}/1000</span>
                </div>
              </div>

              {/* Quick examples */}
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2 uppercase tracking-wider">Quick Examples:</p>
                <div className="flex flex-wrap gap-2">
                  {EXAMPLE_SYMPTOMS.map(ex => (
                    <button
                      key={ex} type="button"
                      onClick={() => { setSymptoms(ex); setError('') }}
                      className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-teal-50 hover:text-teal-700
                                 dark:bg-white/8 dark:text-gray-400 dark:hover:bg-teal-500/15 dark:hover:text-teal-300
                                 text-gray-600 rounded-full border border-gray-200 dark:border-white/10
                                 hover:border-teal-300 dark:hover:border-teal-500/30 transition-all"
                    >
                      {ex}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full justify-center py-4 text-base"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    AI is analyzing your symptoms…
                  </>
                ) : (
                  <>
                    <Sparkles size={18} />
                    Analyze Symptoms
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Loading state */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="card p-8 text-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-14 h-14 bg-teal-50 dark:bg-teal-500/10 rounded-full flex items-center justify-center">
                  <Bot size={28} className="text-teal-600 dark:text-teal-400 animate-pulse" />
                </div>
                <div>
                  <p className="font-semibold text-gray-800 dark:text-white mb-1">AI is thinking…</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Analyzing symptoms • Checking patterns • Generating recommendations</p>
                </div>
                <div className="flex gap-1">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-teal-500 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Result */}
        <div ref={resultRef}>
          <AnimatePresence>
            {result && !loading && (
              <AIResponseCard response={result} patientName={name || 'User'} />
            )}
          </AnimatePresence>
        </div>

        {/* Features info */}
        {!result && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4"
          >
            {[
              { icon: '⚡', title: 'Instant Analysis', desc: 'Results in under 2 seconds' },
              { icon: '🔒', title: 'Private & Secure', desc: 'Your data stays confidential' },
              { icon: '🌍', title: 'Available 24/7', desc: 'Help whenever you need it' },
            ].map(f => (
              <div key={f.title} className="card p-4 text-center">
                <div className="text-2xl mb-2">{f.icon}</div>
                <div className="font-semibold text-sm text-gray-800 dark:text-white">{f.title}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{f.desc}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}
