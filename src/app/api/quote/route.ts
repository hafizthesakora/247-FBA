import { NextResponse } from "next/server";
import { sendEmail, quoteEmailTemplate } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { name, email, service, message } = body;

    if (!name || !email || !service || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, service, message" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    await sendEmail({
      subject: `[Quote] ${service} — from ${name}`,
      html: quoteEmailTemplate({
        name,
        email,
        company: body.company,
        phone: body.phone,
        service,
        monthlyUnits: body.monthlyUnits,
        message,
      }),
      replyTo: email,
    });

    return NextResponse.json({ success: true, message: "Quote request received" });
  } catch (error) {
    console.error("Quote form error:", error);
    return NextResponse.json(
      { error: "Failed to send quote request. Please try again." },
      { status: 500 }
    );
  }
}
