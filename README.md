# ExamBridge — AI-Powered Exam Intelligence Platform

> **Your past papers. Your language. Your smartest study plan.**

ExamBridge helps students who prepare using previous-year question papers by uploading 2–5 past papers, using AI to extract and analyze questions, identifying recurring topics across years, calculating historical topic frequency, and generating a personalized 7-day study roadmap — all in English or Kannada.

---

## Problem

Students preparing for board exams (especially Karnataka State Board) rely heavily on previous-year question papers, but they lack tools to systematically analyze which topics recur across years. They study blindly without knowing which topics deserve more attention, and regional-language students are underserved by existing platforms.

## Solution

ExamBridge turns past papers into actionable exam intelligence:

1. **Upload** 2–5 previous-year papers (PDF/JPG/PNG)
2. **AI extracts** questions and identifies topics, subtopics, marks, question type, and difficulty
3. **Cross-year comparison** reveals which topics recur across multiple years
4. **Historical frequency engine** calculates how often each topic has appeared
5. **Priority system** ranks topics as High / Medium / Low based on historical recurrence
6. **Personalized 7-day roadmap** prioritizes high-yield topics
7. **Practice questions** generated per topic with reveal-answer functionality

**Important:** ExamBridge describes results as *historical recurrence* and *historical priority* — it never claims to predict the actual exam.

---

## Features

- AI-powered paper analysis (OCR + LLM question extraction)
- Regional-language support (English + Kannada)
- Historical topic intelligence with frequency heatmap
- High/Medium/Low priority ranking based on recurrence
- Personalized 7-day study roadmap with progress tracking
- Topic-based practice questions with answers
- User authentication and per-user data isolation
- Demo Mode — works fully without any external API keys

---

## Technology Stack

| Layer | Technology |
|-------|------------|
| Frontend | React, Vite, Tailwind CSS, Recharts, Lucide React |
| Backend | Node.js, Express.js |
| Database / Auth | Supabase (PostgreSQL + Auth) |
| AI | LLM API (configurable, with demo fallback) |
| OCR | Configurable OCR service (with demo fallback) |

---

## Architecture

```
Student
   ↓
React Frontend (Vite)
   ↓
Express Backend
   ↓
OCR (text extraction)
   ↓
AI Analysis (LLM)
   ↓
Topic Clustering
   ↓
Frequency Engine
   ↓
Database (Supabase/PostgreSQL)
   ↓
Dashboard + Roadmap + Practice
```

---

## Setup Instructions

### Frontend

```bash
npm install
npm run dev
```

The frontend runs on Vite's dev server (default port 5173).

### Backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on port 3001.

### Environment Variables

Copy `.env.example` to `.env` and fill in your keys:

```bash
cp .env.example .env
```

See `.env.example` for all required variables.

---

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase anon key |
| `PORT` | Backend server port (default 3001) |
| `AI_API_KEY` | LLM API key (optional — demo mode works without it) |
| `AI_API_URL` | LLM API endpoint |
| `AI_MODEL` | LLM model name |
| `OCR_API_KEY` | OCR service API key (optional) |
| `FRONTEND_URL` | Frontend URL for CORS |

---

## Demo Mode

ExamBridge works fully even without external API keys. When AI or OCR is unavailable, the app automatically falls back to **Demo Mode** using prepared sample data:

- **Board:** Karnataka State Board
- **Class:** 10
- **Subject:** Mathematics
- **Papers:** 2022, 2023, 2024
- **Topics:** Trigonometry, Probability, Matrices, Statistics, Algebra, Coordinate Geometry

Demo Mode demonstrates the entire flow: Upload → Analyze → Results → Topic Frequency → Priority → Roadmap → Practice.

A notice is shown when Demo Mode is active: *"Demo analysis loaded using prepared sample data."*

---

## API Routes

| Method | Route | Description |
|--------|-------|-------------|
| `POST` | `/api/upload` | Upload 2–5 PDF/JPG/PNG files |
| `POST` | `/api/analyze` | Trigger AI analysis on uploaded papers |
| `GET` | `/api/analysis/:id` | Retrieve a specific analysis result |
| `GET` | `/api/topics/:id` | Get topics for a specific analysis |
| `GET` | `/api/roadmap/:id` | Get the study roadmap |
| `POST` | `/api/practice` | Generate practice questions for a topic |
| `GET` | `/api/demo` | Get demo data (papers, analysis, roadmap, practice) |

---

## Future Scope

- More state boards (CBSE, ICSE, Tamil Nadu, Maharashtra, etc.)
- More regional languages (Tamil, Telugu, Marathi, Hindi, Bengali)
- More subjects (Science, Social Studies, English)
- Teacher dashboard for class-level analytics
- Community paper repository
- Mobile application (iOS + Android)
- Real-time AI tutor integration
- Performance analytics and predictive scoring

---

## License

Built for hackathon demonstration. © 2025 ExamBridge.
