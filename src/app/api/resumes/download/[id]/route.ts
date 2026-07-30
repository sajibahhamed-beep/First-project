import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const resume = await prisma.resume.findUnique({ where: { id } });

    if (!resume) {
      return NextResponse.json({ error: "Resume file not found" }, { status: 404 });
    }

    // Increment download count
    await prisma.resume.update({
      where: { id },
      data: { downloadCount: { increment: 1 } },
    });

    // Redirect to actual file asset
    return NextResponse.redirect(new URL(resume.fileUrl, request.url));
  } catch (error) {
    return NextResponse.json({ error: "Download failed" }, { status: 500 });
  }
}
