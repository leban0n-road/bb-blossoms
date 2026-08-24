import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface CheckoutItem {
  plantName: string;
  sizeLabel: string;
  quantity: number;
  unitPrice: number;
  installation: boolean;
  installationFee: number;
}

interface CheckoutRequestBody {
  items: CheckoutItem[];
  total: number;
  name: string;
  email: string;
  phone?: string;
  address: string;
  deliveryMethod?: "delivery" | "pickup";
  deliveryDate?: string;
  notes?: string;
  /** Honeypot — real visitors never fill this in; a bot did. */
  company?: string;
}

export async function POST(request: Request) {
  let body: Partial<CheckoutRequestBody>;
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

  const { items, name, email, address } = body;
  if (!items?.length || !name || !email || !address) {
    return NextResponse.json(
      { error: "Name, email, delivery address, and at least one cart item are required." },
      { status: 400 }
    );
  }
  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
  }

  const itemLines = items
    .map((item) => {
      const lineTotal = (item.unitPrice + item.installationFee) * item.quantity;
      return `- ${item.plantName} (${item.sizeLabel}) x${item.quantity}${
        item.installation ? " + installation" : ""
      } — $${lineTotal.toFixed(2)}`;
    })
    .join("\n");

  const resendApiKey = process.env.RESEND_API_KEY;
  const notifyEmail = process.env.CHECKOUT_NOTIFY_EMAIL;

  if (resendApiKey && notifyEmail) {
    try {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "orders@bbblossoms.com",
          to: notifyEmail,
          subject: `New order request from ${name}`,
          text: `Name: ${name}\nEmail: ${email}\nPhone: ${body.phone ?? "N/A"}\nFulfillment: ${body.deliveryMethod === "pickup" ? "Will-call pickup" : "Local delivery"}\nAddress: ${address}\nPreferred date: ${body.deliveryDate ?? "N/A"}\nNotes: ${body.notes ?? "N/A"}\n\nItems:\n${itemLines}\n\nEstimated total: $${(body.total ?? 0).toFixed(2)}\n\n---\nNo payment has been collected — this is a preliminary order request pending manual follow-up and payment confirmation.`,
        }),
      });
    } catch (error) {
      console.error("Failed to send checkout email via Resend", error);
    }
  } else {
    // No email provider configured yet — log server-side so orders are
    // never silently dropped. Wire RESEND_API_KEY + CHECKOUT_NOTIFY_EMAIL
    // to enable real email delivery.
    console.log("New order request (no email provider configured):", body);
  }

  return NextResponse.json({ ok: true });
}
