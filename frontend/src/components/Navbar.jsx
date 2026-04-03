import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Heart, Bot, LayoutDashboard, Sun, Moon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const navLinks = [
  { label: 'Home',      href: '/' },
  { label: 'Get Help',  href: '/patient' },
  { label: 'Volunteer', href: '/volunteer' },
  { label: 'AI Assistant', href: '/assistant', icon: <Bot size={15}/> },
  { label: 'Dashboard', href: '/admin', icon: <LayoutDashboard size={15}/> },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location              = useLocation()
  const { isDark, toggle }    = useTheme()

  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setOpen(false), [location])

  const isActive = (href) =>
    href === '/' ? location.pathname === '/' : location.pathname.startsWith(href)

  // On the home page: always transparent when un-scrolled
  // On other pages: adapt to theme
  const solidBg = isDark
    ? 'bg-navy-900/95 backdrop-blur-xl shadow-2xl border-b border-white/5'
    : 'bg-white/95 backdrop-blur-xl shadow-lg border-b border-gray-100'

  const transparentBg = 'bg-transparent'

  const navbarClass = scrolled ? solidBg : transparentBg

  const activeColor = 'bg-teal-500/20 text-teal-400 dark:text-teal-300'

  const logoTextColor = isDark ? 'text-white' : 'text-gray-900'
  const hamburgerColor = isDark
    ? 'text-white/80 hover:text-white hover:bg-white/10'
    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navbarClass}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/30 group-hover:shadow-teal-500/50 transition-shadow">
              <Heart size={18} strokeWidth={2.5} className="text-white" />
            </div>
            <span className={`font-display font-bold text-lg tracking-tight ${logoTextColor}`}>
              Care<span className="text-teal-400">Connect</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive(link.href)
                    ? activeColor
                    : isDark
                      ? 'text-white/70 hover:text-white hover:bg-white/10'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link.icon}
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right: Theme Toggle + CTA */}
          <div className="hidden md:flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              id="theme-toggle"
              onClick={toggle}
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium border transition-all duration-300 ${
                isDark
                  ? 'border-white/15 bg-white/8 text-yellow-300 hover:bg-white/15'
                  : 'border-gray-200 bg-gray-50 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {isDark ? (
                <>
                  <Sun size={15} className="transition-transform duration-300 rotate-0 scale-100" />
                  <span className="text-xs">Light</span>
                </>
              ) : (
                <>
                  <Moon size={15} className="transition-transform duration-300" />
                  <span className="text-xs">Dark</span>
                </>
              )}
            </button>

            <Link to="/patient" className="btn-primary py-2 text-sm">
              Request Help
            </Link>
          </div>

          {/* Mobile: theme toggle + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className={`p-2 rounded-lg transition-colors ${hamburgerColor}`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              onClick={() => setOpen(!open)}
              aria-label="Toggle menu"
              className={`p-2 rounded-lg transition-colors ${hamburgerColor}`}
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className={`md:hidden backdrop-blur-xl border-t px-4 py-4 space-y-1 animate-fade-in ${
          isDark
            ? 'bg-navy-900/98 border-white/10'
            : 'bg-white/98 border-gray-100 shadow-xl'
        }`}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                isActive(link.href)
                  ? 'bg-teal-500/20 text-teal-400'
                  : isDark
                    ? 'text-white/70 hover:text-white hover:bg-white/10'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              {link.icon}
              {link.label}
            </Link>
          ))}
          <div className="pt-2">
            <Link to="/patient" className="btn-primary w-full justify-center text-sm">
              Request Help
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
