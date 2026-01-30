# Job Application Tracker
A full-stack web application that streamlines the internship application process with AI-powered automation. Built to manage Summer 2026 internship applications with intelligent features for auto-filling job details and generating personalized cover letters.

# Features
- AI-Powered Auto-Fill: Extract job details (company, position, requirements) from any job posting URL
- Smart Cover Letter Generation: AI generates personalized cover letters tailored to each position
- Application Status Tracking: Visual pipeline (Applied → Interview → Offer/Rejected)
- Advanced Filtering: Filter applications by status and term with real-time statistics
- Data Persistence: Local storage ensures your data is saved across sessions
- Responsive Design: Beautiful UI that works on desktop, tablet, and mobile
- Real-time Updates: Instant status changes and smooth animations

# Tech Stack
Frontend
- React 18 - UI library with hooks (useState, useEffect)
- Vite - Lightning-fast build tool
- Tailwind CSS - Utility-first CSS framework
- Framer Motion - Animation library for smooth transitions
- React Icons - Icon library

Backend
- Node.js
- Express.js 
- Google Gemini AI

Deployment
- Vercel
- Render
- Github

# Live Demo
Frontend: https://job-tracker-wheat-two.vercel.app 
Backend API: https://personal-job-application-tracker.onrender.com

# Installation 
1. Clone the repository
   
git clone https://github.com/YOUR-USERNAME/job-tracker.git
cd job-tracker

2. Set up the backend
cd server
npm install

# Create .env file
cat > .env << EOF
PORT=8080
GEMINI_API_KEY=your_api_key_here
EOF

3. Set up the frontend
cd ../client
npm install

# Create .env file
cat > .env << EOF
VITE_API_URL=http://localhost:8080
EOF

4. Run the application
   Terminal 1 - Backend
   cd server
   npm run dev

  Terminal 2 - Frontend
  cd client
  npm run dev

5. Open the browser
- Frontend: http://localhost:5173
- Backend: http://localhost:8080/api/health


# How to Deploy
1. Push code to GitHub
2. Go to [Render](https://render.com) and create a new Web Service
3. Connect your GitHub repository
4. Configure:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add environment variables:
   - `GEMINI_API_KEY`: Your Google Gemini API key
   - `PORT`: `8080`
6. Deploy!

1. Go to [Vercel](https://vercel.com) and import your GitHub repository
2. Configure:
   - **Framework**: Vite
   - **Root Directory**: `client`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
3. Add environment variable:
   - `VITE_API_URL`: Your Render backend URL
4. Deploy!
