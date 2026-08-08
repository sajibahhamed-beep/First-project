import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "";
    const featured = searchParams.get("featured");

    const where: any = { published: true };
    if (category && category !== "all") {
      where.category = category;
    }
    if (featured === "true" || featured === "1") {
      where.featured = true;
    }

    let projects = await prisma.project.findMany({
      where,
      include: { caseStudy: true },
      orderBy: [
        { displayOrder: "asc" },
        { createdAt: "desc" },
      ],
    });

    // If featured was requested but none are explicitly marked, fallback to published projects
    if ((featured === "true" || featured === "1") && projects.length === 0) {
      projects = await prisma.project.findMany({
        where: { published: true },
        include: { caseStudy: true },
        orderBy: [
          { displayOrder: "asc" },
          { createdAt: "desc" },
        ],
        take: 3,
      });
    }

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET public projects API error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
