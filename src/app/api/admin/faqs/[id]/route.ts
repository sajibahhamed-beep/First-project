import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminSession } from "@/lib/auth";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// PUT — update a FAQ by id
export async function PUT(request: Request, { params }: RouteParams) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    const body = await request.json();
    const { question, answer, category, displayOrder } = body;

    if (!question?.trim() || !answer?.trim()) {
      return NextResponse.json({ error: "Question and answer are required" }, { status: 400 });
    }

    const faq = await prisma.faq.update({
      where: { id },
      data: {
        question: question.trim(),
        answer: answer.trim(),
        category: category?.trim() || null,
        ...(displayOrder !== undefined && { displayOrder: Number(displayOrder) }),
      },
    });

    return NextResponse.json({ faq });
  } catch (error) {
    console.error("PUT /api/admin/faqs/[id] error:", error);
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

// DELETE — remove a FAQ by id
export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.faq.delete({ where: { id } });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/admin/faqs/[id] error:", error);
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
