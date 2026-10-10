"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, Loader2, LogOut, Phone, RefreshCw } from "lucide-react";
import type { PortalText } from "@/content/portal";

type Status = "received" | "progress" | "resolved" | "rejected";
type Complaint = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  mobile: string;
  village: string;
  category: string;
  subject: string;
  details: string;
  status: Status;
  reply: string;
};

export function AdminDashboard({
  lang,
  t,
  statuses,
  categories,
  enabled,
}: {
  lang: string;
  t: PortalText["admin"];
  statuses: Record<Status, string>;
  categories: Record<string, string>;
  enabled: boolean;
}) {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [rows, setRows] = useState<Complaint[]>([]);
  const [durable, setDurable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [q, setQ] = useState("");
  const [open, setOpen] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/complaints", { cache: "no-store" });
    if (res.status === 401) {
      setAuthed(false);
      setLoading(false);
      return;
    }
    const data = await res.json().catch(() => ({}));
    setRows(data.complaints ?? []);
    setDurable(data.durable !== false);
    setAuthed(true);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (enabled) load();
    else setAuthed(false);
  }, [enabled, load]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length };
    for (const r of rows) c[r.status] = (c[r.status] ?? 0) + 1;
    return c;
  }, [rows]);

  const visible = rows.filter((r) => {
    if (filter !== "all" && r.status !== filter) return false;
    if (!q.trim()) return true;
    const s = q.trim().toLowerCase();
    return [r.id, r.name, r.village, r.subject, r.mobile].some((v) => v.toLowerCase().includes(s));
  });

  const fmt = (iso: string) =>
    new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));

  if (!enabled) {
    return <p className="rounded-card bg-[#fff4e0] p-5 text-[#9a5b00]">{t.notSet}</p>;
  }

  if (authed === null) {
    return <Loader2 aria-hidden="true" className="h-6 w-6 animate-spin text-muted" />;
  }

  if (!authed) {
    return (
      <form
        className="card max-w-sm space-y-4 p-6"
        onSubmit={async (e) => {
          e.preventDefault();
          setLoginError("");
          const res = await fetch("/api/admin/session", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
          });
          if (res.ok) {
            setPassword("");
            load();
          } else setLoginError(t.wrong);
        }}
      >
        <div>
          <label htmlFor="ad-pass" className="field-label">{t.password}</label>
          <input id="ad-pass" type="password" className="field" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        {loginError && <p role="alert" className="field-error">{loginError}</p>}
        <button type="submit" className="btn btn-primary w-full">{t.login}</button>
      </form>
    );
  }

  return (
    <div>
      {!durable && (
        <p className="mb-6 flex gap-3 rounded-card bg-[#fff4e0] p-4 text-sm text-[#9a5b00]">
          <AlertTriangle aria-hidden="true" className="h-5 w-5 shrink-0" />
          {t.demo}
        </p>
      )}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div role="group" className="flex flex-wrap gap-2">
          {(["all", "received", "progress", "resolved", "rejected"] as const).map((s) => (
            <button key={s} type="button" className="chip" aria-pressed={filter === s} onClick={() => setFilter(s)}>
              {s === "all" ? t.all : statuses[s]} <span className="text-sm text-muted">{counts[s] ?? 0}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn btn-ghost btn-sm" onClick={load} aria-label="Refresh">
            <RefreshCw aria-hidden="true" className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
          </button>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            onClick={async () => {
              await fetch("/api/admin/session", { method: "DELETE" });
              setAuthed(false);
              setRows([]);
            }}
          >
            <LogOut aria-hidden="true" className="h-4 w-4" />
            {t.logout}
          </button>
        </div>
      </div>
      <input className="field mt-4" type="search" placeholder={t.search} value={q} onChange={(e) => setQ(e.target.value)} aria-label={t.search} />

      {visible.length === 0 ? (
        <p className="mt-8 text-muted">{t.empty}</p>
      ) : (
        <ul className="mt-6 space-y-3">
          {visible.map((r) => (
            <li key={r.id} className="card">
              <button
                type="button"
                className="flex w-full flex-wrap items-center justify-between gap-3 p-4 text-left"
                aria-expanded={open === r.id}
                onClick={() => setOpen(open === r.id ? null : r.id)}
              >
                <span className="min-w-0">
                  <span className="font-mono text-sm font-semibold text-ganga">{r.id}</span>
                  <span className="ml-2 text-sm text-muted">{fmt(r.created_at)}</span>
                  <span className="mt-1 block font-semibold">{r.subject}</span>
                  <span className="block text-sm text-ink-2">
                    {r.name} · {r.village} · {categories[r.category] ?? r.category}
                  </span>
                </span>
                <span className={`status status-${r.status}`}>{statuses[r.status]}</span>
              </button>
              {open === r.id && <Editor row={r} t={t} statuses={statuses} onSaved={(c) => setRows((p) => p.map((x) => (x.id === c.id ? { ...x, ...c } : x)))} />}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function Editor({
  row,
  t,
  statuses,
  onSaved,
}: {
  row: Complaint;
  t: PortalText["admin"];
  statuses: Record<Status, string>;
  onSaved: (c: Complaint) => void;
}) {
  const [status, setStatus] = useState<Status>(row.status);
  const [reply, setReply] = useState(row.reply);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  return (
    <div className="border-t border-line p-4">
      <p className="whitespace-pre-line leading-relaxed text-ink-2">{row.details}</p>
      <a href={`tel:+91${row.mobile}`} className="link-arrow mt-3">
        <Phone aria-hidden="true" className="h-4 w-4" />+91 {row.mobile}
      </a>
      <div className="mt-4 grid gap-4 sm:grid-cols-[14rem_1fr]">
        <div>
          <label htmlFor={`st-${row.id}`} className="field-label">Status</label>
          <select id={`st-${row.id}`} className="field" value={status} onChange={(e) => setStatus(e.target.value as Status)}>
            {(Object.keys(statuses) as Status[]).map((s) => (
              <option key={s} value={s}>{statuses[s]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`rp-${row.id}`} className="field-label">{t.replyLabel}</label>
          <textarea id={`rp-${row.id}`} className="field !min-h-24" value={reply} onChange={(e) => setReply(e.target.value)} />
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary btn-sm mt-4"
        disabled={saving}
        onClick={async () => {
          setSaving(true);
          setSaved(false);
          const res = await fetch("/api/admin/complaints", {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: row.id, status, reply }),
          });
          const data = await res.json().catch(() => ({}));
          setSaving(false);
          if (res.ok && data.complaint) {
            onSaved(data.complaint);
            setSaved(true);
          }
        }}
      >
        {saving && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
        {saved ? t.saved : t.save}
      </button>
    </div>
  );
}
