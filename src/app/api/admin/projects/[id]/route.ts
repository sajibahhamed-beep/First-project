import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const project = await prisma.project.findUnique({
      where: { id },
      include: { caseStudy: true },
    });

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }

    return NextResponse.json({ project });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch project" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { caseStudy, ...rawData } = body;

    const projectUpdateData: any = {};
    const validProjectKeys = [
      "title", "slug", "shortDesc", "category", "categoryTag", "tagColor",
      "impactPill", "pages", "duration", "role", "tools", "heroImage",
      "liveUrl", "githubUrl", "behanceUrl", "dribbbleUrl", "figmaUrl",
      "featured", "published", "displayOrder"
    ];

    for (const key of validProjectKeys) {
      if (rawData[key] !== undefined) {
        projectUpdateData[key] = rawData[key];
      }
    }

    if (projectUpdateData.displayOrder !== undefined) {
      projectUpdateData.displayOrder = parseInt(projectUpdateData.displayOrder);
    }

    const updatedProject = await prisma.project.update({
      where: { id },
      data: {
        ...projectUpdateData,
        caseStudy: caseStudy
          ? {
              upsert: {
                create: {
                  subtitle: caseStudy.subtitle || projectUpdateData.title,
                  summary: caseStudy.summary || projectUpdateData.shortDesc,
                  overview: caseStudy.overview || projectUpdateData.shortDesc,
                  problem: caseStudy.problem || "",
                  solution: caseStudy.solution || "",
                  results: typeof caseStudy.results === "string" ? caseStudy.results : JSON.stringify(caseStudy.results || []),
                  screens: typeof caseStudy.screens === "string" ? caseStudy.screens : JSON.stringify(caseStudy.screens || []),
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
                update: {
                  subtitle: caseStudy.subtitle,
                  summary: caseStudy.summary,
                  overview: caseStudy.overview,
                  problem: caseStudy.problem,
                  solution: caseStudy.solution,
                  results: typeof caseStudy.results === "string" ? caseStudy.results : JSON.stringify(caseStudy.results || []),
                  screens: typeof caseStudy.screens === "string" ? caseStudy.screens : JSON.stringify(caseStudy.screens || []),
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
              },
            }
          : undefined,
      },
      include: { caseStudy: true },
    });

    return NextResponse.json({ success: true, project: updatedProject });
  } catch (error) {
    console.error("PUT project API error:", error);
    return NextResponse.json({ error: "Failed to update project" }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.project.delete({ where: { id } });
    return NextResponse.json({ success: true, message: "Project deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete project" }, { status: 500 });
  }
}
