import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './context/ThemeContext.jsx'

// Inline script prevents flash-of-wrong-theme before React hydrates
const themeScript = `
  (function(){
    try {
      var t = localStorage.getItem('cc-theme');
      if (t === 'dark' || (!t && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
      }
    } catch(e){}
  })();
`
const scriptEl = document.createElement('script')
scriptEl.innerHTML = themeScript
document.head.insertBefore(scriptEl, document.head.firstChild)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <App />
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            className: 'dark-toast',
            style: {
              borderRadius: '12px',
              fontSize: '0.875rem',
              fontWeight: '500',
              padding: '12px 16px',
              background: 'var(--toast-bg)',
              color: 'var(--toast-color)',
              border: '1px solid var(--toast-border)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
            },
            success: {
              iconTheme: { primary: '#14b8a6', secondary: '#fff' },
            },
            error: {
              iconTheme: { primary: '#ef4444', secondary: '#fff' },
            },
          }}
        />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
