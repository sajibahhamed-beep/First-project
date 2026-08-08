import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const resumes = await prisma.resume.findMany({
      orderBy: [{ isDefault: "desc" }, { updatedAt: "desc" }],
    });

    const defaultResume = resumes.find((r) => r.isDefault) || resumes[0] || null;

    return NextResponse.json({
      success: true,
      resumes,
      defaultResume,
    });
  } catch (error) {
    console.error("Fetch public resumes error:", error);
    return NextResponse.json({ error: "Failed to fetch resumes" }, { status: 500 });
  }
}
