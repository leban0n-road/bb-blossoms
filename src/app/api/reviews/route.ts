import { NextResponse } from "next/server";

interface ReviewRequestBody {
  name: string;
  rating: number;
  plant?: string;
  review: string;
  /** Honeypot — real visitors never fill this in; a bot did. */
  company?: string;
}

export async function POST(request: Request) {
  let body: Partial<ReviewRequestBody>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // Bot tripped the honeypot — pretend success so it doesn't learn to
  // adapt, but never actually send the email.
  if (body.company) {
    return NextResponse.json({ ok: true });
  }

  const { name, rating, review } = body;
  if (!name || !review || !rating || rating < 1 || rating > 5) {
    return NextResponse.json(
      { error: "Name, star rating, and review text are required." },
      { status: 400 }
    );
  }

  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.REVIEWS_NOTIFY_EMAIL;

  if (resendApiKey && notifyEmail) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "reviews@bbblossoms.com",
          to: notifyEmail,
          subject: `New ${rating}-star review from ${name}`,
          text: `Name: ${name}\nRating: ${rating}/5\nPlant: ${body.plant ?? "N/A"}\n\n${review}\n\n---\nThis review is NOT yet on the site. Add it to src/content/reviews.json to publish it.`,
        }),
      });
    } catch (error) {
      console.error("Failed to send review email via Resend", error);
    }
  } else {
    // No email provider configured yet — log server-side so submissions
    // are never silently dropped. Wire RESEND_API_KEY + REVIEWS_NOTIFY_EMAIL
    // to enable real email delivery.
    console.log("New review submission (no email provider configured):", body);
  }

  return NextResponse.json({ ok: true });
}
