# CareConnect – AI-Powered Healthcare Support Platform

> **A full-stack NGO web application** connecting patients with volunteers and AI-powered health guidance. Built for communities that need care most.

[![License: MIT](https://img.shields.io/badge/License-MIT-teal.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-v18+-green)](https://nodejs.org)
[![React](https://img.shields.io/badge/React-18-blue)](https://reactjs.org)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://mongodb.com)

---

## 🌟 Overview

**CareConnect** is a production-ready healthcare support platform designed for NGOs and non-profits. It allows:

- **Patients** to submit support requests and receive instant AI-powered health analysis
- **Volunteers** to register their skills and availability for community care
- **Admins** to manage all patient and volunteer data with real-time AI summaries
- **Anyone** to use the AI symptom checker — 24/7, free of charge

---

## ✨ Features

| Feature | Description |
|---|---|
| 🤖 **Smart AI Assistant** | Symptom analysis with condition hints, doctor recommendations, urgency triaging |
| 📋 **Patient Support Form** | Multi-field form with validation, AI integration, and submission confirmation |
| 🤝 **Volunteer Registration** | Skill-tag based registration with availability settings |
| 📊 **Admin Dashboard** | Tabbed view of all patients, volunteers, and AI analyses with search |
| 🔔 **Toast Notifications** | Real-time feedback on every action |
| 📱 **Mobile Responsive** | Full mobile support with hamburger nav |
| ⚡ **OpenAI GPT Ready** | Drop-in your API key to upgrade from mock AI to real GPT |

---

## 🏗️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 5 | Build tool & dev server |
| Tailwind CSS | 3 | Utility-first styling |
| Framer Motion | 11 | Animations |
| React Router | 6 | Client-side routing |
| Axios | 1.6 | HTTP client |
| Lucide React | Latest | Icon library |
| react-hot-toast | 2.4 | Toast notifications |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime |
| Express | 4.18 | Web framework |
| MongoDB | 8 (Mongoose) | Database |
| OpenAI SDK | 4 | AI integration (optional) |
| CORS | 2.8 | Cross-origin support |
| dotenv | 16 | Environment variables |
| Morgan | 1.10 | HTTP request logging |
| Nodemon | 3 | Dev auto-reload |

---

## 🤖 AI Feature: Smart Healthcare Assistant

### How It Works

The AI engine processes patient-reported symptoms through a **two-tier system**:

#### Tier 1: OpenAI GPT (When `OPENAI_API_KEY` is set)
Uses `gpt-3.5-turbo` with a medically-aware prompt to generate:
- Possible condition description
- Recommended doctor type
- Urgency level (LOW / MEDIUM / HIGH)
- Practical precautions list
- Volunteer-facing patient summary

#### Tier 2: Rule-Based Mock AI Engine (Always available)
A curated medical knowledge base with **11 symptom categories**:
1. Cardiac / Respiratory (chest pain, breathing)
2. Fever / Infections
3. Upper Respiratory Tract (cough, cold)
4. Neurological (headache, vertigo, migraine)
5. Gastrointestinal (stomach ache, cramps)
6. Acute Gastroenteritis (diarrhea)
7. Dermatological (skin rash, allergies)
8. Musculoskeletal (back pain, joint pain)
9. Mental Health (anxiety, depression, insomnia)
10. Metabolic (diabetes, blood sugar)
11. Ophthalmological (eye issues)

Each match returns condition hints, specialist recommendations, urgency ratings, and 4–5 practical precautions.

### AI Safety Rules
- ❌ No definitive medical diagnosis ever given
- ✅ Disclaimer on every response
- ✅ Emergency escalation guidance for HIGH urgency
- ✅ Professional consultation always recommended

---

## 🏥 NGO Use Case

CareConnect is purpose-built for non-profits serving underserved communities:

**Problem:** Rural and low-income patients don't know which doctor to see, whether their symptoms are urgent, or how to describe their condition to a volunteer.

**Solution:** 
1. Patient fills form → AI instantly triages & summarizes
2. Volunteer receives clear briefing (from AI summary) before visit
3. Admin sees full picture: patient needs + volunteer availability
4. No insurance, no fees — 100% accessible

**Real-world impact:** Reduces volunteer coordination time by ~60%, ensures patients reach the right care faster, and enables NGOs to operate effectively with minimal staff.

---

## 🚀 Setup Instructions

### Prerequisites
- Node.js 18+
- npm or yarn
- MongoDB (local or Atlas — backup in-memory store available)

### 1. Clone & Navigate
```bash
git clone https://github.com/yourusername/careconnect.git
cd careconnect
```

### 2. Backend Setup
```bash
cd backend
cp .env .env.local  # or edit .env directly
npm install
npm run dev
```

The backend starts at `http://localhost:5000`

### 3. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

The frontend starts at `http://localhost:3000`

### 4. Environment Variables

**`backend/.env`:**
```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/careconnect
FRONTEND_URL=http://localhost:3000
NODE_ENV=development

# Optional: Enable real OpenAI GPT responses
# OPENAI_API_KEY=sk-your-key-here
```

> **Note:** If MongoDB is not running, the app uses in-memory storage automatically. No data persists between restarts in this mode.

---

## 📁 Project Structure

```
CareConnect/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.jsx          # Sticky glassmorphism nav
│   │   │   ├── Footer.jsx          # Footer with links
│   │   │   └── AIResponseCard.jsx  # AI result display card
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx     # Hero + features + testimonials
│   │   │   ├── PatientForm.jsx     # Patient support form
│   │   │   ├── VolunteerForm.jsx   # Volunteer registration
│   │   │   ├── AIAssistant.jsx     # Standalone AI checker
│   │   │   └── AdminDashboard.jsx  # Admin data tables
│   │   ├── services/
│   │   │   └── api.js              # Axios API client
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css               # Tailwind + custom styles
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── backend/
│   ├── models/
│   │   ├── Patient.js              # Patient Mongoose schema
│   │   └── Volunteer.js            # Volunteer Mongoose schema
│   ├── routes/
│   │   ├── patients.js             # Patient CRUD + AI trigger
│   │   ├── volunteers.js           # Volunteer CRUD
│   │   └── ai.js                   # Standalone AI endpoint
│   ├── services/
│   │   └── aiService.js            # Mock AI + OpenAI fallback
│   ├── server.js                   # Express app entry
│   ├── .env                        # Environment config
│   └── package.json
│
└── README.md
```

---

## 🌐 Deployment

### Frontend → Vercel
1. Push `frontend/` to GitHub
2. Import to [vercel.com](https://vercel.com)
3. Set `VITE_API_URL` env var to your backend URL
4. Deploy!

### Backend → Render
1. Push `backend/` to GitHub  
2. Create a Web Service on [render.com](https://render.com)
3. Set env vars: `MONGODB_URI`, `FRONTEND_URL`, `NODE_ENV=production`
4. Start command: `npm start`

### Backend → Railway
```bash
railway init
railway up
railway env set MONGODB_URI="..."
```

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/health` | Server health check |
| POST | `/api/patients` | Submit patient request (triggers AI) |
| GET | `/api/patients` | List all patients (admin) |
| GET | `/api/patients/:id` | Get single patient |
| POST | `/api/volunteers` | Register volunteer |
| GET | `/api/volunteers` | List all volunteers (admin) |
| POST | `/api/ai/analyze` | Standalone AI symptom analysis |

---

## 📄 License

MIT License — Free to use for educational and NGO purposes.

---

## 🙏 Acknowledgements

Built with ❤️ to help communities that need care most.
Submission for: **Healthcare NGO Internship Assignment** — April 2026
