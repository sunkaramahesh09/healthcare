/**
 * CareConnect AI Service
 * ─────────────────────────────────────────────────────────────────
 * Uses OpenAI GPT when OPENAI_API_KEY is set.
 * Falls back to a sophisticated rule-based mock AI engine.
 *
 * The mock engine uses symptom keyword matching with a curated
 * medical knowledge base to produce realistic, safe responses.
 */

const DISCLAIMER =
  'This is NOT medical advice. Please consult a qualified healthcare professional for ' +
  'proper diagnosis and treatment. In case of emergency, call 112 immediately.'

// ── Rule-based knowledge base ────────────────────────────────────
const SYMPTOM_RULES = [
  {
    keywords: ['chest pain', 'chest tightness', 'heart', 'palpitation', 'shortness of breath', 'breathing difficulty'],
    condition: 'Possible cardiac or respiratory issue (e.g., Angina, Asthma, or Panic Attack)',
    doctor: 'Cardiologist / Emergency Physician',
    urgency: 'HIGH',
    precautions: [
      'Do not exert yourself — rest immediately',
      'Loosen any tight clothing around chest',
      'If pain radiates to arm or jaw, call emergency (112) NOW',
      'Avoid eating or drinking until examined',
      'Note the time symptoms started',
    ],
  },
  {
    keywords: ['fever', 'high temperature', 'chills', 'hot', 'sweating', 'temperature'],
    condition: 'Fever — possibly viral/bacterial infection (e.g., Flu, Typhoid, or Dengue)',
    doctor: 'General Physician',
    urgency: 'MEDIUM',
    precautions: [
      'Stay well-hydrated — drink water, ORS, or coconut water',
      'Take paracetamol if fever exceeds 38.5°C',
      'Rest and avoid cold environments',
      'Monitor temperature every 4 hours',
      'Seek emergency care if fever exceeds 40°C or lasts >3 days',
    ],
  },
  {
    keywords: ['cough', 'sore throat', 'cold', 'runny nose', 'congestion', 'sneezing', 'mucus', 'phlegm'],
    condition: 'Upper Respiratory Tract Infection (Common Cold, Pharyngitis, or Bronchitis)',
    doctor: 'General Physician / ENT Specialist',
    urgency: 'LOW',
    precautions: [
      'Gargle with warm salt water twice daily',
      'Stay warm and avoid cold drinks',
      'Inhale steam to relieve congestion',
      'Rest your voice if throat is sore',
      'See a doctor if symptoms persist beyond 7 days',
    ],
  },
  {
    keywords: ['headache', 'head pain', 'migraine', 'dizziness', 'vertigo', 'nausea', 'vomiting'],
    condition: 'Tension Headache or Migraine (possibly with associated nausea/vertigo)',
    doctor: 'Neurologist / General Physician',
    urgency: 'MEDIUM',
    precautions: [
      'Rest in a quiet, dark room',
      'Apply a cold or warm compress to your forehead',
      'Stay hydrated — dehydration worsens headaches',
      'Avoid screen time and bright lights',
      'If headache is sudden and severe ("thunderclap"), seek emergency care',
    ],
  },
  {
    keywords: ['stomach', 'abdomen', 'abdominal', 'stomach ache', 'cramps', 'bloating', 'gas', 'indigestion', 'acidity'],
    condition: 'Gastrointestinal Issue (Gastritis, IBS, or Acid Reflux)',
    doctor: 'Gastroenterologist / General Physician',
    urgency: 'LOW',
    precautions: [
      'Avoid spicy, fried, and acidic foods',
      'Eat smaller, more frequent meals',
      'Drink warm water and avoid carbonated drinks',
      'Do not lie down immediately after eating',
      'Seek medical attention if pain is severe or persistent',
    ],
  },
  {
    keywords: ['diarrhea', 'loose motion', 'watery stool', 'dehydration'],
    condition: 'Acute Gastroenteritis or Food Poisoning',
    doctor: 'General Physician / Gastroenterologist',
    urgency: 'MEDIUM',
    precautions: [
      'Drink ORS (Oral Rehydration Solution) frequently',
      'Eat light foods: rice, banana, toast',
      'Avoid dairy and fatty foods',
      'Monitor for blood in stool — if present, seek emergency care immediately',
      'Keep track of frequency of episodes',
    ],
  },
  {
    keywords: ['rash', 'itching', 'hives', 'skin', 'eczema', 'allergy', 'swelling', 'redness'],
    condition: 'Allergic Reaction or Skin Condition (Urticaria, Eczema, or Contact Dermatitis)',
    doctor: 'Dermatologist / Allergist',
    urgency: 'LOW',
    precautions: [
      'Avoid scratching — it worsens the rash',
      'Apply a cool, damp cloth to reduce itching',
      'Identify and avoid the allergen if possible',
      'Use unscented, gentle soap and moisturizer',
      'If rash spreads rapidly or breathing is affected, call emergency services',
    ],
  },
  {
    keywords: ['back pain', 'back ache', 'spine', 'neck pain', 'shoulder', 'joint pain', 'muscle pain', 'body ache'],
    condition: 'Musculoskeletal Pain (Muscle Strain, Arthritis, or Disc Issue)',
    doctor: 'Orthopedic Surgeon / Physiotherapist',
    urgency: 'LOW',
    precautions: [
      'Apply ice for first 24–48 hours, then switch to heat',
      'Avoid heavy lifting and sudden twisting movements',
      'Gentle stretching can help relieve tension',
      'Maintain good posture while sitting',
      'If pain radiates to limbs or causes numbness, consult urgently',
    ],
  },
  {
    keywords: ['anxiety', 'stress', 'depression', 'mental', 'panic', 'mood', 'sleep', 'insomnia', 'fatigue'],
    condition: 'Mental Health Concern (Anxiety, Depression, or Stress-related Disorder)',
    doctor: 'Psychiatrist / Psychologist / Counselor',
    urgency: 'MEDIUM',
    precautions: [
      'Practice deep breathing: inhale 4s, hold 4s, exhale 6s',
      'Maintain a regular sleep schedule',
      'Limit caffeine and alcohol',
      'Stay connected with supportive friends/family',
      'Avoid isolating yourself — seek professional mental health support',
    ],
  },
  {
    keywords: ['diabetes', 'blood sugar', 'glucose', 'thirst', 'frequent urination', 'weight loss'],
    condition: 'Possible Diabetes or Related Blood-Sugar Issue',
    doctor: 'Endocrinologist / General Physician',
    urgency: 'MEDIUM',
    precautions: [
      'Monitor blood glucose levels regularly if diabetic',
      'Avoid sugary foods and refined carbohydrates',
      'Stay physically active — short walks help regulate blood sugar',
      'Do not skip meals',
      'Stay well-hydrated with water (not sugary drinks)',
    ],
  },
  {
    keywords: ['eye', 'vision', 'blurry', 'itchy eyes', 'red eyes', 'conjunctivitis'],
    condition: 'Eye Infection or Vision Issue (Conjunctivitis, or Refractive Error)',
    doctor: 'Ophthalmologist',
    urgency: 'LOW',
    precautions: [
      'Do not rub your eyes',
      'Wash hands frequently',
      'Avoid wearing contact lenses until recovered',
      'Use clean, separate towels',
      'If sudden vision loss occurs, seek emergency care immediately',
    ],
  },
]

