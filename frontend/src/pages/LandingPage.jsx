import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Heart, Bot, Users, Shield, Activity, Phone, Mail,
  ArrowRight, CheckCircle, Stethoscope, Clock, Star
} from 'lucide-react'

const features = [
  {
    icon: <Bot size={24} className="text-teal-600 dark:text-teal-400" />,
    bg: 'bg-teal-50 dark:bg-teal-500/10',
    title: 'AI Health Assistant',
    desc: 'Get instant AI-powered analysis of symptoms, doctor recommendations, and urgency triaging — available 24/7.',
  },
  {
    icon: <Heart size={24} className="text-red-500" />,
    bg: 'bg-red-50 dark:bg-red-500/10',
    title: 'Patient Support',
    desc: 'Submit your healthcare needs and get connected with trained volunteers and partner clinics quickly.',
  },
  {
    icon: <Users size={24} className="text-blue-600 dark:text-blue-400" />,
    bg: 'bg-blue-50 dark:bg-blue-500/10',
    title: 'Volunteer Network',
    desc: 'Join 840+ volunteers providing home visits, transport, emotional support, and medical assistance.',
  },
  {
    icon: <Shield size={24} className="text-purple-600 dark:text-purple-400" />,
    bg: 'bg-purple-50 dark:bg-purple-500/10',
    title: 'Data Privacy',
    desc: 'Your health information is encrypted and only shared with assigned care coordinators.',
  },
  {
    icon: <Activity size={24} className="text-orange-500" />,
    bg: 'bg-orange-50 dark:bg-orange-500/10',
    title: 'Real-time Dashboard',
    desc: 'Admins track patient requests, volunteer availability, and AI summaries in one clean interface.',
  },
  {
    icon: <Stethoscope size={24} className="text-green-600 dark:text-green-400" />,
    bg: 'bg-green-50 dark:bg-green-500/10',
    title: 'Doctor Referrals',
    desc: 'AI recommends the right specialist and nearby partner clinics based on your specific condition.',
  },
]

const stats = [
  { value: '12,400+', label: 'Patients Helped' },
  { value: '840+',    label: 'Active Volunteers' },
  { value: '58',      label: 'Partner Clinics' },
  { value: '100%',    label: 'Free of Charge' },
]

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'Patient, Mumbai',
    text: 'CareConnect connected me with a volunteer within hours. The AI assistant told me exactly which doctor to see. Incredible service.',
    avatar: 'PS',
    stars: 5,
  },
  {
    name: 'Dr. Rahul Gupta',
    role: 'Volunteer, Delhi',
    text: "The AI summaries save so much time. I can understand a patient's needs before I even arrive at their home.",
    avatar: 'RG',
    stars: 5,
  },
  {
    name: 'Amita Singh',
    role: 'Caregiver, Bangalore',
    text: 'My elderly mother got a telemedicine consultation the same day. The urgency assessment was spot-on.',
    avatar: 'AS',
    stars: 5,
  },
]

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}
const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.5 } },
}

