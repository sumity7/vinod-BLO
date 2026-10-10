import { NextResponse } from "next/server";
import { systemPrompt } from "@/lib/assistant";
import { isLang, type Lang } from "@/lib/i18n";

export const runtime = "nodejs";

/**
 * The website assistant. It answers questions about Vinod Kumar Upadhyay's work from the site's
 * own content (see lib/assistant.ts) through Groq's OpenAI-compatible API. It needs GROQ_API_KEY;
 * without one the route answers 503 and the chat window says the assistant is unavailable, and the
 * rest of the site is unaffected.
 */

const MODEL = process.env.GROQ_MODEL?.trim() || "openai/gpt-oss-120b";
const MAX_MESSAGES = 12;
const MAX_CHARS = 600;

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 20;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  return recent.length > MAX_PER_WINDOW;
}

type Turn = { role: "user" | "assistant"; content: string };

function parseTurns(value: unknown): Turn[] | null {
  if (!Array.isArray(value) || value.length === 0 || value.length > MAX_MESSAGES) return null;
  const turns: Turn[] = [];
  for (const item of value) {
    if (typeof item !== "object" || item === null) return null;
    const { role, content } = item as Record<string, unknown>;
    if ((role !== "user" && role !== "assistant") || typeof content !== "string") return null;
    const text = content.trim();
    if (!text || text.length > MAX_CHARS) return null;
    turns.push({ role, content: text });
  }
  return turns[0].role === "user" && turns[turns.length - 1].role === "user" ? turns : null;
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const turns = parseTurns(body.messages);
  const lang: Lang = typeof body.lang === "string" && isLang(body.lang) ? body.lang : "hi";
  if (!turns) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const key = process.env.GROQ_API_KEY?.trim();
  if (!key) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: 1200,
        temperature: 0.3,
        // Short chat answers do not need long reasoning; low effort keeps replies fast.
        reasoning_effort: "low",
        messages: [{ role: "system", content: systemPrompt(lang) }, ...turns],
      }),
      signal: AbortSignal.timeout(25_000),
    });

    if (!res.ok) {
      // Log the reason for the site owner; never send details back to the visitor.
      const detail = await res.text().catch(() => "");
      console.error(`[assistant] Groq ${res.status}:`, detail.slice(0, 300));
      // In development the response carries Groq's message so a bad key or setup is easy to see.
      const dev = process.env.NODE_ENV !== "production" ? { upstream: res.status, detail: detail.slice(0, 500) } : {};
      if (res.status === 429) return NextResponse.json({ error: "busy", ...dev }, { status: 503 });
      if (res.status === 401 || res.status === 403) {
        return NextResponse.json({ error: "not_configured", ...dev }, { status: 503 });
      }
      return NextResponse.json({ error: "failed", ...dev }, { status: 502 });
    }

    const data = (await res.json()) as { choices?: { message?: { content?: string } }[] };
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) return NextResponse.json({ error: "empty" }, { status: 502 });
    return NextResponse.json({ reply });
  } catch (error) {
    console.error("[assistant] request failed:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "failed" }, { status: 502 });
  }
}
