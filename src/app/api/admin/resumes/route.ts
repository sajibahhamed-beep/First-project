import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const resumes = await prisma.resume.findMany({
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json({ resumes });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch resumes" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { title, filename, fileUrl, fileSize, isDefault } = body;

    if (!title || !fileUrl) {
      return NextResponse.json({ error: "Title and file URL are required" }, { status: 400 });
    }

    if (isDefault) {
      await prisma.resume.updateMany({ data: { isDefault: false } });
    }

    const newResume = await prisma.resume.create({
      data: {
        title,
        filename: filename || "Sajib_Resume.pdf",
        fileUrl,
        fileSize: fileSize || "1.0 MB",
        isDefault: isDefault ?? false,
      },
    });

    return NextResponse.json({ success: true, resume: newResume });
  } catch (error) {
    return NextResponse.json({ error: "Failed to add resume" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

    await prisma.resume.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Resume deleted" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}
