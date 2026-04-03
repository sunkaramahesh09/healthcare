import { Link } from 'react-router-dom'
import { Heart, Mail, Phone, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-navy-900 dark:bg-navy-900 text-white/70 pt-16 pb-8 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          {/* Brand */}
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center">
                <Heart size={18} strokeWidth={2.5} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Care<span className="text-teal-400">Connect</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed mb-5 max-w-xs text-white/60">
              An AI-powered non-profit platform connecting patients with volunteers
              and intelligent healthcare guidance — free for everyone.
            </p>
            <div className="flex items-center gap-2 text-sm text-red-400 font-medium">
              🚨 Emergency: <a href="tel:112" className="underline hover:text-red-300 transition-colors">112</a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { label: 'Patient Support', href: '/patient' },
                { label: 'Volunteer Registration', href: '/volunteer' },
                { label: 'AI Assistant', href: '/assistant' },
                { label: 'Admin Dashboard', href: '/admin' },
              ].map(l => (
                <li key={l.href}>
                  <Link to={l.href} className="text-white/60 hover:text-teal-400 transition-colors">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2 text-white/60"><MapPin size={14} className="text-teal-400 shrink-0" /> New Delhi, India</li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-teal-400 shrink-0" />
                <a href="mailto:help@careconnect.org" className="text-white/60 hover:text-teal-400 transition-colors">help@careconnect.org</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={14} className="text-teal-400 shrink-0" />
                <a href="tel:1800000000" className="text-white/60 hover:text-teal-400 transition-colors">1800-CARE-NGO</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-white/35">
          <p>© 2026 CareConnect. All rights reserved. | NGO Registered: NGO-2026-DL-04821</p>
          <p className="flex items-center gap-1">Built with <Heart size={10} className="text-red-400" /> for communities</p>
        </div>
      </div>
    </footer>
  )
}
