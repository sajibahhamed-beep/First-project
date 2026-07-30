import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";

    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { excerpt: { contains: search } },
        { category: { contains: search } },
      ];
    }

    const blogs = await prisma.blog.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json({ blogs });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blog posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      category,
      tags,
      coverImage,
      readTime,
      published,
      featured,
    } = body;

    if (!title || !excerpt || !content) {
      return NextResponse.json(
        { error: "Title, excerpt, and content are required" },
        { status: 400 }
      );
    }

    const cleanSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-]/g, "-");

    const newBlog = await prisma.blog.create({
      data: {
        title,
        slug: cleanSlug,
        excerpt,
        content,
        category: category || "Design Trends",
        tags: tags || "UI/UX, Web Design",
        coverImage: coverImage || "/assets/figma_img_23.png",
        readTime: readTime || "5 min read",
        published: published ?? true,
        featured: featured ?? false,
      },
    });

    return NextResponse.json({ success: true, blog: newBlog });
  } catch (error: any) {
    console.error("POST blog API error:", error);
    if (error.code === "P2002") {
      return NextResponse.json({ error: "A blog post with this slug already exists" }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create blog post" }, { status: 500 });
  }
}
