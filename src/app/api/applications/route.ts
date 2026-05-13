import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const applications = await prisma.application.findMany({
    where: { userId: user.id },
    orderBy: { appliedDate: "desc" },
  });

  return NextResponse.json(applications);
}

export async function POST(request: NextRequest) {
  const session = await getServerSession();

  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const body = await request.json();

  const application = await prisma.application.create({
    data: {
      userId: user.id,
      jobTitle: body.jobTitle,
      company: body.company,
      location: body.location,
      jobDescription: body.jobDescription,
      jobUrl: body.jobUrl,
      salaryMin: body.salaryMin ? parseInt(body.salaryMin) : null,
      salaryMax: body.salaryMax ? parseInt(body.salaryMax) : null,
      jobType: body.jobType,
      seniorityLevel: body.seniorityLevel,
      jobExpirationDate: body.jobExpirationDate
        ? new Date(body.jobExpirationDate)
        : null,
      notes: body.notes,
      coverLetter: body.coverLetter,
      status: body.status || "APPLIED",
      matchScore: body.matchScore,
      missingSkills: body.missingSkills,
      recommendations: body.recommendations,
      strengths: body.strengths,
      confirmationReceived: body.confirmationReceived || false,
      confirmationNotes: body.confirmationNotes,
      source: body.source,
    },
  });

  return NextResponse.json(application);
}
