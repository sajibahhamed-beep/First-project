import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, email, whatsapp, projectDetails } = body;

    if (!fullName || !email || !projectDetails) {
      return NextResponse.json(
        { error: "Missing required form fields" },
        { status: 400 }
      );
    }

    // 1. Save to Database
    await prisma.contactMessage.create({
      data: {
        fullName,
        email,
        whatsapp: whatsapp || "Not provided",
        projectDetails,
        status: "UNREAD",
      },
    });

    // 2. Submit to Web3Forms API to send email to sajibahhamed0@gmail.com
    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "0904d9c7-57ed-4389-a292-16ee71bf0d93",
          email_to: "sajibahhamed0@gmail.com",
          subject: `New Sajuxly Portfolio Inquiry from ${fullName}`,
          from_name: fullName,
          replyto: email,
          fullName: fullName,
          email: email,
          whatsapp: whatsapp || "Not provided",
          message: projectDetails,
        }),
      });
    } catch (e) {
      // Ignore external email error, DB record is saved
    }

    return NextResponse.json({
      success: true,
      message: "Inquiry recorded successfully",
    });
  } catch (error) {
    console.error("Contact form submission error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to record inquiry" },
      { status: 500 }
    );
  }
}
