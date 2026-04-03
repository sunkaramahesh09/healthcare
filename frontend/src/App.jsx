import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LandingPage from './pages/LandingPage'
import PatientForm from './pages/PatientForm'
import VolunteerForm from './pages/VolunteerForm'
import AIAssistant from './pages/AIAssistant'
import AdminDashboard from './pages/AdminDashboard'

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-navy-900 transition-colors duration-300">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/"          element={<LandingPage />} />
          <Route path="/patient"   element={<PatientForm />} />
          <Route path="/volunteer" element={<VolunteerForm />} />
          <Route path="/assistant" element={<AIAssistant />} />
          <Route path="/admin"     element={<AdminDashboard />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
