import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { extractJobFromUrl } from "@/lib/ai";
import { isValidExternalUrl } from "@/lib/validate-url";

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { url, jobText } = body;

    if (!url && !jobText) {
      return NextResponse.json(
        { error: "URL or job text is required" },
        { status: 400 }
      );
    }

    if (url && !isValidExternalUrl(url)) {
      return NextResponse.json(
        { error: "Invalid URL. Only HTTPS job posting URLs are accepted." },
        { status: 400 }
      );
    }

    const job = await extractJobFromUrl(url || "", jobText);
    return NextResponse.json(job);
  } catch (error) {
    console.error("Job extract API error:", error);
    return NextResponse.json(
      { error: "Failed to extract job details" },
      { status: 500 }
    );
  }
}
