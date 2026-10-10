import { NextResponse } from "next/server";
import { createComplaint, validateComplaint, type NewComplaint } from "@/lib/complaints";
import { complaintCategories, type ComplaintCategory } from "@/content/portal";
import { sendComplaintMail } from "@/lib/mail";
import { makeLimiter } from "@/lib/rateLimit";

export const runtime = "nodejs";

const limited = makeLimiter(60 * 60 * 1000, 8);

/** Registers a complaint and returns its ticket number. */
export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }
  // Honeypot: hidden from people, filled in by bots. Pretend success.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true, ticket: "HRH-0000-0000" });
  }
  const str = (v: unknown) => (typeof v === "string" ? v : "");
  const category = str(body.category) as ComplaintCategory;
  const input: NewComplaint & { consent: boolean } = {
    name: str(body.name),
    mobile: str(body.mobile),
    village: str(body.village),
    category: complaintCategories.includes(category) ? category : ("" as ComplaintCategory),
    subject: str(body.subject),
    details: str(body.details),
    lang: str(body.lang) === "en" ? "en" : "hi",
    consent: body.consent === true,
  };
  const errors = validateComplaint(input);
  if (Object.keys(errors).length > 0) return NextResponse.json({ error: "invalid", fields: errors }, { status: 400 });
  if (limited(request)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  try {
    const complaint = await createComplaint(input);
    // Tell the office by email when mail is set up; a failure here never loses the complaint.
    sendComplaintMail(complaint).catch((e) => console.error("[e-shikayat] mail failed:", e instanceof Error ? e.message : e));
    return NextResponse.json({ ok: true, ticket: complaint.id });
  } catch (e) {
    console.error("[e-shikayat] save failed:", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "save_failed" }, { status: 500 });
  }
}
