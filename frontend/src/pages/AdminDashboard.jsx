import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import {
  Users, Heart, Bot, RefreshCw, Search, ChevronDown, ChevronUp,
  Calendar, Phone, Mail, MapPin, Activity
} from 'lucide-react'
import { getPatients, getVolunteers } from '../services/api'
import toast from 'react-hot-toast'

const TABS = [
  { id: 'patients',   label: 'Patients',      icon: Heart },
  { id: 'volunteers', label: 'Volunteers',     icon: Users },
  { id: 'ai',         label: 'AI Summaries',   icon: Bot },
]

const URGENCY_BADGE = {
  low:    <span className="badge-green">🟢 Low</span>,
  medium: <span className="badge-yellow">🟡 Medium</span>,
  high:   <span className="badge-red">🔴 High</span>,
}

function SkeletonRow({ cols = 5 }) {
  return (
    <tr>
      {Array.from({ length: cols }).map((_, i) => (
        <td key={i} className="px-4 py-3">
          <div className="skeleton h-4 rounded w-3/4" />
        </td>
      ))}
    </tr>
  )
}

export default function AdminDashboard() {
  const [activeTab, setActiveTab]   = useState('patients')
  const [patients, setPatients]     = useState([])
  const [volunteers, setVolunteers] = useState([])
  const [loading, setLoading]       = useState(true)
  const [search, setSearch]         = useState('')
  const [expandedId, setExpandedId] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    try {
      const [p, v] = await Promise.all([getPatients(), getVolunteers()])
      setPatients(p.data || p || [])
      setVolunteers(v.data || v || [])
    } catch (err) {
      toast.error('Failed to load dashboard data: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchData() }, [])

  const filterText = (items, fields) =>
    items.filter(item =>
      fields.some(f => (item[f] || '').toLowerCase().includes(search.toLowerCase()))
    )

  const filteredPatients   = filterText(patients,   ['name', 'city', 'urgency', 'symptoms'])
  const filteredVolunteers = filterText(volunteers, ['name', 'city', 'profession'])
  const patientsWithAI     = filteredPatients.filter(p => p.aiResponse)

  const stats = [
    { label: 'Total Patients',   val: patients.length,                                    color: 'text-red-600 dark:text-red-400',    bg: 'bg-red-50 dark:bg-red-500/10',    icon: Heart },
    { label: 'Total Volunteers', val: volunteers.length,                                   color: 'text-blue-600 dark:text-blue-400',  bg: 'bg-blue-50 dark:bg-blue-500/10',  icon: Users },
    { label: 'High Urgency',     val: patients.filter(p => p.urgency === 'high').length,   color: 'text-orange-600 dark:text-orange-400', bg: 'bg-orange-50 dark:bg-orange-500/10', icon: Activity },
    { label: 'AI Analyses Done', val: patients.filter(p => p.aiResponse).length,           color: 'text-teal-600 dark:text-teal-400',  bg: 'bg-teal-50 dark:bg-teal-500/10',  icon: Bot },
  ]

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-navy-900 pt-24 pb-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <span className="section-tag">Admin Panel</span>
            <h1 className="font-display text-3xl font-bold text-gray-900 dark:text-white mt-1">
              CareConnect <span className="gradient-text">Dashboard</span>
            </h1>
          </div>
          <button
            onClick={fetchData}
            className="btn-ghost border border-gray-200 dark:border-white/10 rounded-xl text-sm"
          >
            <RefreshCw size={15} className={loading ? 'animate-spin' : ''} />
            Refresh Data
          </button>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((s) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="card p-5"
              >
                <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>
                  <Icon size={18} className={s.color} />
                </div>
                <div className={`font-display text-3xl font-black ${s.color} mb-0.5`}>
                  {loading ? '–' : s.val}
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 font-medium">{s.label}</div>
              </motion.div>
            )
          })}
        </div>

        {/* Tabs + Search */}
        <div className="card overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 border-b border-gray-100 dark:border-white/8 bg-gray-50/50 dark:bg-white/3">
            {/* Tabs */}
            <div className="flex gap-1 bg-gray-100 dark:bg-white/5 p-1 rounded-xl w-fit">
              {TABS.map(tab => {
                const Icon = tab.icon
                return (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); setSearch('') }}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                      activeTab === tab.id
                        ? 'bg-white dark:bg-white/10 text-teal-700 dark:text-teal-300 shadow-sm'
                        : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                    }`}
                  >
                    <Icon size={14} />
                    {tab.label}
                    <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                      activeTab === tab.id
                        ? 'bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300'
                        : 'bg-gray-200 text-gray-500 dark:bg-white/10 dark:text-gray-400'
                    }`}>
                      {tab.id === 'patients' ? patients.length :
                       tab.id === 'volunteers' ? volunteers.length :
                       patients.filter(p => p.aiResponse).length}
                    </span>
                  </button>
                )
              })}
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" />
              <input
                type="text"
                placeholder={`Search ${activeTab}…`}
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-8 pr-4 py-2 text-sm border border-gray-200 dark:border-white/10 rounded-lg
                           focus:outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-400/10
                           bg-white dark:bg-white/5 text-gray-800 dark:text-gray-200
                           placeholder:text-gray-400 dark:placeholder:text-gray-500 w-56"
              />
            </div>
          </div>

          {/* Table Content */}
          <div className="overflow-x-auto">

            {/* ── PATIENTS TAB ── */}
            {activeTab === 'patients' && (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/8 bg-gray-50/50 dark:bg-white/3">
                    {['Name', 'Age', 'City', 'Urgency', 'Symptoms', 'Date', 'AI'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {loading
                    ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={7} />)
                    : filteredPatients.length === 0
                      ? (
                        <tr>
                          <td colSpan={7} className="px-4 py-12 text-center text-gray-400 dark:text-gray-500 text-sm">
                            {search ? 'No results match your search.' : 'No patients submitted yet.'}
                          </td>
                        </tr>
                      )
                      : filteredPatients.map(p => (
                          <>
                            <tr
                              key={p._id}
                              className="hover:bg-gray-50 dark:hover:bg-white/3 cursor-pointer transition-colors"
                              onClick={() => setExpandedId(expandedId === p._id ? null : p._id)}
                            >
                              <td className="px-4 py-3.5">
                                <div className="font-semibold text-gray-800 dark:text-white">{p.name}</div>
                                <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                  <Phone size={10} /> {p.phone}
                                </div>
                              </td>
                              <td className="px-4 py-3.5 text-gray-600 dark:text-gray-300">{p.age} yrs</td>
                              <td className="px-4 py-3.5">
                                <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                                  <MapPin size={12} className="text-gray-400 dark:text-gray-500" /> {p.city}
                                </span>
                              </td>
                              <td className="px-4 py-3.5">
                                {URGENCY_BADGE[p.urgency] || <span className="badge-blue">–</span>}
                              </td>
                              <td className="px-4 py-3.5 max-w-xs">
                                <p className="text-gray-600 dark:text-gray-300 truncate">{p.symptoms}</p>
                              </td>
                              <td className="px-4 py-3.5 text-gray-400 dark:text-gray-500 text-xs whitespace-nowrap">
                                <span className="flex items-center gap-1">
                                  <Calendar size={11} />
                                  {new Date(p.createdAt).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'2-digit' })}
                                </span>
                              </td>
                              <td className="px-4 py-3.5">
                                <span className={`badge ${p.aiResponse ? 'badge-teal' : 'bg-gray-100 dark:bg-white/8 text-gray-400 dark:text-gray-500'}`}>
                                  {p.aiResponse ? '✓ Done' : 'Pending'}
                                </span>
                                {expandedId === p._id
                                  ? <ChevronUp size={14} className="text-gray-400 ml-1 inline" />
                                  : <ChevronDown size={14} className="text-gray-400 ml-1 inline" />
                                }
                              </td>
                            </tr>
                            {/* Expanded AI summary row */}
                            {expandedId === p._id && p.aiResponse && (
                              <tr>
                                <td colSpan={7} className="px-4 pb-4 bg-teal-50/30 dark:bg-teal-500/5">
                                  <div className="border border-teal-200 dark:border-teal-500/30 rounded-xl p-4 mt-1 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                                    <div>
                                      <span className="font-semibold text-gray-500 dark:text-gray-400 block mb-1">Possible Condition</span>
                                      <span className="text-blue-700 dark:text-blue-400 font-medium">{p.aiResponse.possibleCondition}</span>
                                    </div>
                                    <div>
                                      <span className="font-semibold text-gray-500 dark:text-gray-400 block mb-1">Doctor Type</span>
                                      <span className="text-purple-700 dark:text-purple-400 font-medium">{p.aiResponse.doctorType}</span>
                                    </div>
                                    <div>
                                      <span className="font-semibold text-gray-500 dark:text-gray-400 block mb-1">Urgency</span>
                                      <span className="font-medium text-gray-700 dark:text-gray-300">{p.aiResponse.urgencyRecommendation}</span>
                                    </div>
                                    <div>
                                      <span className="font-semibold text-gray-500 dark:text-gray-400 block mb-1">Volunteer Summary</span>
                                      <span className="text-gray-600 dark:text-gray-300 italic">{p.aiResponse.patientSummary}</span>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </>
                        ))
                  }
                </tbody>
              </table>
            )}

            {/* ── VOLUNTEERS TAB ── */}
            {activeTab === 'volunteers' && (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-white/8 bg-gray-50/50 dark:bg-white/3">
                    {['Name', 'Profession', 'City', 'Availability', 'Skills', 'Date'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 dark:divide-white/5">
                  {loading
                    ? Array.from({ length: 5 }).map((_, i) => <SkeletonRow key={i} cols={6} />)
                    : filteredVolunteers.length === 0
                      ? (
                        <tr>
                          <td colSpan={6} className="px-4 py-12 text-center text-gray-400 dark:text-gray-500 text-sm">
                            {search ? 'No results match your search.' : 'No volunteers registered yet.'}
                          </td>
                        </tr>
                      )
                      : filteredVolunteers.map(v => (
                          <tr key={v._id} className="hover:bg-gray-50 dark:hover:bg-white/3 transition-colors">
                            <td className="px-4 py-3.5">
                              <div className="font-semibold text-gray-800 dark:text-white">{v.name}</div>
                              <div className="text-xs text-gray-400 dark:text-gray-500 flex items-center gap-1">
                                <Mail size={10} /> {v.email}
                              </div>
                            </td>
                            <td className="px-4 py-3.5 text-gray-600 dark:text-gray-300">{v.profession || '—'}</td>
                            <td className="px-4 py-3.5">
                              <span className="flex items-center gap-1 text-gray-600 dark:text-gray-300">
                                <MapPin size={12} className="text-gray-400 dark:text-gray-500" /> {v.city}
                              </span>
                            </td>
                            <td className="px-4 py-3.5">
                              <span className="badge badge-blue">{v.availability}</span>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="flex flex-wrap gap-1 max-w-xs">
                                {(v.skills || []).slice(0, 3).map(s => (
                                  <span key={s} className="badge badge-teal text-xs">{s}</span>
                                ))}
                                {(v.skills || []).length > 3 && (
                                  <span className="badge bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400">+{v.skills.length - 3}</span>
                                )}
                              </div>
                            </td>
                            <td className="px-4 py-3.5 text-gray-400 dark:text-gray-500 text-xs whitespace-nowrap">
                              <span className="flex items-center gap-1">
                                <Calendar size={11} />
                                {new Date(v.createdAt).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'2-digit' })}
                              </span>
                            </td>
                          </tr>
                        ))
                  }
                </tbody>
              </table>
            )}

            {/* ── AI SUMMARIES TAB ── */}
            {activeTab === 'ai' && (
              <div className="p-4 space-y-3">
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => (
                      <div key={i} className="skeleton h-24 rounded-xl" />
                    ))
                  : patientsWithAI.length === 0
                    ? (
                      <div className="py-16 text-center text-gray-400 dark:text-gray-500 text-sm">
                        No AI analyses yet. Patients need to submit requests first.
                      </div>
                    )
                    : patientsWithAI.map(p => (
                        <motion.div
                          key={p._id}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="border border-gray-200 dark:border-white/8 rounded-xl p-5
                                     hover:border-teal-300 dark:hover:border-teal-500/40
                                     hover:bg-teal-50/20 dark:hover:bg-teal-500/5 transition-all"
                        >
                          <div className="flex items-start justify-between gap-4 mb-3">
                            <div>
                              <span className="font-semibold text-gray-800 dark:text-white">{p.name}</span>
                              <span className="text-gray-400 dark:text-gray-500 text-xs ml-2">Age {p.age} · {p.city}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              {URGENCY_BADGE[p.urgency]}
                              <span className="badge badge-teal">AI</span>
                            </div>
                          </div>
                          <p className="text-xs text-gray-500 dark:text-gray-400 mb-3 italic">
                            <span className="font-medium text-gray-600 dark:text-gray-300">Symptoms:</span> {p.symptoms}
                          </p>
                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                            <div className="bg-blue-50 dark:bg-blue-500/10 rounded-lg p-2.5">
                              <span className="font-semibold text-blue-700 dark:text-blue-400 block">Condition</span>
                              <span className="text-blue-900 dark:text-blue-300">{p.aiResponse.possibleCondition}</span>
                            </div>
                            <div className="bg-purple-50 dark:bg-purple-500/10 rounded-lg p-2.5">
                              <span className="font-semibold text-purple-700 dark:text-purple-400 block">Doctor</span>
                              <span className="text-purple-900 dark:text-purple-300">{p.aiResponse.doctorType}</span>
                            </div>
                            <div className="bg-orange-50 dark:bg-orange-500/10 rounded-lg p-2.5">
                              <span className="font-semibold text-orange-700 dark:text-orange-400 block">Urgency</span>
                              <span className="text-orange-900 dark:text-orange-300">{p.aiResponse.urgencyRecommendation}</span>
                            </div>
                            <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-2.5">
                              <span className="font-semibold text-gray-600 dark:text-gray-400 block">Summary</span>
                              <span className="text-gray-700 dark:text-gray-300 line-clamp-2">{p.aiResponse.patientSummary}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))
                }
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