// ── Default / Fallback response ───────────────────────────────────
const DEFAULT_RESPONSE = {
  possibleCondition: 'Unspecified condition — further evaluation needed',
  doctorType: 'General Physician',
  urgencyRecommendation: 'MEDIUM — Please see a doctor within 2–3 days',
  precautions: [
    'Rest and avoid strenuous activity',
    'Stay well-hydrated',
    'Monitor your symptoms and note any changes',
    'Consult a doctor if symptoms worsen',
  ],
  disclaimer: DISCLAIMER,
}

// ── Symptom Matcher ───────────────────────────────────────────────
function matchSymptoms(symptoms) {
  const text = symptoms.toLowerCase()

  // Score each rule
  let best = null
  let bestScore = 0

  for (const rule of SYMPTOM_RULES) {
    const score = rule.keywords.reduce((acc, kw) => acc + (text.includes(kw) ? 1 : 0), 0)
    if (score > bestScore) {
      bestScore = score
      best = rule
    }
  }

  if (!best || bestScore === 0) return null

  return {
    possibleCondition:      best.condition,
    doctorType:             best.doctor,
    urgencyRecommendation:  best.urgency,
    precautions:            best.precautions,
  }
}

// ── Generate volunteer-facing patient summary ─────────────────────
function generatePatientSummary(name, age, city, symptoms, urgency, aiResult) {
  const urgencyText = urgency === 'high'
    ? 'URGENT – requires same-day attention'
    : urgency === 'medium'
      ? 'Moderate – needs care within 48 hours'
      : 'Routine – non-urgent follow-up needed'

  return (
    `Patient ${name} (${age} yrs, ${city}) requires ${urgencyText}. ` +
    `Reported symptoms: "${symptoms.slice(0, 120)}${symptoms.length > 120 ? '...' : ''}". ` +
    `AI assessment: ${aiResult.possibleCondition}. ` +
    `Suggest connecting with a ${aiResult.doctorType}.`
  )
}

