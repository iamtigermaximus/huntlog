import { deepseek, DEEPSEEK_MODEL } from "./client";

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

Analyze and return ONLY a JSON object with this exact structure (no markdown, no other text):

{
  "matchScore": 75,
  "missingSkills": ["Skill 1", "Skill 2"],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "strengths": ["Strength 1", "Strength 2"]
}

Important:
- matchScore should be a number between 0-100
- missingSkills: skills from job description not found in resume
- recommendations: specific advice to improve the resume for this job
- strengths: relevant skills/experience from resume that match the job

Only return the JSON. No explanations.`;

  try {
    console.log("Calling DeepSeek for resume analysis...");
    console.log("Using model:", DEEPSEEK_MODEL);

    const completion = await deepseek.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an expert resume analyzer. Return ONLY valid JSON. No markdown, no other text.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      model: DEEPSEEK_MODEL,
      temperature: 0.3,
      max_tokens: 2000,
    });

    const response = completion.choices[0]?.message?.content || "";
    console.log("Raw DeepSeek response:", response);

    // Clean the response - remove markdown code blocks
    let cleanResponse = response;

    // Remove ```json ... ``` blocks
    cleanResponse = cleanResponse.replace(/```json\s*/g, "");
    cleanResponse = cleanResponse.replace(/```\s*/g, "");

    // Remove any leading/trailing whitespace
    cleanResponse = cleanResponse.trim();

    // Try to extract JSON if there's extra text
    const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanResponse = jsonMatch[0];
    }

    console.log("Cleaned response:", cleanResponse);

    // Parse JSON
    let result;
    try {
      result = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      console.log("Failed to parse:", cleanResponse);

      // Return default values on parse failure
      return {
        matchScore: 50,
        missingSkills: ["Unable to analyze properly"],
        recommendations: [
          "Please ensure your resume and job description are clear and try again",
        ],
        strengths: ["Resume submitted for analysis"],
      };
    }

    // Ensure all fields exist with proper types
    return {
      matchScore:
        typeof result.matchScore === "number" ? result.matchScore : 50,
      missingSkills: Array.isArray(result.missingSkills)
        ? result.missingSkills
        : [],
      recommendations: Array.isArray(result.recommendations)
        ? result.recommendations
        : [],
      strengths: Array.isArray(result.strengths) ? result.strengths : [],
    };
  } catch (error) {
    console.error("Resume analysis error:", error);
    return {
      matchScore: 50,
      missingSkills: ["Analysis failed"],
      recommendations: [
        "Please try again. If the problem persists, check your API key.",
      ],
      strengths: ["Resume submitted"],
    };
  }
}
