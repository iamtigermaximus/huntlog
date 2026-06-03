import { NextRequest, NextResponse } from "next/server";
import { generateCoverLetter } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      jobDescription,
      resumeContent,
      company,
      jobTitle,
      strengths,
      additionalInstructions,
    } = body;

    if (!jobDescription || !resumeContent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const coverLetter = await generateCoverLetter(
      jobDescription,
      resumeContent,
      company || "the company",
      jobTitle || "the position",
      strengths || [],
      additionalInstructions,
    );

    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error("Cover letter API error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to generate cover letter",
      },
      { status: 500 }
    );
  }
}
