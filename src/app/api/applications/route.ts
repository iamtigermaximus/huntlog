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

  // Format dates to ISO strings - only include fields that exist in schema
  const formattedApplications = applications.map((app) => ({
    ...app,
    appliedDate: app.appliedDate.toISOString(),
    jobPostingDate: app.jobPostingDate?.toISOString() || null,
    jobExpirationDate: app.jobExpirationDate?.toISOString() || null,
    offerDeadline: app.offerDeadline?.toISOString() || null,
    followUpDate: app.followUpDate?.toISOString() || null,
    confirmationDate: app.confirmationDate?.toISOString() || null,
    lastUpdated: app.lastUpdated?.toISOString() || null,
  }));

  return NextResponse.json(formattedApplications);
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

  // Handle appliedDate - use the date from form or current date
  let appliedDate = new Date();
  if (body.appliedDate) {
    appliedDate = new Date(body.appliedDate);
    // Set to midnight UTC to avoid timezone issues
    appliedDate.setUTCHours(0, 0, 0, 0);
  }

  const application = await prisma.application.create({
    data: {
      userId: user.id,
      jobTitle: body.jobTitle,
      company: body.company,
      location: body.location,
      jobDescription: body.jobDescription || "",
      jobUrl: body.jobUrl,
      salaryMin: body.salaryMin ? parseInt(body.salaryMin) : null,
      salaryMax: body.salaryMax ? parseInt(body.salaryMax) : null,
      jobType: body.jobType,
      seniorityLevel: body.seniorityLevel,
      appliedDate: appliedDate,
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

  // Format the response dates - only include fields that exist
  const formattedApplication = {
    ...application,
    appliedDate: application.appliedDate.toISOString(),
    jobExpirationDate: application.jobExpirationDate?.toISOString() || null,
    lastUpdated: application.lastUpdated?.toISOString() || null,
  };

  return NextResponse.json(formattedApplication);
}
