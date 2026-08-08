import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany();
    const map: Record<string, string> = {};
    settings.forEach((s) => (map[s.key] = s.value));

    return NextResponse.json({ success: true, settings: map });
  } catch (error) {
    console.error("Fetch site settings error:", error);
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { settings, socials } = body;

    // 1. Save general site & footer settings
    if (settings && typeof settings === "object") {
      for (const [key, value] of Object.entries(settings)) {
        const fullKey = key.startsWith("site_") ? key : `site_${key}`;
        await prisma.siteSetting.upsert({
          where: { key: fullKey },
          update: { value: String(value ?? "") },
          create: { key: fullKey, value: String(value ?? "") },
        });
      }
    }

    // 2. Save social platform links & enabled states
    if (Array.isArray(socials)) {
      for (const platform of socials) {
        if (platform.id) {
          const urlKey = `social_${platform.id}_url`;
          const enabledKey = `social_${platform.id}_enabled`;

          await prisma.siteSetting.upsert({
            where: { key: urlKey },
            update: { value: String(platform.url || "") },
            create: { key: urlKey, value: String(platform.url || "") },
          });

          await prisma.siteSetting.upsert({
            where: { key: enabledKey },
            update: { value: platform.enabled ? "true" : "false" },
            create: { key: enabledKey, value: platform.enabled ? "true" : "false" },
          });
        }
      }
    }

    return NextResponse.json({ success: true, message: "Footer & site settings saved successfully" });
  } catch (error) {
    console.error("Save site settings error:", error);
    return NextResponse.json({ error: "Failed to save settings" }, { status: 500 });
  }
}
