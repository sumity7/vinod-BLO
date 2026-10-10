import { NextResponse } from "next/server";
import { ADMIN_COOKIE, adminEnabled, checkPassword, makeSession } from "@/lib/adminAuth";
import { makeLimiter } from "@/lib/rateLimit";

export const runtime = "nodejs";

const limited = makeLimiter(15 * 60 * 1000, 10);

export async function POST(request: Request) {
  if (!adminEnabled()) return NextResponse.json({ error: "not_configured" }, { status: 503 });
  if (limited(request)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  let password = "";
  try {
    const body = await request.json();
    password = typeof body.password === "string" ? body.password : "";
  } catch {
    /* empty body */
  }
  if (!checkPassword(password)) return NextResponse.json({ error: "wrong" }, { status: 401 });
  const s = makeSession();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, s.value, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: s.maxAge,
  });
  return res;
}

export async function DELETE() {
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE, "", { httpOnly: true, path: "/", maxAge: 0 });
  return res;
}
