const API_URL = import.meta.env.VITE_API_URL 

export const extractJobDetails = async (jobUrl) => {
    try {
        const response = await fetch(`${API_URL}/api/extract-job`, {
           method: 'POST', 
           headers: {
            'Content-Type': 'application/json',
           },
           body: JSON.stringify({jobUrl})
        })

        if(!response.ok) {
            throw new Error('Failed to extract job details');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("AI extraction failed: ", error);
        throw error; // ← Fixed: removed 'new'
    }
}

export const generateCoverLetter = async (company, position, notes, userExperience = '') => {
  try {
    const response = await fetch(`${API_URL}/api/generate-cover-letter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        company, 
        position, 
        notes, 
        userExperience 
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate cover letter');
    }

    const data = await response.json();
    return data.coverLetter;
    
  } catch (error) {
    console.error('Cover letter generation failed:', error);
    throw error;
  }
};