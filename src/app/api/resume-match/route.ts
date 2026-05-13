// import { NextRequest, NextResponse } from "next/server";
// // import { analyzeResumeAgainstJob } from "@/lib/groq";
// import { analyzeResumeAgainstJob } from "@/lib/ai";

// export async function POST(request: NextRequest) {
//   try {
//     const body = await request.json();
//     const { jobDescription, resumeContent } = body;

//     if (!jobDescription || !resumeContent) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 },
//       );
//     }

//     const analysis = await analyzeResumeAgainstJob(
//       jobDescription,
//       resumeContent,
//     );
//     return NextResponse.json(analysis);
//   } catch (error) {
//     console.error("Resume match error:", error);
//     return NextResponse.json(
//       { error: "Failed to analyze resume" },
//       { status: 500 },
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Initialize DeepSeek client
const deepseek = new OpenAI({
  apiKey: process.env.DEEPSEEK_API_KEY,
  baseURL: process.env.DEEPSEEK_BASE_URL || "https://api.deepseek.com",
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobDescription, resumeContent } = body;

    console.log("=== Resume Match Analysis ===");
    console.log("Job Description length:", jobDescription?.length || 0);
    console.log("Resume Content length:", resumeContent?.length || 0);

    if (!jobDescription || !resumeContent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const prompt = `You are an expert resume reviewer. Analyze this resume against the job description.

JOB DESCRIPTION:
${jobDescription.substring(0, 3000)}

RESUME:
${resumeContent.substring(0, 3000)}

Return ONLY a valid JSON object with this exact structure, no other text:

{
  "matchScore": 75,
  "missingSkills": ["Skill 1", "Skill 2"],
  "recommendations": ["Recommendation 1", "Recommendation 2"],
  "strengths": ["Strength 1", "Strength 2"]
}

Rules:
- matchScore: number between 0-100 based on how well resume matches the job
- missingSkills: key skills from job description not found in resume
- recommendations: specific advice to improve resume for this job
- strengths: relevant skills/experience from resume that match the job

Return ONLY the JSON. No markdown, no explanations.`;

    console.log("Calling DeepSeek API...");

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
      model: "deepseek-chat",
      temperature: 0.3,
      max_tokens: 2000,
    });

    const response = completion.choices[0]?.message?.content || "{}";
    console.log("Raw response:", response);

    // Clean the response - remove markdown code blocks
    let cleanResponse = response;
    cleanResponse = cleanResponse.replace(/```json\s*/g, "");
    cleanResponse = cleanResponse.replace(/```\s*/g, "");
    cleanResponse = cleanResponse.trim();

    // Try to extract JSON if there's extra text
    const jsonMatch = cleanResponse.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      cleanResponse = jsonMatch[0];
    }

    console.log("Cleaned response:", cleanResponse);

    let result;
    try {
      result = JSON.parse(cleanResponse);
    } catch (parseError) {
      console.error("JSON parse error:", parseError);
      // Return default values on parse failure
      return NextResponse.json({
        matchScore: 65,
        missingSkills: [
          "Please ensure your resume and job description are clear",
        ],
        recommendations: [
          "Try re-pasting your resume and job description with more detail",
        ],
        strengths: ["Resume submitted for analysis"],
      });
    }

    // Ensure all fields exist
    const analysisResult = {
      matchScore:
        typeof result.matchScore === "number" ? result.matchScore : 65,
      missingSkills: Array.isArray(result.missingSkills)
        ? result.missingSkills.slice(0, 10)
        : [],
      recommendations: Array.isArray(result.recommendations)
        ? result.recommendations.slice(0, 5)
        : [],
      strengths: Array.isArray(result.strengths)
        ? result.strengths.slice(0, 5)
        : [],
    };

    console.log("Sending result:", analysisResult);

    return NextResponse.json(analysisResult);
  } catch (error) {
    console.error("Resume match API error:", error);
    // Return default values on error
    return NextResponse.json({
      matchScore: 50,
      missingSkills: ["API connection issue"],
      recommendations: ["Please check your DeepSeek API key and try again"],
      strengths: ["Resume received for analysis"],
    });
  }
}
