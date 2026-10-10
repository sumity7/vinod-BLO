import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/adminAuth";
import { getStore, isStatus, normaliseTicket } from "@/lib/complaints";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Every complaint, newest first, for the office dashboard. */
export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  const db = getStore();
  try {
    return NextResponse.json({ ok: true, durable: db.durable, complaints: await db.list() });
  } catch (e) {
    console.error("[e-shikayat] list failed:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}

/** Change a complaint's status and/or the reply the citizen sees. */
export async function PATCH(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  const id = normaliseTicket(typeof body.id === "string" ? body.id : "");
  const reply = typeof body.reply === "string" ? body.reply.slice(0, 2000) : undefined;
  if (!isStatus(body.status)) return NextResponse.json({ error: "invalid" }, { status: 400 });
  const status = body.status;
  const db = getStore();
  try {
    const current = await db.get(id);
    if (!current) return NextResponse.json({ error: "not_found" }, { status: 404 });
    const now = new Date().toISOString();
    const history =
      current.status !== status || (reply !== undefined && reply.trim() !== current.reply.trim())
        ? [...current.history, { at: now, status, ...(reply?.trim() ? { note: reply.trim() } : {}) }]
        : current.history;
    const updated = await db.update(id, {
      status,
      ...(reply !== undefined ? { reply: reply.trim() } : {}),
      history,
      updated_at: now,
    });
    return NextResponse.json({ ok: true, complaint: updated });
  } catch (e) {
    console.error("[e-shikayat] update failed:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "server" }, { status: 500 });
  }
}
