import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "";

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { shortDesc: { contains: search } },
        { categoryTag: { contains: search } },
      ];
    }
    if (category) {
      where.category = category;
    }

    const projects = await prisma.project.findMany({
      where,
      include: { caseStudy: true },
      orderBy: { displayOrder: "asc" },
    });

    return NextResponse.json({ projects });
  } catch (error) {
    console.error("GET projects API error:", error);
    return NextResponse.json({ error: "Failed to fetch projects" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      shortDesc,
      category,
      categoryTag,
      impactPill,
      pages,
      duration,
      role,
      tools,
      heroImage,
      liveUrl,
      githubUrl,
      behanceUrl,
      dribbbleUrl,
      figmaUrl,
      featured,
      published,
      displayOrder,
      caseStudy,
    } = body;

    if (!title || !slug || !shortDesc) {
      return NextResponse.json(
        { error: "Title, slug, and short description are required" },
        { status: 400 }
      );
    }

    const cleanSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-");

    const newProject = await prisma.project.create({
      data: {
        title,
        slug: cleanSlug,
        shortDesc,
        category: category || "travel",
        categoryTag: categoryTag || "General",
        tagColor: "text-[#06ACFE]",
        impactPill: impactPill || "High Impact",
        pages: pages || "10+ Screens",
        duration: duration || "1 Month",
        role: role || "UI/UX Designer",
        tools: tools || "Figma",
        heroImage: heroImage || "/assets/project_triply_exact.png",
        liveUrl,
        githubUrl,
        behanceUrl,
        dribbbleUrl,
        figmaUrl,
        featured: featured ?? false,
        published: published ?? true,
        displayOrder: displayOrder ? parseInt(displayOrder) : 0,
        caseStudy: caseStudy
          ? {
              create: {
                subtitle: caseStudy.subtitle || title,
                summary: caseStudy.summary || shortDesc,
                overview: caseStudy.overview || shortDesc,
                problem: caseStudy.problem || "User research and problem context.",
                solution: caseStudy.solution || "Comprehensive UI/UX solution.",
                results: JSON.stringify(caseStudy.results || []),
                screens: JSON.stringify(caseStudy.screens || []),
                researchImage: caseStudy.researchImage,
                researchText: caseStudy.researchText,
                wireframeImage: caseStudy.wireframeImage,
                wireframeText: caseStudy.wireframeText,
                designSystemImage: caseStudy.designSystemImage,
                designSystemText: caseStudy.designSystemText,
                teamSize: caseStudy.teamSize,
                timeline: caseStudy.timeline,
                technologies: caseStudy.technologies,
              },
            }
          : undefined,
      },
      include: { caseStudy: true },
    });

    return NextResponse.json({ success: true, project: newProject });
  } catch (error: any) {
    console.error("POST project API error:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "A project with this slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create project" }, { status: 500 });
  }
}
