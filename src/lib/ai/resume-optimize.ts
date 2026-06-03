import { deepseek, DEEPSEEK_MODEL } from "./client";
import { extractKeywords } from "./ats-analyze";

export interface OptimizedResume {
  optimized: string;
  changes: { type: "added" | "removed" | "modified"; text: string; reason: string }[];
  summary: string;
  atsScoreBefore: number;
  atsScoreAfter: number;
}

export async function optimizeResume(
  resumeContent: string,
  jobDescription: string,
  jobTitle: string,
): Promise<OptimizedResume> {
  // Step 1: Extract ATS keywords from the job description
  let keywords: string[] = [];
  let missingKeywords: string[] = [];
  try {
    const extracted = await extractKeywords(jobDescription);
    const allKeywords = [
      ...extracted.hardSkills,
      ...extracted.softSkills,
      ...extracted.tools,
      ...extracted.qualifications,
      ...extracted.buzzwords,
    ];
    keywords = allKeywords;
    const resumeLower = resumeContent.toLowerCase();
    missingKeywords = allKeywords.filter(
      (kw) => !resumeLower.includes(kw.toLowerCase()),
    );
  } catch {
    // If keyword extraction fails, continue with generic optimization
  }

  // Step 2: Optimize resume with keyword guidance
  const keywordGuidance =
    missingKeywords.length > 0
      ? `\n\nMISSING KEYWORDS TO INCORPORATE (only where truthful):\n${missingKeywords.join(", ")}\n\nWeave these keywords naturally into the resume where they genuinely apply to your experience. Do NOT fabricate experience.`
      : "";

  const prompt = `You are an expert ATS resume optimizer. Tailor this resume for the following job.

JOB TITLE: ${jobTitle}
JOB DESCRIPTION:
${jobDescription.substring(0, 2500)}

ORIGINAL RESUME:
${resumeContent.substring(0, 2500)}${keywordGuidance}

Return ONLY a valid JSON object:
{
  "optimized": "The fully optimized resume text with keywords naturally integrated...",
  "changes": [
    {"type": "added", "text": "Added React performance optimization", "reason": "Job requires performance skills"},
    {"type": "removed", "text": "Removed irrelevant retail experience", "reason": "Not relevant to tech role"},
    {"type": "modified", "text": "Rewrote summary to emphasize leadership", "reason": "Role requires team leadership"}
  ],
  "summary": "Brief summary of what was changed and why. Mention specific ATS keywords that were incorporated."
}

Rules:
- Keep truthful to the original experience — NEVER fabricate skills or roles
- Emphasize skills and keywords from the job description
- Use bullet points for achievements with measurable results
- Ensure the resume would pass ATS screening for this specific job
- Return ONLY the JSON. No markdown.`;

  try {
    const completion = await deepseek.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert resume optimizer specializing in ATS compliance. Return ONLY valid JSON.",
        },
        { role: "user", content: prompt },
      ],
      model: DEEPSEEK_MODEL,
      temperature: 0.4,
      max_tokens: 3000,
    });

    const response = completion.choices[0]?.message?.content || "{}";
    let clean = response.replace(/```json\s*/g, "").replace(/```\s*/g, "").trim();
    const match = clean.match(/\{[\s\S]*\}/);
    if (match) clean = match[0];

    const result = JSON.parse(clean);

    // Calculate ATS scores
    const resumeLower = resumeContent.toLowerCase();
    const beforeMatchCount = keywords.filter((kw) =>
      resumeLower.includes(kw.toLowerCase()),
    ).length;
    const afterLower = (result.optimized || "").toLowerCase();
    const afterMatchCount = keywords.filter((kw) =>
      afterLower.includes(kw.toLowerCase()),
    ).length;
    const totalKeywords = keywords.length || 1;

    return {
      ...result,
      atsScoreBefore: Math.round((beforeMatchCount / totalKeywords) * 100),
      atsScoreAfter: Math.round((afterMatchCount / totalKeywords) * 100),
    };
  } catch (error) {
    console.error("Resume optimize error:", error);
    throw new Error("Failed to optimize resume");
  }
}
