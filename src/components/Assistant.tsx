"use client";

import { useEffect, useRef, useState } from "react";
import { MessageSquareText, Send, X } from "lucide-react";
import type { Lang } from "@/lib/i18n";

type Turn = { role: "user" | "assistant"; content: string };

const copy = {
  en: {
    open: "Ask assistant",
    title: "Ask about Vinod Kumar Upadhyay",
    intro:
      "Ask me about his work, journey, responsibilities, events and vision. I answer only from the information on this website.",
    placeholder: "Type your question…",
    send: "Send",
    close: "Close",
    thinking: "Thinking…",
    suggestions: [
      "What is his political journey?",
      "What responsibilities does he hold?",
      "What events were held recently?",
      "What is his vision for Harhua and Shivpur?",
    ],
    errors: {
      not_configured: "The assistant is not available right now. Please use the Contact page.",
      rate_limited: "Too many questions in a short time. Please try again in a few minutes.",
      busy: "The assistant is busy right now. Please try again shortly.",
      declined: "I can’t help with that question. Please use the Contact page.",
      failed: "Something went wrong. Please try again, or use the Contact page.",
    },
  },
  hi: {
    open: "असिस्टेंट से पूछें",
    title: "विनोद कुमार उपाध्याय के बारे में पूछें",
    intro:
      "उनके कार्य, यात्रा, दायित्व, कार्यक्रम और दृष्टि के बारे में पूछिए। मैं केवल इस वेबसाइट की जानकारी के आधार पर उत्तर देता हूँ।",
    placeholder: "अपना प्रश्न लिखें…",
    send: "भेजें",
    close: "बंद करें",
    thinking: "सोच रहा हूँ…",
    suggestions: [
      "उनकी राजनीतिक यात्रा क्या है?",
      "उनके पास कौन-कौन से दायित्व हैं?",
      "हाल में कौन-से कार्यक्रम हुए?",
      "हरहुआ और शिवपुर के लिए उनकी दृष्टि क्या है?",
    ],
    errors: {
      not_configured: "असिस्टेंट अभी उपलब्ध नहीं है। कृपया संपर्क पृष्ठ का उपयोग करें।",
      rate_limited: "थोड़े समय में बहुत अधिक प्रश्न हो गए। कृपया कुछ मिनट बाद प्रयास करें।",
      busy: "असिस्टेंट अभी व्यस्त है। कृपया थोड़ी देर बाद प्रयास करें।",
      declined: "मैं इस प्रश्न में सहायता नहीं कर सकता। कृपया संपर्क पृष्ठ का उपयोग करें।",
      failed: "कुछ गड़बड़ हो गई। कृपया दोबारा प्रयास करें, या संपर्क पृष्ठ का उपयोग करें।",
    },
  },
} as const;

/**
 * Floating chat for visitors. Questions go to /api/assistant, which answers only from the site's
 * own content. The conversation is kept in memory for the visit and is not stored.
 */
export function Assistant({ lang }: { lang: Lang }) {
  const t = copy[lang];
  const [open, setOpen] = useState(false);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [turns, busy, error]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  async function ask(question: string) {
    const q = question.trim();
    if (!q || busy) return;
    const next: Turn[] = [...turns, { role: "user", content: q }];
    setTurns(next);
    setText("");
    setError(null);
    setBusy(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-10), lang }),
      });
      const data: { reply?: string; error?: string } = await res.json().catch(() => ({}));
      if (data.reply) {
        setTurns([...next, { role: "assistant", content: data.reply }]);
      } else {
        const key = (data.error && data.error in t.errors ? data.error : "failed") as keyof typeof t.errors;
        setError(t.errors[key]);
      }
    } catch {
      setError(t.errors.failed);
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {open && (
        <section
          role="dialog"
          aria-label={t.title}
          className="drawer-in fixed bottom-[5.5rem] right-3 z-[60] flex h-[min(34rem,calc(100dvh-9rem))] w-[min(24rem,calc(100vw-1.5rem))] flex-col overflow-hidden rounded-card border border-line bg-white shadow-[0_12px_40px_-8px_rgba(0,0,0,0.35)] sm:right-5"
        >
          <header className="flex items-start justify-between gap-3 bg-saffron-deep px-4 py-3 text-white">
            <h2 className="text-[0.95rem] font-semibold leading-snug">{t.title}</h2>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t.close}
              className="grid h-8 w-8 shrink-0 place-items-center hover:bg-black/15"
            >
              <X aria-hidden="true" className="h-5 w-5" />
            </button>
          </header>

          <div className="flex-1 space-y-3 overflow-y-auto bg-sand px-3 py-3 text-[0.925rem]" aria-live="polite">
            <p className="bg-white p-3 leading-relaxed text-ink-2">{t.intro}</p>

            {turns.length === 0 && (
              <ul className="flex flex-wrap gap-2">
                {t.suggestions.map((s) => (
                  <li key={s}>
                    <button
                      type="button"
                      onClick={() => ask(s)}
                      className="rounded-full border border-saffron/60 bg-white px-3 py-1.5 text-left text-[0.85rem] text-saffron-deep transition-colors hover:bg-saffron-deep hover:text-white"
                    >
                      {s}
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {turns.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <p
                  className={`max-w-[88%] whitespace-pre-wrap px-3 py-2 leading-relaxed ${
                    m.role === "user" ? "bg-saffron-deep text-white" : "bg-white text-ink"
                  }`}
                >
                  {m.content}
                </p>
              </div>
            ))}
            {busy && <p className="px-1 text-sm text-muted">{t.thinking}</p>}
            {error && <p className="bg-white p-3 text-sm text-crimson">{error}</p>}
            <div ref={endRef} />
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(text);
            }}
            className="flex gap-2 border-t border-line bg-white p-2"
          >
            <input
              ref={inputRef}
              value={text}
              onChange={(e) => setText(e.target.value)}
              maxLength={500}
              placeholder={t.placeholder}
              aria-label={t.placeholder}
              className="min-w-0 flex-1 border border-line px-3 py-2 text-[0.95rem] outline-none focus:border-saffron"
            />
            <button
              type="submit"
              disabled={busy || !text.trim()}
              aria-label={t.send}
              className="grid h-10 w-10 shrink-0 place-items-center bg-saffron-deep text-white transition-colors hover:bg-burnt disabled:opacity-50"
            >
              <Send aria-hidden="true" className="h-4 w-4" />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={t.open}
        className="fab group fixed bottom-4 right-4 z-[60] inline-flex h-14 w-14 items-center justify-center gap-2.5 rounded-full bg-saffron-deep font-semibold text-white shadow-[0_10px_28px_-8px_rgba(0,0,0,0.55)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-burnt sm:bottom-5 sm:right-5 sm:h-12 sm:w-auto sm:px-5"
      >
        <MessageSquareText
          aria-hidden="true"
          className="h-5 w-5 transition-transform duration-300 group-hover:-rotate-6 group-hover:scale-110"
        />
        <span className="hidden text-[1rem] sm:inline">{t.open}</span>
      </button>
    </>
  );
}
