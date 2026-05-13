import OpenAI from "openai";

// Initialize DeepSeek client (OpenAI-compatible)
const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
});

export interface ResumeAnalysis {
  matchScore: number;
  missingSkills: string[];
  recommendations: string[];
  strengths: string[];
}

export async function analyzeResumeAgainstJob(
  jobDescription: string,
  resumeContent: string,
): Promise<ResumeAnalysis> {
  const prompt = `You are an expert resume reviewer. Analyze this resume against the job description.

JOB DESCRIPTION:
${jobDescription.substring(0, 3500)}

RESUME:
${resumeContent.substring(0, 3500)}

Return a JSON object with EXACTLY this structure (no other text):
{
  "matchScore": 85,
  "missingSkills": ["Python", "AWS", "GraphQL"],
  "recommendations": ["Add Python projects", "Get AWS certification"],
  "strengths": ["React expertise", "Leadership", "Communication"]
}

Only return the JSON.`;

  try {
    const completion = await deepseek.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "deepseek-v4-pro", // DeepSeek's main model
      temperature: 0.3,
      max_tokens: 1000,
    });

    const response = completion.choices[0]?.message?.content || "{}";
    const cleanResponse = response
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "");
    return JSON.parse(cleanResponse);
  } catch (error) {
    console.error("Resume analysis error:", error);
    return {
      matchScore: 0,
      missingSkills: [],
      recommendations: [],
      strengths: [],
    };
  }
}

export async function generateCoverLetter(
  jobDescription: string,
  resumeContent: string,
  company: string,
  jobTitle: string,
  strengths: string[],
): Promise<string> {
  const strengthsText =
    strengths.length > 0 ? `\n\nMy key strengths: ${strengths.join(", ")}` : "";

  const prompt = `Write a professional cover letter.

COMPANY: ${company}
JOB TITLE: ${jobTitle}

JOB DESCRIPTION:
${jobDescription.substring(0, 2500)}

MY RESUME:
${resumeContent.substring(0, 2500)}${strengthsText}

Requirements:
- Professional, confident tone
- 300-400 words
- Highlight 2-3 specific achievements
- Show enthusiasm for ${company}
- Close with call to action

Write ONLY the cover letter.`;

  try {
    const completion = await deepseek.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "deepseek-v4-pro",
      temperature: 0.7,
      max_tokens: 1200,
    });

    return (
      completion.choices[0]?.message?.content ||
      "Failed to generate cover letter"
    );
  } catch (error) {
    console.error("Cover letter error:", error);
    return "Error generating cover letter. Please check your API key.";
  }
}
