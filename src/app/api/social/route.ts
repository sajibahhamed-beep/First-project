import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export interface SocialLinkItem {
  id: string;
  name: string;
  url: string;
  enabled: boolean;
}

const defaultPlatforms: SocialLinkItem[] = [
  { id: "whatsapp", name: "WhatsApp", url: "https://wa.me/+8801775551325", enabled: true },
  { id: "facebook", name: "Facebook", url: "https://facebook.com/sajib", enabled: true },
  { id: "youtube", name: "YouTube", url: "https://youtube.com/@sajib", enabled: true },
  { id: "instagram", name: "Instagram", url: "https://instagram.com/sajib", enabled: true },
  { id: "linkedin", name: "LinkedIn", url: "https://linkedin.com/in/sajib", enabled: true },
  { id: "dribbble", name: "Dribbble", url: "https://dribbble.com/sajib", enabled: true },
  { id: "pinterest", name: "Pinterest", url: "https://pinterest.com/sajib", enabled: true },
  { id: "behance", name: "Behance", url: "https://behance.net/sajib", enabled: true },
  { id: "twitter", name: "Twitter (X)", url: "https://twitter.com/sajib", enabled: true },
];

export async function GET() {
  try {
    const settings = await prisma.siteSetting.findMany({
      where: { key: { startsWith: "social_" } },
    });

    const settingsMap: Record<string, string> = {};
    settings.forEach((s) => {
      settingsMap[s.key] = s.value;
    });

    const platforms = defaultPlatforms.map((p) => {
      const urlKey = `social_${p.id}_url`;
      const enabledKey = `social_${p.id}_enabled`;
      return {
        ...p,
        url: settingsMap[urlKey] !== undefined ? settingsMap[urlKey] : p.url,
        enabled: settingsMap[enabledKey] !== undefined ? settingsMap[enabledKey] === "true" : p.enabled,
      };
    });

    return NextResponse.json({ platforms });
  } catch (error) {
    return NextResponse.json({ platforms: defaultPlatforms });
  }
}
