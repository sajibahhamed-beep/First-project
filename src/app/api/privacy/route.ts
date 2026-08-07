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
        sections = [];
      }
    }
    
    return NextResponse.json({ sections });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch privacy policy" }, { status: 500 });
  }
}
