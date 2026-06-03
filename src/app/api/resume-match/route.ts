import { NextRequest, NextResponse } from "next/server";
import { analyzeResumeAgainstJob } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobDescription, resumeContent } = body;

    if (!jobDescription || !resumeContent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const analysis = await analyzeResumeAgainstJob(jobDescription, resumeContent);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error("Resume match API error:", error);
    return NextResponse.json({
      matchScore: 50,
      missingSkills: ["API connection issue"],
      recommendations: ["Please check your AI API key and try again"],
      strengths: ["Resume received for analysis"],
    });
  }
}
