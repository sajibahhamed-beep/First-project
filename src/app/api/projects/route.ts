import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category") || "";

    const where: any = { published: true };
    if (category && category !== "all") {
      where.category = category;
    }

    const projects = await prisma.project.findMany({
      where,
      include: { caseStudy: true },
      orderBy: [
        { displayOrder: "asc" },
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET public projects API error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}
