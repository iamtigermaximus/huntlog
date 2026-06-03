import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const resume = await prisma.resume.findFirst({
    where: { id, userId: token.id as string },
    select: {
      id: true,
      name: true,
      fileName: true,
      content: true,
      isActive: true,
      version: true,
      createdAt: true,
      lastUsed: true,
    },
  });

  if (!resume) {
    return NextResponse.json({ error: "Resume not found" }, { status: 404 });
  }

  return NextResponse.json(resume);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await request.json();

  if (body.isActive) {
    await prisma.resume.updateMany({
      where: { userId: token.id as string },
      data: { isActive: false },
    });
  }

  const resume = await prisma.resume.update({
    where: { id, userId: token.id as string },
    data: {
      ...(body.name && { name: body.name }),
      ...(body.content && { content: body.content }),
      ...(body.isActive !== undefined && { isActive: body.isActive }),
      ...(body.isActive && { lastUsed: new Date() }),
    },
    select: {
      id: true,
      name: true,
      fileName: true,
      content: true,
      isActive: true,
      version: true,
      createdAt: true,
    },
  });

  return NextResponse.json(resume);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  await prisma.resume.delete({ where: { id, userId: token.id as string } });
  return NextResponse.json({ success: true });
}
