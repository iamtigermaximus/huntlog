import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { optimizeResume } from "@/lib/ai";

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { resumeContent, jobDescription, jobTitle } = body;

    if (!resumeContent || !jobDescription) {
      return NextResponse.json(
        { error: "resumeContent and jobDescription are required" },
        { status: 400 }
      );
    }

    const result = await optimizeResume(
      resumeContent,
      jobDescription,
      jobTitle || "the position",
    );

    return NextResponse.json(result);
  } catch (error) {
    console.error("Resume optimize API error:", error);
    return NextResponse.json(
      { error: "Failed to optimize resume" },
      { status: 500 }
    );
  }
}
