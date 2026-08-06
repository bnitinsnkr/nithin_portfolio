import { NextResponse } from 'next/server';

import { SITE } from '@/constants/site';
import { contactSchema } from '@/lib/contact-schema';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/* --------------------------- Naive rate limiting --------------------------- */

/**
 * In-memory sliding window, keyed by client IP.
 *
 * Good enough for a single-instance portfolio: it stops a script hammering the
 * form from one address. It does NOT survive a cold start or coordinate across
 * serverless instances — swap in Upstash/Vercel KV if this ever needs to be
 * an actual guarantee.
 */
const WINDOW_MS = 60_000;
const MAX_REQUESTS = 4;
const hits = new Map<string, number[]>();

function isRateLimited(key: string) {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);

  // Keep the map from growing without bound across a long-lived instance.
  if (hits.size > 5_000) hits.clear();

  return recent.length > MAX_REQUESTS;
}

/* ---------------------------------- Route ---------------------------------- */

export async function POST(request: Request) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    request.headers.get('x-real-ip') ??
    'unknown';

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: 'Too many messages in a short window. Please try again in a minute.' },
      { status: 429 },
    );
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Malformed request body.' }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: 'Please check the highlighted fields.',
        issues: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const { name, email, subject, message, company } = parsed.data;

  // Honeypot: respond with a normal 200 so bots get no signal to adapt to.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? SITE.email;
  const from = process.env.CONTACT_FROM_EMAIL ?? 'portfolio@resend.dev';

  // No provider configured (local dev, or before the key is set on Vercel):
  // log it server-side rather than pretending to have delivered nothing.
  if (!apiKey) {
    console.info('[contact] No RESEND_API_KEY configured. Submission received:', {
      name,
      email,
      subject,
      length: message.length,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: `Portfolio <${from}>`,
        to: [to],
        reply_to: email,
        subject: `[Portfolio] ${subject}`,
        text: [
          `Name:    ${name}`,
          `Email:   ${email}`,
          `Subject: ${subject}`,
          '',
          message,
        ].join('\n'),
      }),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => '');
      console.error('[contact] Resend rejected the message:', response.status, detail);
      return NextResponse.json(
        { error: `Delivery failed. Please email ${to} directly.` },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true, delivered: true });
  } catch (error) {
    console.error('[contact] Unexpected delivery error:', error);
    return NextResponse.json(
      { error: `Delivery failed. Please email ${to} directly.` },
      { status: 502 },
    );
  }
}

export function GET() {
  return NextResponse.json({ error: 'Method not allowed.' }, { status: 405 });
}
