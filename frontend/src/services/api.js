import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: { 'Content-Type': 'application/json' },
})

// Response interceptor for error normalization
api.interceptors.response.use(
  (res) => res.data,
  (err) => {
    const message =
      err.response?.data?.message ||
      err.response?.data?.error ||
      err.message ||
      'Something went wrong'
    return Promise.reject(new Error(message))
  }
)

// ── Patient APIs ──────────────────────────────────────────────────
export const submitPatient = (data)   => api.post('/patients', data)
export const getPatients   = ()       => api.get('/patients')

// ── Volunteer APIs ────────────────────────────────────────────────
export const submitVolunteer = (data) => api.post('/volunteers', data)
export const getVolunteers   = ()     => api.get('/volunteers')

// ── AI APIs ───────────────────────────────────────────────────────
export const analyzeSymptoms = (data) => api.post('/ai/analyze', data)

export default api
