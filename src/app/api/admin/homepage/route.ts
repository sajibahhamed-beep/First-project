import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    const [faqs, skills, experiences] = await Promise.all([
      prisma.faq.findMany({ orderBy: { displayOrder: "asc" } }),
      prisma.skill.findMany({ orderBy: { displayOrder: "asc" } }),
      prisma.experience.findMany({ orderBy: { displayOrder: "asc" } }),
    ]);

    return NextResponse.json({
      settings: settingsMap,
      faqs,
      skills,
      experiences,
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch homepage data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { settings } = body;

    if (settings && typeof settings === "object") {
      for (const [key, value] of Object.entries(settings)) {
        await prisma.siteSetting.upsert({
          where: { key },
          update: { value: String(value) },
          create: { key, value: String(value) },
        });
      }
    }

    return NextResponse.json({ success: true, message: "Homepage settings updated successfully" });
  } catch (error) {
    console.error("Save homepage settings error:", error);
    return NextResponse.json({ error: "Failed to save homepage settings" }, { status: 500 });
  }
}
