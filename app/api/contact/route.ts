import { NextResponse } from "next/server";
import { Resend } from "resend";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const escape = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.company ?? "");

  // Bots fill the hidden field — pretend success and drop it.
  if (honeypot) return NextResponse.json({ ok: true });

  if (name.length < 2 || name.length > 100)
    return NextResponse.json({ error: "Invalid name" }, { status: 422 });
  if (!EMAIL_RE.test(email) || email.length > 200)
    return NextResponse.json({ error: "Invalid email" }, { status: 422 });
  if (message.length < 10 || message.length > 5000)
    return NextResponse.json({ error: "Invalid message" }, { status: 422 });

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    return NextResponse.json({ error: "Contact form not configured" }, { status: 503 });
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.emails.send({
    from: process.env.CONTACT_FROM_EMAIL || "Portfolio <onboarding@resend.dev>",
    to,
    replyTo: email,
    subject: `Portfolio enquiry from ${name}`,
    text: `${message}\n\n— ${name} <${email}>`,
    html: `<p>${escape(message).replace(/\n/g, "<br/>")}</p><hr/><p>${escape(name)} &lt;${escape(email)}&gt;</p>`,
  });

  if (error) {
    console.error("[contact] resend error", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
