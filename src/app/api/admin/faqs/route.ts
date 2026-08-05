import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

// GET all FAQs
export async function GET() {
  try {
    const faqs = await prisma.faq.findMany({
      orderBy: { displayOrder: "asc" },
    });
    return NextResponse.json({ faqs });
  } catch (error) {
    console.error("GET /api/admin/faqs error:", error);
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

// POST — create a new FAQ
export async function POST(request: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { question, answer, category } = body;

    if (!question?.trim() || !answer?.trim()) {
      return NextResponse.json({ error: "Question and answer are required" }, { status: 400 });
    }

    // Place new item at the end
    const count = await prisma.faq.count();

    const faq = await prisma.faq.create({
      data: {
        question: question.trim(),
        answer: answer.trim(),
        category: category?.trim() || null,
        displayOrder: count,
      },
    });

    return NextResponse.json({ faq }, { status: 201 });
  } catch (error) {
    console.error("POST /api/admin/faqs error:", error);
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}
