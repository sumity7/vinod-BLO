import { NextResponse } from "next/server";
import { getStore, normaliseTicket, toPublic } from "@/lib/complaints";
import { makeLimiter } from "@/lib/rateLimit";

export const runtime = "nodejs";

const limited = makeLimiter(10 * 60 * 1000, 30);

/**
 * Returns the status of one complaint. Both the ticket number and the last four digits of the
 * mobile number must match, so a guessed ticket number shows nothing.
 */
export async function POST(request: Request) {
  if (limited(request)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const ticket = normaliseTicket(typeof body.ticket === "string" ? body.ticket : "");
  const last4 = (typeof body.last4 === "string" ? body.last4 : "").replace(/\D/g, "");
  if (!/^HRH-\d{4}-[A-Z0-9]{4}$/.test(ticket) || last4.length !== 4) {
    return NextResponse.json({ error: "not_found" }, { status: 404 });
  }
  try {
    const c = await getStore().get(ticket);
    if (!c || !c.mobile.endsWith(last4)) return NextResponse.json({ error: "not_found" }, { status: 404 });
    return NextResponse.json({ ok: true, complaint: toPublic(c) });
  } catch (e) {
    console.error("[e-shikayat] track failed:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
