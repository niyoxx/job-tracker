// Import dependencies
const express = require('express');
const cors = require('cors');
const { GoogleGenAI } = require('@google/genai');
require('dotenv').config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT;

// Initialize Google GenAI
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY
});

// Middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://job-tracker-wheat-two.vercel.app'
    ]
}));
app.use(express.json());

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'Server is running!' });
});

// Extract job details endpoint
app.post('/api/extract-job', async (req, res) => {
    try {
        const { jobUrl } = req.body;
        
        if (!jobUrl) {
            return res.status(400).json({ error: 'Job URL is required' });
        }

        const prompt = `Extract job details from this URL: ${jobUrl}
        
        You need to analyze the job posting and return ONLY a valid JSON object with these exact fields:
        {
            "company": "company name",
            "position": "job title", 
            "notes": "brief summary of key requirements (2-3 sentences max)"
        }
        
        Return ONLY the JSON object, no other text, no markdown, no explanation.`;

        // Call Gemini API using the new SDK
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt
        });

        const text = response.text;
        
        // Clean up response (remove markdown if present)
        let cleanedText = text.trim();
        if (cleanedText.startsWith('```json')) {
            cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        }
        
        // Parse JSON
        const jobDetails = JSON.parse(cleanedText);
        
        // Return to frontend
        res.json(jobDetails);
        
    } catch (error) {
        console.error('Error extracting job details:', error);
        res.status(500).json({ 
            error: 'Failed to extract job details',
            message: error.message 
        });
    }
});

// Generate cover letter endpoint
const cheerio = require('cheerio');

app.post('/api/extract-job', async (req, res) => {
    try {
        const { jobUrl } = req.body;
        
        if (!jobUrl) {
            return res.status(400).json({ error: 'Job URL is required' });
        }

        // Fetch the webpage
        const pageResponse = await fetch(jobUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'
            }
        });

        if (!pageResponse.ok) {
            throw new Error('Failed to fetch job posting');
        }

        const html = await pageResponse.text();
        
        // Parse HTML with cheerio
        const $ = cheerio.load(html);
        
        // Remove unwanted elements
        $('script, style, nav, header, footer').remove();
        
        // Get text content
        const textContent = $('body').text()
            .replace(/\s+/g, ' ')
            .trim()
            .substring(0, 10000);

        const prompt = `Extract job details from this job posting:

${textContent}

Return ONLY a valid JSON object:
{
    "company": "company name",
    "position": "job title", 
    "notes": "2-3 sentence summary of key requirements"
}

ONLY return the JSON, nothing else.`;

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt
        });

        const text = response.text;
        
        let cleanedText = text.trim();
        if (cleanedText.startsWith('```json')) {
            cleanedText = cleanedText.replace(/```json\n?/g, '').replace(/```\n?/g, '');
        }
        
        const jobDetails = JSON.parse(cleanedText);
        
        res.json(jobDetails);
        
    } catch (error) {
        console.error('Error extracting job details:', error);
        res.status(500).json({ 
            error: 'Failed to extract job details. Some sites block scraping.',
            message: error.message 
        });
    }
});

app.post('/api/generate-cover-letter', async (req, res) => {
    try {
        const { company, position, notes, userExperience } = req.body;
        
        const prompt = `Write a professional cover letter for this job application:
        
        Company: ${company}
        Position: ${position}
        Job Requirements: ${notes}
        My Experience: ${userExperience || 'Computer Science student seeking internship'}
        
        Write a concise, professional cover letter (250-300 words).
        Make it personal and enthusiastic but professional.`;
        
        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents: prompt
        });

        const coverLetter = response.text;
        
        res.json({ coverLetter });
        
    } catch (error) {
        console.error('Error generating cover letter:', error);
        res.status(500).json({ 
            error: 'Failed to generate cover letter',
            message: error.message 
        });
    }
});




// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
});