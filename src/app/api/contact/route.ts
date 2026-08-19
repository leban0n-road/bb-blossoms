import { NextResponse } from "next/server";

interface ContactRequestBody {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

export async function POST(request: Request) {
  let body: Partial<ContactRequestBody>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { name, email, message } = body;
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Name, email, and message are required." },
      { status: 400 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.CONTACT_NOTIFY_EMAIL;

  if (resendApiKey && notifyEmail) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "contact@bbblossoms.com",
          to: notifyEmail,
          subject: `New contact form message from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${body.phone ?? "N/A"}\n\n${message}`,
        }),
      });
    } catch (error) {
      console.error("Failed to send contact email via Resend", error);
    }
  } else {
    console.log("New contact message (no email provider configured):", body);
  }

  return NextResponse.json({ ok: true });
}
