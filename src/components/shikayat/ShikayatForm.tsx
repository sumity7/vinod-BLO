"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { CheckCircle2, Copy, Loader2, MessageCircle, Search } from "lucide-react";
import type { ComplaintCategory, PortalText } from "@/content/portal";
import { saveTicket } from "./myTickets";

type Fields = {
  name: string;
  mobile: string;
  village: string;
  category: ComplaintCategory | "";
  subject: string;
  details: string;
  consent: boolean;
  website: string;
};
type Errors = Partial<Record<keyof Fields, true>>;

const empty: Fields = { name: "", mobile: "", village: "", category: "", subject: "", details: "", consent: false, website: "" };

const digits = (v: string) => v.replace(/\D/g, "");
const mobileOk = (v: string) => {
  let d = digits(v);
  if (d.length === 12 && d.startsWith("91")) d = d.slice(2);
  if (d.length === 11 && d.startsWith("0")) d = d.slice(1);
  return /^[6-9]\d{9}$/.test(d);
};

function validate(f: Fields): Errors {
  const e: Errors = {};
  if (f.name.trim().length < 2) e.name = true;
  if (!mobileOk(f.mobile)) e.mobile = true;
  if (f.village.trim().length < 2) e.village = true;
  if (!f.category) e.category = true;
  if (f.subject.trim().length < 5) e.subject = true;
  if (f.details.trim().length < 15) e.details = true;
  if (!f.consent) e.consent = true;
  return e;
}

