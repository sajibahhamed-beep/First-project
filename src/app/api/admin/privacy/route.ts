import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const setting = await prisma.siteSetting.findUnique({
      where: { key: "site_privacy_policy" },
    });
    
    let sections = [];
    if (setting?.value) {
      try {
        sections = JSON.parse(setting.value);
      } catch (e) {
        // Fallback for old string format
        sections = [];
      }
    }
    
    return NextResponse.json({ sections });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch privacy policy" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { sections } = body;

    if (!Array.isArray(sections)) {
      return NextResponse.json({ error: "Sections array is required" }, { status: 400 });
    }

    const contentString = JSON.stringify(sections);

    await prisma.siteSetting.upsert({
      where: { key: "site_privacy_policy" },
      update: { value: contentString },
      create: { key: "site_privacy_policy", value: contentString },
    });

    return NextResponse.json({ success: true, message: "Privacy policy saved" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to save privacy policy" }, { status: 500 });
  }
}
