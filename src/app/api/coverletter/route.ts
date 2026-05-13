import { NextRequest, NextResponse } from "next/server";
// import { generateCoverLetter } from "@/lib/groq";
import { generateCoverLetter } from "@/lib/ai";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { jobDescription, resumeContent, company, jobTitle, strengths } =
      body;

    if (!jobDescription || !resumeContent) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const coverLetter = await generateCoverLetter(
      jobDescription,
      resumeContent,
      company || "the company",
      jobTitle || "the position",
      strengths || [],
    );

    return NextResponse.json({ coverLetter });
  } catch (error) {
    console.error("Cover letter error:", error);
    return NextResponse.json(
      { error: "Failed to generate cover letter" },
      { status: 500 },
    );
  }
}
