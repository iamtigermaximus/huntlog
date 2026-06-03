import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { generateInterviewPrep } from "@/lib/ai";

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { jobTitle, company, jobDescription, resumeContent } = body;

    if (!jobTitle || !company || !jobDescription) {
      return NextResponse.json(
        { error: "jobTitle, company, and jobDescription are required" },
        { status: 400 }
      );
    }

    const prep = await generateInterviewPrep(
      jobTitle,
      company,
      jobDescription,
      resumeContent || "",
    );

    return NextResponse.json(prep);
  } catch (error) {
    console.error("Interview prep API error:", error);
    return NextResponse.json(
      { error: "Failed to generate interview prep" },
      { status: 500 }
    );
  }
}
