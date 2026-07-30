import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: { key: { startsWith: "theme_" } },
    });
    const map: Record<string, string> = {};
    settings.forEach((s) => (map[s.key] = s.value));

    return NextResponse.json({ theme: map });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch theme settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { theme } = body;

    if (theme && typeof theme === "object") {
      for (const [key, value] of Object.entries(theme)) {
        const fullKey = key.startsWith("theme_") ? key : `theme_${key}`;
        await prisma.siteSetting.upsert({
          where: { key: fullKey },
          update: { value: String(value) },
          create: { key: fullKey, value: String(value) },
        });
      }
    }

    return NextResponse.json({ success: true, message: "Theme settings saved" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save theme settings" }, { status: 500 });
  }
}
