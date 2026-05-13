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

  // Await the params promise
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
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
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

  // Await the params promise
  const { id } = await params;

  await prisma.application.deleteMany({
    where: {
      id: id,
      userId: user.id,
    },
  });

  return NextResponse.json({ success: true });
}
