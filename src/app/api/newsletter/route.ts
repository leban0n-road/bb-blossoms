import { NextResponse } from "next/server";

export async function POST(request: Request) {
  let email: string | undefined;

  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    const body = await request.json().catch(() => ({}));
    email = body.email;
  } else {
    const formData = await request.formData();
    email = formData.get("email")?.toString();
  }

  if (!email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  // No ESP (Mailchimp/Klaviyo/etc.) configured yet — log so signups are
  // never silently dropped. Wire NEWSLETTER_API_KEY to enable real delivery.
  console.log("New newsletter signup:", email);

  const acceptsJson = request.headers.get("accept")?.includes("application/json");
  if (acceptsJson) {
    return NextResponse.json({ ok: true });
  }

  return NextResponse.redirect(new URL("/?newsletter=success", request.url), 303);
}
