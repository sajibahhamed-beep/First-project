import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const resume =
      (await prisma.resume.findFirst({ where: { isDefault: true } })) ||
      (await prisma.resume.findFirst({ orderBy: { updatedAt: "desc" } }));

    const allResumes = await prisma.resume.findMany({
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json({
      success: true,
      resume: resume || null,
      resumes: allResumes,
      downloadCount: resume ? resume.downloadCount : 0,
    });
  } catch (error) {
    console.error("Fetch resume error:", error);
    return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fileUrl, title } = body;

    if (!fileUrl) {
      return NextResponse.json({ error: "Resume URL is required" }, { status: 400 });
    }

    const cleanUrl = fileUrl.trim();
    const cleanTitle = (title && title.trim()) || "UX & Product Designer Resume (2026)";

    // Update existing single resume or create new one
    const existing = await prisma.resume.findFirst({
      orderBy: { updatedAt: "desc" },
    });

    let resume;
    if (existing) {
      // Ensure only this one is default
      await prisma.resume.updateMany({
        where: { id: { not: existing.id } },
        data: { isDefault: false },
      });

      resume = await prisma.resume.update({
        where: { id: existing.id },
        data: {
          fileUrl: cleanUrl,
          title: cleanTitle,
          isDefault: true,
        },
      });
    } else {
      resume = await prisma.resume.create({
        data: {
          title: cleanTitle,
          filename: cleanUrl.split("/").pop() || "Resume.pdf",
          fileUrl: cleanUrl,
          fileSize: "1.2 MB",
          isDefault: true,
          downloadCount: 0,
        },
      });
    }

    return NextResponse.json({ success: true, resume });
  } catch (error) {
    console.error("Save resume link error:", error);
    return NextResponse.json({ error: "Failed to save resume link" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await prisma.resume.deleteMany({});
    return NextResponse.json({ success: true, message: "Resume deleted" });
  } catch (error) {
    console.error("Delete resume error:", error);
    return NextResponse.json({ error: "Failed to delete resume" }, { status: 500 });
  }
}