export default function LandingPage() {
  return (
    <div>
      {/* ════ HERO ════ */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-gray-50 dark:bg-navy-900">
        {/* Gradient blobs */}
        <div className="hero-glow w-[600px] h-[600px] bg-teal-500/15 -top-32 -right-32 absolute" />
        <div className="hero-glow w-[400px] h-[400px] bg-cyan-500/10 bottom-0 left-0 absolute" />
        <div className="absolute inset-0 dot-pattern opacity-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-24 pb-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-400 bg-teal-500/15 border border-teal-500/30 px-3 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-teal-400 animate-pulse" />
                AI-Powered Healthcare NGO
              </span>
              <h1 className="font-display text-5xl lg:text-6xl font-black text-gray-900 dark:text-white leading-[1.1] mb-6 tracking-tight">
                Healthcare Support{' '}
                <span className="gradient-text">for Every Human</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-white/65 leading-relaxed mb-10 max-w-lg">
                CareConnect uses AI to triage patients, recommend care, and empower volunteers
                — delivering compassionate healthcare to underserved communities, free of charge.
              </p>
              <div className="flex flex-wrap gap-4 mb-12">
                <Link to="/patient" className="btn-primary text-base px-8 py-4">
                  Get Help Now
                  <ArrowRight size={18} />
                </Link>
                <Link to="/volunteer" className="btn-secondary text-base px-8 py-4">
                  Become a Volunteer
                </Link>
              </div>
              <div className="flex items-center gap-6 text-sm text-gray-500 dark:text-white/50">
                {['No insurance needed', 'Free service', 'AI-assisted care'].map(t => (
                  <span key={t} className="flex items-center gap-1.5">
                    <CheckCircle size={14} className="text-teal-400" />
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Right — Floating Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="relative h-[480px]">
                {/* Main card */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-8 left-8 right-8 glass-card rounded-2xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-teal-500/20 rounded-xl flex items-center justify-center">
                      🤖
                    </div>
                    <div>
                      <div className="text-gray-900 dark:text-white font-semibold text-sm">AI Analysis Complete</div>
                      <div className="text-gray-500 dark:text-white/50 text-xs">Symptoms analyzed in 1.2s</div>
                    </div>
                    <span className="ml-auto badge badge-green !bg-green-400/20 !text-green-400 border border-green-400/30">Done</span>
                  </div>
                  <div className="space-y-2.5">
                    {[
                      { label: 'Possible Condition', val: 'Upper respiratory infection', color: 'text-blue-400' },
                      { label: 'Recommended Doctor', val: 'General Physician', color: 'text-purple-400' },
                      { label: 'Urgency', val: 'Medium — See doctor in 2 days', color: 'text-yellow-400' },
                    ].map(r => (
                      <div key={r.label} className="flex justify-between text-xs border-b border-gray-100 dark:border-white/5 pb-2">
                        <span className="text-gray-500 dark:text-white/50">{r.label}</span>
                        <span className={`font-medium ${r.color}`}>{r.val}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>

                {/* Float cards */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute bottom-32 -left-4 bg-white dark:bg-navy-800 dark:border dark:border-white/10 rounded-xl shadow-2xl p-3.5 flex items-center gap-3"
                >
                  <div className="w-9 h-9 bg-blue-100 dark:bg-blue-500/20 rounded-lg flex items-center justify-center">👨‍⚕️</div>
                  <div>
                    <div className="text-xs font-semibold text-gray-800 dark:text-white">Volunteer Assigned</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Dr. Sharma — 2.3 km away</div>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-12 right-0 bg-white dark:bg-navy-800 dark:border dark:border-white/10 rounded-xl shadow-2xl p-3.5"
                >
                  <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">Patients Helped Today</div>
                  <div className="text-2xl font-black font-display gradient-text">47</div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ════ STATS ════ */}
      <section className="py-16 bg-white dark:bg-navy-900/80 border-b border-gray-100 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((s) => (
              <motion.div key={s.label} variants={itemVariants} className="text-center">
                <div className="font-display text-4xl font-black gradient-text mb-1">{s.value}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 font-medium">{s.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════ FEATURES ════ */}
      <section id="features" className="py-24 bg-gray-50 dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="section-tag">What We Offer</span>
            <h2 className="font-display text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              Everything You Need to <span className="gradient-text">Get Better</span>
            </h2>
            <p className="text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              From AI-powered symptom triaging to on-ground volunteer care — we've built every tool an NGO needs.
            </p>
          </div>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-100px' }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((f) => (
              <motion.div key={f.title} variants={itemVariants} className="card p-6">
                <div className={`w-12 h-12 ${f.bg} rounded-xl flex items-center justify-center mb-4`}>
                  {f.icon}
                </div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white text-lg mb-2">{f.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ════ HOW IT WORKS ════ */}
      <section className="py-24 bg-white dark:bg-navy-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="section-tag">Simple Process</span>
            <h2 className="font-display text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
              How <span className="gradient-text">CareConnect</span> Works
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-10 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-teal-500 to-cyan-500 opacity-50" />
            {[
              { step: '01', icon: '📝', title: 'Submit Your Request', desc: 'Fill out the patient support form with your name, symptoms, and urgency level.' },
              { step: '02', icon: '🤖', title: 'AI Analyzes Your Case', desc: 'Our AI assistant immediately triages your symptoms and generates a care recommendation.' },
              { step: '03', icon: '🤝', title: 'Volunteer Connects', desc: 'A trained volunteer or care coordinator reaches out to assist you within hours.' },
            ].map((s) => (
              <div key={s.step} className="text-center relative z-10">
                <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center text-3xl mx-auto mb-4 shadow-lg shadow-teal-500/25">
                  {s.icon}
                </div>
                <div className="text-xs font-bold text-teal-600 dark:text-teal-400 tracking-widest uppercase mb-2">Step {s.step}</div>
                <h3 className="font-display font-bold text-gray-900 dark:text-white text-xl mb-2">{s.title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ TESTIMONIALS ════ */}
      <section className="py-24 bg-gray-50 dark:bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <span className="section-tag">Testimonials</span>
            <h2 className="font-display text-4xl font-bold text-gray-900 dark:text-white mt-2">
              People We've <span className="gradient-text">Helped</span>
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div key={t.name} className="card p-6">
                <div className="flex mb-3">
                  {Array.from({ length: t.stars }).map((_, i) => (
                    <Star key={i} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-white/8">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center text-white text-xs font-bold">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-gray-800 dark:text-white">{t.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ════ ABOUT ════ */}
      <section id="about" className="py-24 bg-white dark:bg-navy-900/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-tag">Our Mission</span>
              <h2 className="font-display text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-6">
                Making Healthcare <span className="gradient-text">Accessible for All</span>
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                CareConnect is a technology-driven non-governmental organisation committed to bridging the gap
                between underserved communities and quality healthcare. Founded in 2015, we leverage AI to
                serve patients who otherwise cannot afford medical attention.
              </p>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-8">
                Our volunteer network spans 84 cities and our AI assistant has helped over 12,400 patients
                understand their health needs and connect with the right care.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link to="/patient" className="btn-primary">
                  Get Help <ArrowRight size={16} />
                </Link>
                <Link to="/volunteer" className="btn-secondary">
                  Join as Volunteer
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { emoji: '❤️', title: 'Compassion First', desc: 'Every patient is treated with dignity' },
                { emoji: '🔬', title: 'Evidence-Based', desc: 'All guidance follows WHO standards' },
                { emoji: '🤖', title: 'AI-Enabled', desc: 'Technology that scales human care' },
                { emoji: '🌍', title: 'Community-Led', desc: 'Rooted in the communities we serve' },
              ].map((v) => (
                <div key={v.title} className="card p-5">
                  <div className="text-3xl mb-3">{v.emoji}</div>
                  <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{v.title}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ════ CONTACT ════ */}
      <section id="contact" className="py-24 bg-teal-50 dark:bg-navy-900 relative overflow-hidden">
        <div className="hero-glow w-96 h-96 bg-teal-500/10 -top-20 -right-20 absolute" />
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center relative z-10">
          <span className="section-tag !bg-teal-500/15 !text-teal-400 !border-teal-500/30">Contact Us</span>
          <h2 className="font-display text-4xl font-bold text-gray-900 dark:text-white mt-2 mb-4">
            Ready to Make a <span className="gradient-text">Difference?</span>
          </h2>
          <p className="text-gray-600 dark:text-white/60 mb-10">
            Whether you need help or want to give it — reach out to our team.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6 mb-10">
            <a href="tel:1800000000" className="flex items-center gap-3 bg-white dark:bg-white/8 border border-gray-200 dark:border-white/10 rounded-xl px-6 py-4 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-white/12 transition-colors">
              <Phone size={18} className="text-teal-400" />
              <div className="text-left">
                <div className="text-xs text-gray-500 dark:text-white/50">Call Us</div>
                <div className="font-semibold text-sm">1800-CARE-NGO</div>
              </div>
            </a>
            <a href="mailto:help@careconnect.org" className="flex items-center gap-3 bg-white dark:bg-white/8 border border-gray-200 dark:border-white/10 rounded-xl px-6 py-4 text-gray-800 dark:text-white hover:bg-gray-50 dark:hover:bg-white/12 transition-colors">
              <Mail size={18} className="text-teal-400" />
              <div className="text-left">
                <div className="text-xs text-gray-500 dark:text-white/50">Email Us</div>
                <div className="font-semibold text-sm">help@careconnect.org</div>
              </div>
            </a>
          </div>
          <div className="flex justify-center gap-4">
            <Link to="/patient" className="btn-primary text-base px-8 py-4">
              Get Help Now <ArrowRight size={18} />
            </Link>
            <Link to="/assistant" className="btn-secondary text-base px-8 py-4">
              <Bot size={18} /> Try AI Assistant
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
