import { deepseek, DEEPSEEK_MODEL } from "./client";

export interface ATSExtractedKeywords {
  hardSkills: string[];
  softSkills: string[];
  tools: string[];
  qualifications: string[];
  buzzwords: string[];
}

export interface ATSAnalysis {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  keywordDensity: { keyword: string; found: boolean; importance: "high" | "medium" | "low" }[];
  summary: string;
}

export async function extractKeywords(jobDescription: string): Promise<ATSExtractedKeywords> {
  const prompt = `Extract ALL keywords from this job description that an ATS system would look for.
Group them into categories. Be thorough — include every skill, tool, qualification, and industry term.

JOB DESCRIPTION:
${jobDescription.substring(0, 3000)}

Return ONLY a valid JSON object:
{
  "hardSkills": ["React", "TypeScript", "REST APIs", ...],
  "softSkills": ["communication", "leadership", ...],
  "tools": ["Git", "Docker", "AWS", ...],
  "qualifications": ["Bachelor's degree", "5+ years experience", ...],
  "buzzwords": ["agile", "fast-paced", "cross-functional", ...]
}`;

  try {
    const completion = await deepseek.chat.completions.create({
      messages: [
        { role: "system", content: "You are an expert ATS keyword extractor. Return ONLY valid JSON." },
        { role: "user", content: prompt },
      ],
      model: DEEPSEEK_MODEL,
      temperature: 0.2,
      max_tokens: 2000,
    });

    const response = completion.choices[0]?.message?.content || "{}";
    let clean = response.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const match = clean.match(/\{[\s\S]*\}/);
    if (match) clean = match[0];
    return JSON.parse(clean);
  } catch (error) {
    console.error("ATS keyword extraction error:", error);
    throw new Error("Failed to extract keywords");
  }
}

export async function analyzeATS(
  resumeContent: string,
  jobDescription: string,
  jobTitle: string,
): Promise<ATSAnalysis> {
  // First extract keywords from the job
  const keywords = await extractKeywords(jobDescription);
  const allKeywords = [
    ...keywords.hardSkills,
    ...keywords.softSkills,
    ...keywords.tools,
    ...keywords.qualifications,
    ...keywords.buzzwords,
  ];

  // Then analyze resume against keywords
  const resumeLower = resumeContent.toLowerCase();

  const keywordDensity = allKeywords.map((kw) => {
    const found = resumeLower.includes(kw.toLowerCase());
    let importance: "high" | "medium" | "low" = "medium";
    // Hard skills and tools are high importance for ATS
    if (keywords.hardSkills.includes(kw) || keywords.tools.includes(kw)) {
      importance = "high";
    } else if (keywords.buzzwords.includes(kw)) {
      importance = "low";
    }
    return { keyword: kw, found, importance };
  });

  const matchedKeywords = keywordDensity.filter((k) => k.found).map((k) => k.keyword);
  const missingKeywords = keywordDensity.filter((k) => !k.found).map((k) => k.keyword);
  const highPriorityMissing = keywordDensity.filter((k) => !k.found && k.importance === "high");
  const score = allKeywords.length > 0
    ? Math.round((matchedKeywords.length / allKeywords.length) * 100)
    : 0;

  const summary = score >= 80
    ? `Strong ATS match (${score}%). Your resume aligns well with this ${jobTitle} role.`
    : score >= 60
      ? `Moderate ATS match (${score}%). Add these missing high-priority keywords: ${highPriorityMissing.slice(0, 5).join(", ")}.`
      : `Low ATS match (${score}%). Your resume needs significant keyword optimization. Key missing terms: ${highPriorityMissing.slice(0, 8).join(", ")}.`;

  return { score, matchedKeywords, missingKeywords, keywordDensity, summary };
}
