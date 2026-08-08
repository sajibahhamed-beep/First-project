import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    const resume =
      (await prisma.resume.findFirst({ where: { isDefault: true } })) ||
      (await prisma.resume.findFirst({ orderBy: { updatedAt: "desc" } }));

    if (resume) {
      await prisma.resume.update({
        where: { id: resume.id },
        data: { downloadCount: { increment: 1 } },
      });
    }

    return NextResponse.json({ success: true, count: resume ? resume.downloadCount + 1 : 0 });
  } catch (error) {
    console.error("Increment download count error:", error);
    return NextResponse.json({ error: "Failed to track download" }, { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const resume =
      (await prisma.resume.findFirst({ where: { isDefault: true } })) ||
      (await prisma.resume.findFirst({ orderBy: { updatedAt: "desc" } }));

    if (!resume) {
      return NextResponse.redirect(
        new URL(
          "https://drive.google.com/file/d/1TXMVWEfulEjQeO3Mt3o-pbQuHW4mI08z/view?usp=sharing",
          request.url
        )
      );
    }

    await prisma.resume.update({
      where: { id: resume.id },
      data: { downloadCount: { increment: 1 } },
    });

    if (resume.fileUrl.startsWith("http://") || resume.fileUrl.startsWith("https://")) {
      return NextResponse.redirect(resume.fileUrl);
    }

    return NextResponse.redirect(new URL(resume.fileUrl, request.url));
  } catch (error) {
    console.error("Resume download error:", error);
    return NextResponse.redirect(
      new URL(
        "https://drive.google.com/file/d/1TXMVWEfulEjQeO3Mt3o-pbQuHW4mI08z/view?usp=sharing",
        request.url
      )
    );
  }
}
