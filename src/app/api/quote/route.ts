import { NextResponse } from "next/server";

interface QuoteRequestBody {
  projectType: string;
  plantInterest?: string;
  zipOrCity: string;
  name: string;
  email: string;
  phone?: string;
}

export async function POST(request: Request) {
  let body: Partial<QuoteRequestBody>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const { projectType, zipOrCity, name, email } = body;
  if (!projectType || !zipOrCity || !name || !email) {
    return NextResponse.json(
      { error: "Project type, zip/city, name, and email are required." },
      { status: 400 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.QUOTE_NOTIFY_EMAIL;

  if (resendApiKey && notifyEmail) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "quotes@bbblossoms.com",
          to: notifyEmail,
          subject: `New quote request: ${projectType}`,
          text: `Project type: ${projectType}\nPlant interest: ${body.plantInterest ?? "N/A"}\nLocation: ${zipOrCity}\nName: ${name}\nEmail: ${email}\nPhone: ${body.phone ?? "N/A"}`,
        }),
      });
    } catch (error) {
      console.error("Failed to send quote email via Resend", error);
    }
  } else {
    // No email provider configured yet — log server-side so requests are
    // never silently dropped. Wire RESEND_API_KEY + QUOTE_NOTIFY_EMAIL
    // (or swap in Formspree) to enable real email delivery.
    console.log("New quote request (no email provider configured):", body);
  }

  return NextResponse.json({ ok: true });
}
