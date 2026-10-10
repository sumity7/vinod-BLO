"use client";

import { useEffect, useState } from "react";
import { Loader2, Search } from "lucide-react";
import type { PortalText } from "@/content/portal";
import { readTickets, type MyTicket } from "./myTickets";

type PublicComplaint = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  village: string;
  category: string;
  subject: string;
  status: "received" | "progress" | "resolved" | "rejected";
  reply: string;
  history: { at: string; status: PublicComplaint["status"]; note?: string }[];
};

const order: PublicComplaint["status"][] = ["received", "progress", "resolved"];

export function TrackForm({
  lang,
  t,
  statuses,
  categories,
}: {
  lang: string;
  t: PortalText["track"];
  statuses: Record<string, string>;
  categories: Record<string, string>;
}) {
  const [ticket, setTicket] = useState("");
  const [last4, setLast4] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "notfound" | "error">("idle");
  const [result, setResult] = useState<PublicComplaint | null>(null);
  const [mine, setMine] = useState<MyTicket[]>([]);

  const fmt = (iso: string) =>
    new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));

  const check = async (tk = ticket, l4 = last4) => {
    setState("loading");
    setResult(null);
    try {
      const res = await fetch("/api/complaints/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ticket: tk, last4: l4 }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.complaint) {
        setResult(data.complaint);
        setState("idle");
      } else setState(res.status === 404 ? "notfound" : "error");
    } catch {
      setState("error");
    }
  };

  useEffect(() => {
    const list = readTickets();
    setMine(list);
    const fromUrl = new URLSearchParams(window.location.search).get("ticket")?.toUpperCase() ?? "";
    if (fromUrl) {
      setTicket(fromUrl);
      const known = list.find((m) => m.ticket === fromUrl);
      if (known) {
        setLast4(known.last4);
        check(fromUrl, known.last4);
      }
    }
    // Run once on load.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const step = result ? (result.status === "rejected" ? -1 : order.indexOf(result.status)) : 0;

  return (
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <form
          className="card space-y-5 p-6"
          onSubmit={(e) => {
            e.preventDefault();
            check();
          }}
        >
          <div>
            <label htmlFor="tr-ticket" className="field-label">{t.ticket}</label>
            <input
              id="tr-ticket"
              className="field font-mono uppercase tracking-wider"
              placeholder={t.ticketPlaceholder}
              autoCapitalize="characters"
              value={ticket}
              maxLength={14}
              onChange={(e) => setTicket(e.target.value.toUpperCase())}
              required
            />
          </div>
          <div>
            <label htmlFor="tr-last4" className="field-label">{t.last4}</label>
            <input
              id="tr-last4"
              className="field tracking-[0.3em]"
              inputMode="numeric"
              maxLength={4}
              value={last4}
              onChange={(e) => setLast4(e.target.value.replace(/\D/g, ""))}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={state === "loading"}>
            {state === "loading" ? <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" /> : <Search aria-hidden="true" className="h-4 w-4" />}
            {state === "loading" ? t.checking : t.submit}
          </button>
          <p role="status" aria-live="polite" className="text-sindoor empty:hidden">
            {state === "notfound" ? t.notFound : state === "error" ? t.notFound : ""}
          </p>
        </form>

        {mine.length > 0 && (
          <div className="mt-6">
            <p className="text-sm font-semibold text-muted">{t.mine}</p>
            <ul className="mt-2 divide-y divide-line rounded-card border border-line bg-white">
              {mine.map((m) => (
                <li key={m.ticket}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-sand"
                    onClick={() => {
                      setTicket(m.ticket);
                      setLast4(m.last4);
                      check(m.ticket, m.last4);
                    }}
                  >
                    <span className="min-w-0">
                      <span className="block font-mono text-sm font-semibold text-ganga">{m.ticket}</span>
                      <span className="block truncate text-sm text-ink-2">{m.subject}</span>
                    </span>
                    <Search aria-hidden="true" className="h-4 w-4 shrink-0 text-muted" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="lg:col-span-7" aria-live="polite">
        {result && (
          <article className="card p-6 sm:p-8">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="font-mono text-sm font-semibold text-ganga">{result.id}</p>
                <h2 className="h-card mt-1 text-xl">{result.subject}</h2>
                <p className="mt-1 text-sm text-muted">
                  {categories[result.category] ?? result.category} · {result.village}
                </p>
              </div>
              <span className={`status status-${result.status}`}>{statuses[result.status]}</span>
            </div>

            {result.status !== "rejected" && (
              <ol className="mt-8 grid grid-cols-3 gap-2" aria-label={t.history}>
                {order.map((s, i) => (
                  <li key={s} className="text-center">
                    <span
                      className={`mx-auto grid h-9 w-9 place-items-center rounded-full text-sm font-bold ${
                        i <= step ? "bg-saffron-deep text-white" : "bg-sand-deep text-muted"
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span className={`mt-2 block text-sm ${i <= step ? "font-semibold text-ink" : "text-muted"}`}>{statuses[s]}</span>
                  </li>
                ))}
              </ol>
            )}

            <dl className="mt-8 grid gap-4 border-t border-line pt-6 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-muted">{t.registered}</dt>
                <dd className="font-medium">{fmt(result.created_at)}</dd>
              </div>
              <div>
                <dt className="text-muted">{t.updated}</dt>
                <dd className="font-medium">{fmt(result.updated_at)}</dd>
              </div>
            </dl>

            <div className="mt-6 rounded-soft bg-sand p-5">
              <p className="text-sm font-semibold text-muted">{t.reply}</p>
              <p className="mt-1 whitespace-pre-line leading-relaxed">{result.reply || t.noReply}</p>
            </div>

            {result.history.length > 1 && (
              <div className="mt-6">
                <p className="text-sm font-semibold text-muted">{t.history}</p>
                <ol className="mt-3 space-y-3 border-l-2 border-line pl-5">
                  {[...result.history].reverse().map((h, i) => (
                    <li key={i} className="relative">
                      <span aria-hidden="true" className="absolute -left-[1.6rem] top-1.5 h-3 w-3 rounded-full bg-saffron" />
                      <span className="font-semibold">{statuses[h.status]}</span>{" "}
                      <span className="text-sm text-muted">{fmt(h.at)}</span>
                      {h.note && <p className="mt-0.5 text-sm text-ink-2">{h.note}</p>}
                    </li>
                  ))}
                </ol>
              </div>
            )}
          </article>
        )}
      </div>
    </div>
  );
}
