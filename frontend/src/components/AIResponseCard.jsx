import { AlertTriangle, Stethoscope, Clock, Shield, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

const urgencyColors = {
  LOW:    {
    bg: 'bg-green-50 dark:bg-green-500/10',
    border: 'border-green-200 dark:border-green-500/30',
    text: 'text-green-700 dark:text-green-400',
    badge: 'badge-green',
  },
  MEDIUM: {
    bg: 'bg-yellow-50 dark:bg-yellow-500/10',
    border: 'border-yellow-200 dark:border-yellow-500/30',
    text: 'text-yellow-700 dark:text-yellow-400',
    badge: 'badge-yellow',
  },
  HIGH: {
    bg: 'bg-red-50 dark:bg-red-500/10',
    border: 'border-red-200 dark:border-red-500/30',
    text: 'text-red-700 dark:text-red-400',
    badge: 'badge-red',
  },
}

export default function AIResponseCard({ response, patientName }) {
  if (!response) return null

  const {
    possibleCondition,
    doctorType,
    urgencyRecommendation,
    precautions,
    patientSummary,
    disclaimer,
  } = response

  const urg = urgencyRecommendation?.toUpperCase() || 'MEDIUM'
  const colors = urgencyColors[urg] || urgencyColors.MEDIUM

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-6 space-y-4"
    >
      {/* Header */}
      <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-teal-600 to-cyan-600 rounded-2xl text-white">
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
          🤖
        </div>
        <div>
          <h3 className="font-semibold font-display">AI Health Analysis</h3>
          <p className="text-xs text-white/75">Analysis for {patientName || 'Patient'}</p>
        </div>
        <span className={`ml-auto badge ${colors.badge} !bg-white/20 !text-white border border-white/30`}>
          {urg} Urgency
        </span>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Possible Condition */}
        <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl dark:bg-blue-500/10 dark:border-blue-500/30">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle size={16} className="text-blue-600 dark:text-blue-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 dark:text-blue-400">Possible Condition</span>
          </div>
          <p className="text-sm font-medium text-blue-900 dark:text-blue-300">{possibleCondition}</p>
        </div>

        {/* Doctor Type */}
        <div className="p-4 bg-purple-50 border border-purple-200 rounded-xl dark:bg-purple-500/10 dark:border-purple-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Stethoscope size={16} className="text-purple-600 dark:text-purple-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-purple-700 dark:text-purple-400">Recommended Doctor</span>
          </div>
          <p className="text-sm font-medium text-purple-900 dark:text-purple-300">{doctorType}</p>
        </div>

        {/* Urgency */}
        <div className={`p-4 ${colors.bg} border ${colors.border} rounded-xl`}>
          <div className="flex items-center gap-2 mb-2">
            <Clock size={16} className={colors.text} />
            <span className={`text-xs font-semibold uppercase tracking-wider ${colors.text}`}>Urgency Level</span>
          </div>
          <p className={`text-sm font-medium ${colors.text}`}>
            {urg === 'HIGH' ? '⚠️ Seek immediate care' : urg === 'MEDIUM' ? '📅 Within 2-3 days' : '✅ Routine appointment'}
          </p>
        </div>

        {/* Precautions */}
        <div className="p-4 bg-orange-50 border border-orange-200 rounded-xl dark:bg-orange-500/10 dark:border-orange-500/30">
          <div className="flex items-center gap-2 mb-2">
            <Shield size={16} className="text-orange-600 dark:text-orange-400" />
            <span className="text-xs font-semibold uppercase tracking-wider text-orange-700 dark:text-orange-400">Precautions</span>
          </div>
          <ul className="space-y-1">
            {Array.isArray(precautions)
              ? precautions.map((p, i) => (
                  <li key={i} className="text-xs text-orange-900 dark:text-orange-300 flex items-start gap-1">
                    <ChevronRight size={12} className="mt-0.5 shrink-0" />{p}
                  </li>
                ))
              : <li className="text-xs text-orange-900 dark:text-orange-300">{precautions}</li>
            }
          </ul>
        </div>
      </div>

      {/* Patient Summary for Volunteers */}
      {patientSummary && (
        <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl dark:bg-white/5 dark:border-white/10">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-2">📋 Volunteer Summary</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">{patientSummary}</p>
        </div>
      )}

      {/* Disclaimer */}
      <div className="flex items-start gap-2 p-3 bg-amber-50 border border-amber-200 rounded-xl dark:bg-amber-500/10 dark:border-amber-500/30">
        <span className="text-base shrink-0">⚠️</span>
        <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
          <strong>Disclaimer:</strong>{' '}
          {disclaimer || 'This is not medical advice. Please consult a qualified healthcare professional for proper diagnosis and treatment.'}
        </p>
      </div>
    </motion.div>
  )
}
