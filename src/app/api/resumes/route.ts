import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { prisma } from "@/lib/prisma";
import { extractTextFromFile, FileValidationError } from "@/lib/parse-resume";

export async function GET(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resumes = await prisma.resume.findMany({
    where: { userId: token.id as string },
    orderBy: { createdAt: "desc" },
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

  return NextResponse.json(resumes);
}

export async function POST(request: NextRequest) {
  const token = await getToken({ req: request });
  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Verify the user still exists (handles stale JWTs after DB resets)
  const userExists = await prisma.user.findUnique({ where: { id: token.id as string } });
  if (!userExists) {
    return NextResponse.json(
      { error: "User account not found. Please sign out and sign in again." },
      { status: 401 },
    );
  }

  const contentType = request.headers.get("content-type") || "";

  // Handle file upload (multipart/form-data)
  if (contentType.includes("multipart/form-data")) {
    try {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      const name = formData.get("name") as string | null;

      if (!file) {
        return NextResponse.json(
          { error: "No file provided" },
          { status: 400 },
        );
      }

      const resumeName =
        name || file.name.replace(/\.[^/.]+$/, "") || "Uploaded Resume";
      const text = await extractTextFromFile(file);

      if (!text || text.trim().length < 10) {
        return NextResponse.json(
          { error: "Could not extract text from file. The file may be empty or scanned." },
          { status: 400 },
        );
      }

      // Make first resume active by default
      const existingCount = await prisma.resume.count({
        where: { userId: token.id as string },
      });

      const resume = await prisma.resume.create({
        data: {
          userId: token.id as string,
          name: resumeName,
          fileName: file.name,
          content: text,
          isActive: existingCount === 0,
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

      return NextResponse.json(resume, { status: 201 });
    } catch (error) {
      if (error instanceof FileValidationError) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }
      console.error("File upload error:", error);
      return NextResponse.json(
        { error: "Failed to process uploaded file" },
        { status: 500 },
      );
    }
  }

  // Handle text paste (application/json)
  const body = await request.json();
  const { name, fileName, content } = body;

  if (!name || !content) {
    return NextResponse.json(
      { error: "Name and content are required" },
      { status: 400 },
    );
  }

  if (body.isActive) {
    await prisma.resume.updateMany({
      where: { userId: token.id as string },
      data: { isActive: false },
    });
  }

  const resume = await prisma.resume.create({
    data: {
      userId: token.id as string,
      name,
      fileName: fileName || name,
      content,
      isActive: body.isActive ?? false,
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

  return NextResponse.json(resume, { status: 201 });
}
