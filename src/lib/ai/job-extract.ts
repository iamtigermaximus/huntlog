import { deepseek, DEEPSEEK_MODEL } from "./client";

export interface ExtractedJob {
  jobTitle: string;
  company: string;
  location: string;
  jobDescription: string;
  jobType?: string;
  seniorityLevel?: string;
  salaryMin?: number;
  salaryMax?: number;
  source?: string;
}

export async function extractJobFromUrl(
  url: string,
  jobText?: string,
): Promise<ExtractedJob> {
  const contentSource = jobText
    ? `JOB POSTING TEXT:\n${jobText.substring(0, 4000)}`
    : `JOB POSTING URL: ${url}\n\nPlease analyze this URL and extract what you know about this job posting.`;

  const prompt = `${contentSource}

Extract and return ONLY a valid JSON object with these fields:
{
  "jobTitle": "Software Engineer",
  "company": "Tech Corp",
  "location": "San Francisco, CA (or Remote)",
  "jobDescription": "Full structured job description with requirements, responsibilities, and qualifications...",
  "jobType": "Full-time",
  "seniorityLevel": "Mid-level",
  "salaryMin": 100000,
  "salaryMax": 150000,
  "source": "LinkedIn"
}

Rules:
- Extract ALL details possible from the posting
- jobDescription should be comprehensive and well-structured
- If a field is not found, use null
- Return ONLY the JSON object. No markdown, no explanations.`;

  try {
    const completion = await deepseek.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert at parsing job postings. Return ONLY valid JSON.",
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
    console.error("Job extract error:", error);
    throw new Error("Failed to extract job details");
  }
}
