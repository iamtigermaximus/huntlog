import { deepseek, DEEPSEEK_MODEL } from "./client";

export interface JobMatch {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  qualifications: string[];
  url?: string;
  salaryMin?: number;
  salaryMax?: number;
  jobType?: string;
  seniorityLevel?: string;
  source?: string;
  postedDate?: string;
  matchScore: number;
  matchReason: string;
  topSkills: string[];
}

export async function scrapeJobs(
  resumeContent: string,
  searchPreferences: {
    role?: string;
    location?: string;
    jobType?: string;
    seniority?: string;
  },
): Promise<JobMatch[]> {
  const prefs = [
    searchPreferences.role && `Role/Title: ${searchPreferences.role}`,
    searchPreferences.location && `Location: ${searchPreferences.location}`,
    searchPreferences.jobType && `Job Type: ${searchPreferences.jobType}`,
    searchPreferences.seniority && `Seniority: ${searchPreferences.seniority}`,
  ]
    .filter(Boolean)
    .join(", ");

  const prompt = `You are an expert job search agent. Based on this resume, find realistic job matches.

RESUME:
${resumeContent.substring(0, 3000)}

SEARCH PREFERENCES: ${prefs || "Open to all relevant roles"}

Return ONLY a valid JSON array of 5-8 job matches. Each match should have:
{
  "id": "unique-string",
  "title": "Job Title",
  "company": "Real Company Name",
  "location": "City, State or Remote",
  "description": "Detailed job description (4-6 sentences). Include what the role entails, the team, projects they'd work on, and what success looks like.",
  "responsibilities": ["Lead development of...", "Collaborate with...", "Design and implement..."],
  "requirements": ["5+ years of experience with React", "Strong TypeScript skills", "Experience with cloud platforms"],
  "qualifications": ["Bachelor's in Computer Science or equivalent", "AWS certification preferred"],
  "salaryMin": 80000,
  "salaryMax": 150000,
  "jobType": "Full-time",
  "seniorityLevel": "Mid-level",
  "source": "LinkedIn",
  "postedDate": "2 days ago",
  "matchScore": 85,
  "matchReason": "Strong alignment in React and TypeScript skills. Your 5 years of frontend experience matches their seniority requirement.",
  "topSkills": ["React", "TypeScript", "Node.js"]
}

Rules:
- MatchScore: 0-100 based on actual skill overlap with the resume
- Companies should be REAL companies known to hire for these roles
- Descriptions, responsibilities, and requirements should sound like real job postings
- Return ONLY the JSON array. No markdown, no explanations.`;

  try {
    const completion = await deepseek.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert job search agent. Return ONLY valid JSON arrays. No markdown.",
        },
        { role: "user", content: prompt },
      ],
      model: DEEPSEEK_MODEL,
      temperature: 0.7,
      max_tokens: 4000,
    });

    const response = completion.choices[0]?.message?.content || "[]";
    let clean = response.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const match = clean.match(/\[[\s\S]*\]/);
    if (match) clean = match[0];

    const jobs: JobMatch[] = JSON.parse(clean);
    return jobs.map((j) => ({
      ...j,
      matchScore: Math.min(100, Math.max(0, j.matchScore)),
      responsibilities: j.responsibilities || [],
      requirements: j.requirements || [],
      qualifications: j.qualifications || [],
    }));
  } catch (error) {
    console.error("Job scrape error:", error);
    return [];
  }
}