// ── OpenAI Integration (when key is available) ────────────────────
async function callOpenAI(symptoms, name, age, city) {
  if (!process.env.OPENAI_API_KEY) return null

  try {
    const OpenAI = require('openai')
    const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    const prompt = `
You are a helpful healthcare assistant for an NGO serving underserved communities.
A patient named ${name || 'Anonymous'}, aged ${age || 'unknown'}, from ${city || 'unknown location'} reports:
"${symptoms}"

Respond ONLY with a valid JSON object (no markdown, no extra text):
{
  "possibleCondition": "brief non-diagnostic description",
  "doctorType": "type of specialist to consult",
  "urgencyRecommendation": "LOW | MEDIUM | HIGH with brief explanation",
  "precautions": ["precaution 1", "precaution 2", "precaution 3", "precaution 4"],
  "patientSummary": "one paragraph volunteer-facing summary"
}

Important rules:
- Never give a definitive medical diagnosis
- Always recommend professional consultation
- Keep responses compassionate and clear
- Precautions must be practical and actionable
`

    const completion = await client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.4,
      max_tokens: 500,
    })

    const raw = completion.choices[0].message.content.trim()
    return JSON.parse(raw)
  } catch (err) {
    console.warn('OpenAI call failed:', err.message, '— falling back to mock AI')
    return null
  }
}

// ── Main exported function ────────────────────────────────────────
async function analyzeSymptoms({ symptoms, name, age, city, urgency }) {
  let aiResult = null

  // Try OpenAI first
  if (process.env.OPENAI_API_KEY) {
    aiResult = await callOpenAI(symptoms, name, age, city)
  }

  // Fall back to mock engine
  if (!aiResult) {
    const matched = matchSymptoms(symptoms)
    aiResult = matched || DEFAULT_RESPONSE
  }

  // Always generate a volunteer summary
  const patientSummary = aiResult.patientSummary || generatePatientSummary(
    name, age, city, symptoms, urgency || 'medium', aiResult
  )

  return {
    possibleCondition:      aiResult.possibleCondition,
    doctorType:             aiResult.doctorType,
    urgencyRecommendation:  aiResult.urgencyRecommendation,
    precautions:            Array.isArray(aiResult.precautions) ? aiResult.precautions : [aiResult.precautions],
    patientSummary,
    disclaimer:             DISCLAIMER,
  }
}

module.exports = { analyzeSymptoms }
