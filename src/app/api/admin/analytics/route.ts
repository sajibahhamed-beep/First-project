import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [
      totalProjects,
      totalCaseStudies,
      totalBlogs,
      totalMessages,
      unreadMessages,
      totalResumes,
      downloadsSum,
      totalFaqs,
      totalTestimonials,
      totalSkills,
      recentMessages,
      recentProjects,
    ] = await Promise.all([
      prisma.project.count(),
      prisma.caseStudy.count(),
      prisma.blog.count(),
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: "UNREAD" } }),
      prisma.resume.count(),
      prisma.resume.aggregate({ _sum: { downloadCount: true } }),
      prisma.faq.count(),
      prisma.testimonial.count(),
      prisma.skill.count(),
      prisma.contactMessage.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
      }),
      prisma.project.findMany({
        take: 5,
        orderBy: { updatedAt: "desc" },
        select: {
          id: true,
          title: true,
          categoryTag: true,
          published: true,
          updatedAt: true,
        },
      }),
    ]);

    return NextResponse.json({
      totalProjects,
      totalCaseStudies,
      totalBlogs,
      totalMessages,
      unreadMessages,
      totalResumes,
      totalDownloads: downloadsSum._sum.downloadCount || 0,
      totalFaqs,
      totalTestimonials,
      totalSkills,
      totalVisitors: 12480, // Integrated metrics placeholder
      recentMessages,
      recentProjects,
    });
  } catch (error) {
    console.error("Analytics API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
