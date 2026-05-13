// import { NextRequest, NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { prisma } from "@/lib/prisma";

// export async function GET(
//   request: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   const session = await getServerSession();

//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//   });

//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }

//   const application = await prisma.application.findFirst({
//     where: {
//       id: params.id,
//       userId: user.id,
//     },
//   });

//   if (!application) {
//     return NextResponse.json(
//       { error: "Application not found" },
//       { status: 404 },
//     );
//   }

//   return NextResponse.json(application);
// }

// export async function DELETE(
//   request: NextRequest,
//   { params }: { params: { id: string } },
// ) {
//   const session = await getServerSession();

//   if (!session?.user?.email) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const user = await prisma.user.findUnique({
//     where: { email: session.user.email },
//   });

//   if (!user) {
//     return NextResponse.json({ error: "User not found" }, { status: 404 });
//   }

//   await prisma.application.deleteMany({
//     where: {
//       id: params.id,
//       userId: user.id,
//     },
//   });

//   return NextResponse.json({ success: true });
// }
import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
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

    // ✅ Await the params promise
    const { id } = await params;

    const application = await prisma.application.findFirst({
      where: {
        id: id,
        userId: user.id,
      },
    });

    if (!application) {
      return NextResponse.json(
        { error: "Application not found" },
        { status: 404 },
      );
    }

    return NextResponse.json(application);
  } catch (error) {
    console.error("GET error:", error);
    return NextResponse.json(
      { error: "Failed to fetch application" },
      { status: 500 },
    );
  }
}

// ✅ FIX: Add Promise type for params
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const {
      jobTitle,
      company,
      location,
      jobUrl,
      salaryMin,
      salaryMax,
      jobType,
      seniorityLevel,
      jobDescription,
      appliedDate,
      status,
      source,
      notes,
    } = body;

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // ✅ Await the params promise
    const { id } = await params;

    const updated = await prisma.application.update({
      where: { id: id },
      data: {
        jobTitle,
        company,
        location,
        jobUrl,
        salaryMin: salaryMin ? parseInt(salaryMin) : null,
        salaryMax: salaryMax ? parseInt(salaryMax) : null,
        jobType,
        seniorityLevel,
        jobDescription,
        appliedDate: new Date(appliedDate),
        status,
        source,
        notes,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT error:", error);
    return NextResponse.json(
      { error: "Failed to update application" },
      { status: 500 },
    );
  }
}

// ✅ FIX: Add Promise type for params
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
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

    // ✅ Await the params promise
    const { id } = await params;

    await prisma.application.delete({
      where: { id: id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE error:", error);
    return NextResponse.json(
      { error: "Failed to delete application" },
      { status: 500 },
    );
  }
}
