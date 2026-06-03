import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { parseResumeStructure } from "@/lib/ai/resume-structure";

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { resumeText } = await request.json();
    if (!resumeText || resumeText.trim().length < 50) {
      return NextResponse.json(
        { error: "Resume text is too short to parse" },
        { status: 400 },
      );
    }

    const structured = await parseResumeStructure(resumeText);
    return NextResponse.json(structured);
  } catch (error) {
    console.error("Parse resume API error:", error);
    return NextResponse.json(
      { error: "Failed to parse resume" },
      { status: 500 },
    );
  }
}
