<div align="center">

# Job Application Tracker

**AI-powered job tracking — from application to offer.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://job-tracker-wheat-two.vercel.app)
[![Backend API](https://img.shields.io/badge/Backend_API-46E3B7?style=for-the-badge&logo=render&logoColor=white)](https://personal-job-application-tracker.onrender.com)
[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/niyoxx/job-tracker)

</div>

---

## Overview

Job Application Tracker is a full-stack web app built to take the chaos out of internship hunting. Paste a job posting URL and let AI extract the details, generate a personalized cover letter, and track your progress through every stage of the hiring pipeline — all in one place.

Built to manage my own **Summer 2026 internship search** across 200+ applications.

---

## Features

- **AI Auto-Fill** — Paste any job posting URL and automatically extract the company, role, and requirements using Google Gemini AI
- **Cover Letter Generation** — AI generates a tailored cover letter for each position based on the extracted job details
- **Application Pipeline** — Visual status tracking through Applied → Interview → Offer / Rejected
- **Filtering & Stats** — Filter by status or term with real-time application statistics
- **Persistent Storage** — Local storage keeps your data saved across sessions
- **Smooth Animations** — Framer Motion powered transitions throughout the UI
- **Fully Responsive** — Works great on desktop, tablet, and mobile

---

## Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![Google Gemini](https://img.shields.io/badge/Google_Gemini-4285F4?style=for-the-badge&logo=google&logoColor=white)

### Deployment
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)
![Render](https://img.shields.io/badge/Render-46E3B7?style=for-the-badge&logo=render&logoColor=white)

---

## Getting Started

### Prerequisites
- Node.js v18+
- Google Gemini API key — get one free at [Google AI Studio](https://aistudio.google.com)

### 1. Clone the repository

```bash
git clone https://github.com/niyoxx/job-tracker.git
cd job-tracker
```

### 2. Set up the backend

```bash
cd server
npm install
```

Create a `.env` file in the `server` directory:

```env
PORT=8080
GEMINI_API_KEY=your_api_key_here
```

### 3. Set up the frontend

```bash
cd ../client
npm install
```

Create a `.env` file in the `client` directory:

```env
VITE_API_URL=http://localhost:8080
```

### 4. Run the app

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.
Health check: [http://localhost:8080/api/health](http://localhost:8080/api/health)

---

## Deployment

### Backend → Render

1. Push code to GitHub
2. Go to [Render](https://render.com) → New Web Service → Connect your repo
3. Configure:

| Setting | Value |
|---|---|
| Root Directory | `server` |
| Build Command | `npm install` |
| Start Command | `npm start` |

4. Add environment variables: `GEMINI_API_KEY` and `PORT=8080`
5. Deploy

### Frontend → Vercel

1. Go to [Vercel](https://vercel.com) → Import your GitHub repo
2. Configure:

| Setting | Value |
|---|---|
| Framework | Vite |
| Root Directory | `client` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

3. Add environment variable: `VITE_API_URL` → your Render backend URL
4. Deploy

---

## Project Structure

```
job-tracker/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Page views
│   │   └── App.jsx
│   ├── .env
│   └── vite.config.js
│
├── server/                 # Express backend
│   ├── routes/             # API routes
│   ├── index.js
│   └── .env
│
└── README.md
```

---

## Author

**Niyo** — [@niyoxx](https://github.com/niyoxx)

---

<div align="center">
Built with React, Express & Google Gemini AI · Deployed on Vercel & Render
</div>
