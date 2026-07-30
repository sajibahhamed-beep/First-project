import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: { key: { startsWith: "seo_" } },
    });
    const map: Record<string, string> = {};
    settings.forEach((s) => (map[s.key] = s.value));

    return NextResponse.json({ seo: map });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch SEO settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { seo } = body;

    if (seo && typeof seo === "object") {
      for (const [key, value] of Object.entries(seo)) {
        const fullKey = key.startsWith("seo_") ? key : `seo_${key}`;
        await prisma.siteSetting.upsert({
          where: { key: fullKey },
          update: { value: String(value) },
          create: { key: fullKey, value: String(value) },
        });
      }
    }

    return NextResponse.json({ success: true, message: "SEO settings saved" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save SEO settings" }, { status: 500 });
  }
}
