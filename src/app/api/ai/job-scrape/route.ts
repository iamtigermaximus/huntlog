import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";
import { scrapeJobs } from "@/lib/ai";

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { resumeContent, searchPreferences } = body;

    if (!resumeContent) {
      return NextResponse.json({ error: "Resume content is required" }, { status: 400 });
    }

    const jobs = await scrapeJobs(resumeContent, searchPreferences || {});
    return NextResponse.json({ jobs });
  } catch (error) {
    console.error("Job scrape API error:", error);
    return NextResponse.json(
      { error: "Failed to scrape jobs", jobs: [] },
      { status: 500 }
    );
  }
}
