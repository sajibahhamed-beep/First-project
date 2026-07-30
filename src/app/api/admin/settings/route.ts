import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: { key: { startsWith: "site_" } },
    });
    const map: Record<string, string> = {};
    settings.forEach((s) => (map[s.key] = s.value));

    return NextResponse.json({ settings: map });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { settings } = body;

    if (settings && typeof settings === "object") {
      for (const [key, value] of Object.entries(settings)) {
        const fullKey = key.startsWith("site_") ? key : `site_${key}`;
        await prisma.siteSetting.upsert({
          where: { key: fullKey },
          update: { value: String(value) },
          create: { key: fullKey, value: String(value) },
        });
      }
    }

    return NextResponse.json({ success: true, message: "Site settings saved" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
