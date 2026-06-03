import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";
import { monitorApplications } from "@/lib/ai";

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userId = token.id as string;
    const applications = await prisma.application.findMany({
      where: {
        userId,
        status: { notIn: ["REJECTED", "ARCHIVED", "ACCEPTED"] },
      },
      select: {
        id: true,
        jobTitle: true,
        company: true,
        status: true,
        appliedDate: true,
        jobExpirationDate: true,
        lastMonitoredAt: true,
        matchScore: true,
      },
      orderBy: { appliedDate: "desc" },
    });

    const result = await monitorApplications(
      applications.map((a) => ({
        ...a,
        appliedDate: a.appliedDate.toISOString(),
        jobExpirationDate: a.jobExpirationDate?.toISOString(),
        lastMonitoredAt: a.lastMonitoredAt?.toISOString(),
        matchScore: a.matchScore || undefined,
      })),
    );

    // Update lastMonitoredAt for all monitored apps
    await prisma.application.updateMany({
      where: { userId, status: { notIn: ["REJECTED", "ARCHIVED", "ACCEPTED"] } },
      data: { lastMonitoredAt: new Date() },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Monitor API error:", error);
    return NextResponse.json(
      { error: "Failed to monitor applications" },
      { status: 500 }
    );
  }
}
