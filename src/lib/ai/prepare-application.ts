import { deepseek, DEEPSEEK_MODEL } from "./client";

export interface ApplicationPackage {
  optimizedResume: string;
  coverLetter: string;
  screeningAnswers: { question: string; answer: string }[];
  matchBreakdown: {
    overallScore: number;
    skillsMatch: string;
    experienceMatch: string;
    educationMatch: string;
    cultureFit: string;
  };
  keyTalkingPoints: string[];
}

export async function prepareApplication(
  jobTitle: string,
  company: string,
  jobDescription: string,
  resumeContent: string,
): Promise<ApplicationPackage> {
  const prompt = `You are an expert job application agent. Prepare a complete application package for this job.

JOB TITLE: ${jobTitle}
COMPANY: ${company}

JOB DESCRIPTION:
${jobDescription.substring(0, 2500)}

RESUME:
${resumeContent.substring(0, 2500)}

Return ONLY a valid JSON object with this structure:
{
  "optimizedResume": "A tailored version of the resume for this specific job. Highlight relevant skills. Keep it concise but impactful.",
  "coverLetter": "A compelling cover letter (300-400 words) tailored to this specific role and company.",
  "screeningAnswers": [
    {"question": "Why are you interested in this role?", "answer": "Specific answer..."},
    {"question": "What relevant experience do you have?", "answer": "Specific answer..."},
    {"question": "What are your salary expectations?", "answer": "Based on market rate..."},
    {"question": "Why do you want to work at ${company}?", "answer": "Specific answer..."}
  ],
  "matchBreakdown": {
    "overallScore": 85,
    "skillsMatch": "Detailed analysis of skills alignment...",
    "experienceMatch": "Detailed analysis of experience match...",
    "educationMatch": "Education requirements assessment...",
    "cultureFit": "Culture and values alignment..."
  },
  "keyTalkingPoints": ["Point 1", "Point 2", "Point 3"]
}

Rules:
- optimizedResume should be a ready-to-use resume text
- coverLetter should be complete and ready to submit
- screeningAnswers should anticipate real screening questions
- matchBreakdown.overallScore should be 0-100
- Be honest about gaps — don't fabricate experience
- Return ONLY the JSON object. No markdown.`;

  try {
    const completion = await deepseek.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert job application preparation agent. Return ONLY valid JSON.",
        },
        { role: "user", content: prompt },
      ],
      model: DEEPSEEK_MODEL,
      temperature: 0.5,
      max_tokens: 4000,
    });

    const response = completion.choices[0]?.message?.content || "{}";
    let clean = response.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const match = clean.match(/\{[\s\S]*\}/);
    if (match) clean = match[0];

    const pkg: ApplicationPackage = JSON.parse(clean);
    return {
      ...pkg,
      matchBreakdown: {
        ...pkg.matchBreakdown,
        overallScore: Math.min(100, Math.max(0, pkg.matchBreakdown.overallScore || 70)),
      },
    };
  } catch (error) {
    console.error("Prepare application error:", error);
    throw new Error("Failed to prepare application package");
  }
}
