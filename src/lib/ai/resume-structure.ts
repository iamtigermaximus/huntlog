import { deepseek, DEEPSEEK_MODEL } from "./client";

export interface ResumeExperience {
  title: string;
  company: string;
  dates: string;
  bullets: string[];
}

export interface ResumeEducation {
  degree: string;
  school: string;
  year: string;
}

export interface StructuredResume {
  name: string;
  title: string;
  contact: {
    email?: string;
    phone?: string;
    location?: string;
    linkedin?: string;
  };
  summary: string;
  experience: ResumeExperience[];
  education: ResumeEducation[];
  skills: string[];
}

export async function parseResumeStructure(
  rawText: string,
): Promise<StructuredResume> {
  const prompt = `Parse this resume text into a structured JSON object. Extract every detail you can find.

RESUME TEXT:
${rawText.substring(0, 5000)}

Return ONLY valid JSON:
{
  "name": "Full Name",
  "title": "Current/Most Recent Job Title",
  "contact": {
    "email": "email@example.com or null",
    "phone": "phone number or null",
    "location": "City, State or null",
    "linkedin": "linkedin url or null"
  },
  "summary": "Professional summary paragraph",
  "experience": [
    {
      "title": "Job Title",
      "company": "Company Name",
      "dates": "Jan 2020 - Present",
      "bullets": ["Achievement or responsibility 1", "Achievement or responsibility 2"]
    }
  ],
  "education": [
    {
      "degree": "BS Computer Science",
      "school": "University Name",
      "year": "2020"
    }
  ],
  "skills": ["Skill1", "Skill2", "Skill3"]
}

Rules:
- Include ALL experience entries, ALL education entries, ALL skills
- For experience bullets, extract the actual bullet points from the resume (3-5 per role)
- If a field is not found, use null or empty array
- Return ONLY the JSON object. No markdown, no explanations.`;

  try {
    const completion = await deepseek.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume parser. Extract structured data from resume text. Return ONLY valid JSON.",
        },
        { role: "user", content: prompt },
      ],
      model: DEEPSEEK_MODEL,
      temperature: 0.2,
      max_tokens: 3000,
    });

    const response = completion.choices[0]?.message?.content || "{}";
    let clean = response.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const match = clean.match(/\{[\s\S]*\}/);
    if (match) clean = match[0];

    return JSON.parse(clean);
  } catch (error) {
    console.error("Resume parsing error:", error);
    throw new Error("Failed to parse resume structure");
  }
}
