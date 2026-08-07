import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const blog = await prisma.blog.findFirst({
      where: {
        OR: [{ id: id }, { slug: id }],
      },
    });

    if (!blog) {
      return NextResponse.json({ error: "Blog post not found" }, { status: 404 });
    }

    const nextBlog = await prisma.blog.findFirst({
      where: {
        published: true,
        id: { not: blog.id },
      },
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ blog, nextBlog });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog post" }, { status: 500 });
  }
}
