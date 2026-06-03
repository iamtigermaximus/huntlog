import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prepareApplication } from "@/lib/ai";

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { jobTitle, company, jobDescription, resumeContent } = body;

    if (!jobTitle || !company || !jobDescription || !resumeContent) {
      return NextResponse.json(
        { error: "jobTitle, company, jobDescription, and resumeContent are required" },
        { status: 400 }
      );
    }

    const applicationPackage = await prepareApplication(
      jobTitle,
      company,
      jobDescription,
      resumeContent,
    );

    return NextResponse.json(applicationPackage);
  } catch (error) {
    console.error("Prepare application API error:", error);
    return NextResponse.json(
      { error: "Failed to prepare application" },
      { status: 500 }
    );
  }
}