export function ShikayatForm({
  lang,
  t,
  categories,
  trackHref,
}: {
  lang: string;
  t: PortalText["shikayat"];
  categories: { id: ComplaintCategory; label: string }[];
  trackHref: string;
}) {
  const [f, setF] = useState<Fields>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [state, setState] = useState<"idle" | "sending" | "done">("idle");
  const [serverError, setServerError] = useState("");
  const [ticket, setTicket] = useState("");
  const [copied, setCopied] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const doneRef = useRef<HTMLDivElement>(null);

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setF((p) => ({ ...p, [k]: v }));
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(f);
    setErrors(errs);
    setServerError("");
    if (Object.keys(errs).length) {
      const first = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true'], [data-invalid='true'] input");
      first?.focus();
      return;
    }
    setState("sending");
    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...f, lang }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ticket) {
        setServerError(res.status === 429 ? t.form.errors.rate : t.form.errors.server);
        setState("idle");
        return;
      }
      setTicket(data.ticket);
      saveTicket({ ticket: data.ticket, last4: digits(f.mobile).slice(-4), subject: f.subject.trim(), at: new Date().toISOString() });
      setState("done");
      requestAnimationFrame(() => doneRef.current?.focus());
    } catch {
      setServerError(t.form.errors.server);
      setState("idle");
    }
  };

  if (state === "done") {
    const url = `${window.location.origin}${trackHref}?ticket=${encodeURIComponent(ticket)}`;
    const share = t.success.shareText.replace("{ticket}", ticket).replace("{url}", url);
    return (
      <div ref={doneRef} tabIndex={-1} className="rounded-panel border border-green/30 bg-[#f1faf4] p-6 outline-none sm:p-10">
        <CheckCircle2 aria-hidden="true" className="h-10 w-10 text-green" />
        <h2 className="h-section mt-4">{t.success.title}</h2>
        <p className="mt-6 text-sm font-semibold text-muted">{t.success.ticket}</p>
        <p className="mt-1 select-all font-mono text-[clamp(1.9rem,1.4rem+2vw,2.8rem)] font-bold tracking-wider text-ganga">{ticket}</p>
        <p className="mt-4 max-w-xl leading-relaxed text-ink-2">{t.success.keep}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href={`https://wa.me/?text=${encodeURIComponent(share)}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
            <MessageCircle aria-hidden="true" className="h-4 w-4" />
            {t.success.whatsapp}
          </a>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(ticket);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              } catch {
                /* Clipboard blocked: the number is selectable on screen. */
              }
            }}
          >
            <Copy aria-hidden="true" className="h-4 w-4" />
            <span aria-live="polite">{copied ? t.success.copied : t.success.copy}</span>
          </button>
          <Link href={`${trackHref}?ticket=${encodeURIComponent(ticket)}`} className="btn btn-ghost">
            <Search aria-hidden="true" className="h-4 w-4" />
            {t.success.track}
          </Link>
        </div>
        <button
          type="button"
          className="link-arrow mt-8"
          onClick={() => {
            setF(empty);
            setTicket("");
            setState("idle");
          }}
        >
          {t.success.another}
        </button>
      </div>
    );
  }

  const err = (k: keyof Fields) => (errors[k] ? (t.form.errors as Record<string, string>)[k] : "");
  const fieldProps = (k: keyof Fields) => ({
    "aria-invalid": errors[k] ? true : undefined,
    "aria-describedby": errors[k] ? `err-${k}` : undefined,
  });

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="space-y-6">
      {/* Honeypot: hidden from people and from screen readers. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label>
          Website
          <input tabIndex={-1} autoComplete="off" value={f.website} onChange={(e) => set("website", e.target.value)} />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="sk-name" className="field-label">
            {t.form.name} <span className="text-sindoor">*</span>
          </label>
          <input id="sk-name" className="field" autoComplete="name" maxLength={100} value={f.name} onChange={(e) => set("name", e.target.value)} {...fieldProps("name")} />
          {errors.name && <p id="err-name" className="field-error">{err("name")}</p>}
        </div>
        <div>
          <label htmlFor="sk-mobile" className="field-label">
            {t.form.mobile} <span className="text-sindoor">*</span>
          </label>
          <input
            id="sk-mobile"
            className="field"
            inputMode="numeric"
            autoComplete="tel"
            maxLength={14}
            value={f.mobile}
            onChange={(e) => set("mobile", e.target.value)}
            {...fieldProps("mobile")}
            aria-describedby={errors.mobile ? "err-mobile" : "hint-mobile"}
          />
          {errors.mobile ? (
            <p id="err-mobile" className="field-error">{err("mobile")}</p>
          ) : (
            <p id="hint-mobile" className="mt-1.5 text-sm text-muted">{t.form.mobileHint}</p>
          )}
        </div>
      </div>

      <div>
        <label htmlFor="sk-village" className="field-label">
          {t.form.village} <span className="text-sindoor">*</span>
        </label>
        <input id="sk-village" className="field" maxLength={120} value={f.village} onChange={(e) => set("village", e.target.value)} {...fieldProps("village")} />
        {errors.village && <p id="err-village" className="field-error">{err("village")}</p>}
      </div>

      <fieldset data-invalid={errors.category ? "true" : undefined} aria-describedby={errors.category ? "err-category" : undefined}>
        <legend className="field-label">
          {t.form.category} <span className="text-sindoor">*</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <label key={c.id} className="chip relative">
              <input type="radio" name="category" value={c.id} checked={f.category === c.id} onChange={() => set("category", c.id)} />
              {c.label}
            </label>
          ))}
        </div>
        {errors.category && <p id="err-category" className="field-error">{err("category")}</p>}
      </fieldset>

      <div>
        <label htmlFor="sk-subject" className="field-label">
          {t.form.subject} <span className="text-sindoor">*</span>
        </label>
        <input
          id="sk-subject"
          className="field"
          maxLength={150}
          placeholder={t.form.subjectPlaceholder}
          value={f.subject}
          onChange={(e) => set("subject", e.target.value)}
          {...fieldProps("subject")}
        />
        {errors.subject && <p id="err-subject" className="field-error">{err("subject")}</p>}
      </div>

      <div>
        <label htmlFor="sk-details" className="field-label">
          {t.form.details} <span className="text-sindoor">*</span>
        </label>
        <textarea
          id="sk-details"
          className="field"
          maxLength={4000}
          rows={6}
          placeholder={t.form.detailsPlaceholder}
          value={f.details}
          onChange={(e) => set("details", e.target.value)}
          {...fieldProps("details")}
        />
        {errors.details && <p id="err-details" className="field-error">{err("details")}</p>}
      </div>

      <div>
        <label className="flex cursor-pointer items-start gap-3 text-[0.95rem] leading-relaxed text-ink-2">
          <input
            type="checkbox"
            className="mt-1.5 h-5 w-5 shrink-0 accent-[var(--saffron-deep)]"
            checked={f.consent}
            onChange={(e) => set("consent", e.target.checked)}
            {...fieldProps("consent")}
          />
          {t.form.consent}
        </label>
        {errors.consent && <p id="err-consent" className="field-error">{err("consent")}</p>}
      </div>

      {serverError && (
        <p role="alert" className="rounded-soft bg-[#f6e3e1] px-4 py-3 text-sindoor">
          {serverError}
        </p>
      )}

      <button type="submit" className="btn btn-primary w-full sm:w-auto" disabled={state === "sending"}>
        {state === "sending" && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
        {state === "sending" ? t.form.sending : t.form.submit}
      </button>
    </form>
  );
}
