import { GoogleGenAI, Type, Content } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const RESUME_RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    fullName: { type: Type.STRING },
    email: { type: Type.STRING },
    phone: { type: Type.STRING },
    summary: { type: Type.STRING },
    skills: { type: Type.STRING },
    experience: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          company: { type: Type.STRING },
          date: { type: Type.STRING },
          details: { type: Type.STRING },
        }
      }
    },
    education: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          title: { type: Type.STRING },
          company: { type: Type.STRING },
          date: { type: Type.STRING },
          details: { type: Type.STRING },
        }
      }
    },
    projects: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          name: { type: Type.STRING },
          technologies: { type: Type.STRING },
          link: { type: Type.STRING },
          description: { type: Type.STRING },
        }
      }
    }
  }
};

export const analyzeHeadline = async (headline: string): Promise<{ score: number; suggestion: string; feedback: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze this LinkedIn headline: "${headline}". 
      Provide a "Reach Score" (0-100), a short 1-sentence feedback, and one significantly improved version that is SEO-friendly and impactful.
      Return strictly JSON: { "score": number, "suggestion": "string", "feedback": "string" }`,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error(error);
    return { score: 50, suggestion: "Error analyzing.", feedback: "Check your connection." };
  }
};

export const generateLinkedInBio = async (experience: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Transform the following professional experience into a high-performance LinkedIn 'About' section. 
      Use a first-person narrative, include a clear value proposition, and ensure high keyword density for search.
      Experience: ${experience}`,
    });
    return response.text || "Failed to generate bio.";
  } catch (error) {
    return "Error synthesizing your story.";
  }
};

export const scoreATSResume = async (resumeText: string): Promise<{ score: number; findings: string[]; keywordsMissing: string[] }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Act as a recruiter and ATS scanner. Analyze the following resume text for "Rizz" and professional effectiveness.
      Resume: ${resumeText}
      Return strictly JSON: { "score": number, "findings": ["string"], "keywordsMissing": ["string"] }`,
      config: { 
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            findings: { type: Type.ARRAY, items: { type: Type.STRING } },
            keywordsMissing: { type: Type.ARRAY, items: { type: Type.STRING } }
          }
        }
      }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error(error);
    return { score: 0, findings: ["Error analysis"], keywordsMissing: [] };
  }
};

export const scoreJobRelevance = async (resume: string, jobDescription: string): Promise<{ score: number; reasoning: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Compare the following job description with the provided resume.  
      Evaluate how well the candidate’s resume matches the job requirements.  
      Give a relevance score from 1 to 5, where:  
      1 = Very poor match  
      2 = Weak match  
      3 = Moderate match  
      4 = Strong match  
      5 = Excellent match  
      
      Return strictly JSON: { "score": number, "reasoning": "string" }
      
      Job Description: ${jobDescription}
      Resume: ${resume}`,
      config: { responseMimeType: "application/json" }
    });
    return JSON.parse(response.text || "{}");
  } catch (error) {
    console.error(error);
    return { score: 1, reasoning: "Error during synthesis." };
  }
};

export const iterateBulletPoint = async (bullet: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Transform this boring resume bullet point into a high-impact, achievement-oriented one using the X-Y-Z formula (Accomplished X as measured by Y, by doing Z): "${bullet}". 
      Keep it to one powerful sentence.`,
    });
    return response.text || "Could not iterate. Try again.";
  } catch (error) {
    return "Error refining text.";
  }
};

export const generateCoverLetter = async (
  company: string, 
  role: string, 
  description: string, 
  userSkills: string = "general professional skills"
): Promise<string> => {
  try {
    const prompt = `
      Write a professional and engaging cover letter for the position of ${role} at ${company}.
      
      Job Description:
      ${description}
      
      My Skills/Background:
      ${userSkills}
      
      Keep it concise (under 300 words), professional, and enthusiastic. 
      Do not include placeholders like [Your Name] or [Address], start directly with "Dear Hiring Manager,".
    `;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Could not generate cover letter. Please try again.";
  } catch (error) {
    console.error("Error generating cover letter:", error);
    return "Error generating cover letter. Please check your API key.";
  }
};

export const generateAvatar = async (imageBuffer: string, prompt: string): Promise<string> => {
  try {
    const base64Data = imageBuffer.split(',')[1] || imageBuffer;
    const mimeType = imageBuffer.split(';')[0].split(':')[1] || 'image/png';

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: `Transform this portrait into a professional LinkedIn avatar. Style requirements: ${prompt || "Professional studio lighting, sharp focus, business attire"}.`,
          },
        ],
      },
    });

    for (const part of response.candidates?.[0]?.content?.parts || []) {
      if (part.inlineData) {
        return `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
      }
    }
    throw new Error("No image generated by model.");
  } catch (error) {
    console.error("Error generating avatar:", error);
    throw error;
  }
};

export const generateInterviewGuide = async (company: string, role: string, description: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Create a comprehensive interview preparation guide for the position of ${role} at ${company}.
      
      Job Description:
      ${description}
      
      Include common interview questions, key company facts, and strategic advice.`,
    });
    return response.text || "Could not generate interview guide.";
  } catch (error) {
    console.error("Error generating interview guide:", error);
    return "Error generating interview guide.";
  }
};

export const searchJobs = async (keywords: string, location: string, industry: string): Promise<any[]> => {
  try {
    const prompt = `Find 5 recent job openings for "${keywords}" in "${location}" within the "${industry}" industry. Return a list of jobs including title, company, location, snippet, and a direct link.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const sources = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    return sources.map(chunk => ({
      title: chunk.web?.title || 'Job Opportunity',
      company: 'Found via Search',
      location: location,
      snippet: chunk.web?.title || '',
      link: chunk.web?.uri || '#',
      source: 'Google Search'
    }));
  } catch (error) {
    console.error("Error searching jobs:", error);
    return [];
  }
};

export const parseAndImproveResume = async (fileBase64: string, mimeType: string): Promise<any> => {
  try {
    const base64Data = fileBase64.split(',')[1] || fileBase64;

    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data
            }
          },
          {
            text: `Extract all professional information from this resume. Rewrite the content to be more professional, impactful, and concise using strong action verbs and metrics where possible. Return strictly JSON.`
          }
        ]
      },
      config: {
        responseMimeType: "application/json",
        responseSchema: RESUME_RESPONSE_SCHEMA
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini parseAndImproveResume Error:", error);
    throw error;
  }
};

export const improveResumeFromText = async (extractedText: string): Promise<any> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Parse this extracted resume text. Rewrite and professionalize it, extracting all sections into the required format. 
      
      Resume text:
      ${extractedText}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: RESUME_RESPONSE_SCHEMA
      }
    });

    const text = response.text;
    if (!text) return null;
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini improveResumeFromText Error:", error);
    throw error;
  }
};

export const createChatSession = (history: Content[] = [], tone: string = 'encouraging') => {
  let toneInstruction = "You are Claire, a friendly, encouraging, and highly knowledgeable job search assistant.";
  if (tone === 'direct') toneInstruction = "You are Claire, a sharp, direct, and performance-driven job search agent. Provide concise, actionable advice without fluff.";
  if (tone === 'academic') toneInstruction = "You are Claire, a professional career strategist and academic advisor. Use formal language and provide research-backed networking tactics.";

  return ai.chats.create({
    model: 'gemini-3-flash-preview',
    history: history,
    config: {
      systemInstruction: toneInstruction + " You help users with career advice, resume tips, interview preparation, and staying motivated."
    }
  });
};