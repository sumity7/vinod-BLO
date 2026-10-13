"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { AlertTriangle, Download, Loader2, LogOut, MessageCircle, Phone, RefreshCw } from "lucide-react";
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

const DAY = 86_400_000;
const OVERDUE_DAYS = 7;

const L = {
  en: {
    total: "Total", open: "Open", resolved: "Resolved", rate: "Resolution rate", week: "Last 7 days", overdue: "Overdue",
    byCategory: "By category", topVillages: "Top villages", allCats: "All categories", range: "Period",
    r_all: "All time", r_7: "7 days", r_30: "30 days", sort: "Sort", s_new: "Newest first", s_old: "Oldest first", s_pending: "Oldest open first",
    csv: "Export CSV", whatsapp: "WhatsApp", quick: "Quick reply", showing: "Showing", of: "of", od: "Open for more than 7 days",
    q1: "Your complaint has been received and is being looked into.", q2: "The work has been started. We will update you soon.",
    q3: "Your problem has been resolved. Thank you for letting us know.", q4: "We could not take this up. Please contact the concerned office.",
    ticket: "Ticket",
  },
  hi: {
    total: "कुल", open: "खुली", resolved: "निपटाई गई", rate: "निस्तारण दर", week: "पिछले 7 दिन", overdue: "देरी वाली",
    byCategory: "श्रेणी के अनुसार", topVillages: "सबसे ज़्यादा शिकायत वाले गाँव", allCats: "सभी श्रेणियाँ", range: "अवधि",
    r_all: "सभी", r_7: "7 दिन", r_30: "30 दिन", sort: "क्रम", s_new: "नई पहले", s_old: "पुरानी पहले", s_pending: "पुरानी खुली पहले",
    csv: "CSV डाउनलोड", whatsapp: "व्हाट्सऐप", quick: "त्वरित जवाब", showing: "दिख रही", of: "में से", od: "7 दिन से ज़्यादा खुली",
    q1: "आपकी शिकायत प्राप्त हो गई है और उस पर कार्य हो रहा है।", q2: "कार्य शुरू हो गया है। जल्द ही आपको सूचित किया जाएगा।",
    q3: "आपकी समस्या का समाधान हो गया है। सूचित करने के लिए धन्यवाद।", q4: "इस शिकायत पर कार्रवाई संभव नहीं हो सकी। कृपया संबंधित कार्यालय से संपर्क करें।",
    ticket: "टिकट",
  },
};

const isOpen = (r: Complaint) => r.status === "received" || r.status === "progress";
const isOverdue = (r: Complaint) => isOpen(r) && Date.now() - new Date(r.created_at).getTime() > OVERDUE_DAYS * DAY;

function csvCell(v: string) {
  const s = /^[=+\-@]/.test(v) ? `'${v}` : v;
  return `"${s.replace(/"/g, '""')}"`;
}

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
  const x = lang === "hi" ? L.hi : L.en;
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [rows, setRows] = useState<Complaint[]>([]);
  const [durable, setDurable] = useState(true);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState<Status | "all">("all");
  const [cat, setCat] = useState("all");
  const [range, setRange] = useState<"all" | "7" | "30">("all");
  const [sort, setSort] = useState<"new" | "old" | "pending">("new");
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

  const stats = useMemo(() => {
    const now = Date.now();
    const total = rows.length;
    const resolved = rows.filter((r) => r.status === "resolved").length;
    const openN = rows.filter(isOpen).length;
    const week = rows.filter((r) => now - new Date(r.created_at).getTime() <= 7 * DAY).length;
    const overdue = rows.filter(isOverdue).length;
    const byCat: Record<string, number> = {};
    const byVillage: Record<string, number> = {};
    for (const r of rows) {
      byCat[r.category] = (byCat[r.category] ?? 0) + 1;
      const v = r.village.trim();
      if (v) byVillage[v] = (byVillage[v] ?? 0) + 1;
    }
    const cats = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
    const villages = Object.entries(byVillage).sort((a, b) => b[1] - a[1]).slice(0, 5);
    return { total, resolved, openN, week, overdue, cats, villages, rate: total ? Math.round((resolved / total) * 100) : 0 };
  }, [rows]);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length };
    for (const r of rows) c[r.status] = (c[r.status] ?? 0) + 1;
    return c;
  }, [rows]);

  const visible = useMemo(() => {
    const now = Date.now();
    const s = q.trim().toLowerCase();
    const list = rows.filter((r) => {
      if (filter !== "all" && r.status !== filter) return false;
      if (cat !== "all" && r.category !== cat) return false;
      if (range !== "all" && now - new Date(r.created_at).getTime() > Number(range) * DAY) return false;
      if (!s) return true;
      return [r.id, r.name, r.village, r.subject, r.mobile, r.details].some((v) => v.toLowerCase().includes(s));
    });
    const ts = (r: Complaint) => new Date(r.created_at).getTime();
    if (sort === "new") list.sort((a, b) => ts(b) - ts(a));
    else if (sort === "old") list.sort((a, b) => ts(a) - ts(b));
    else list.sort((a, b) => Number(isOpen(b)) - Number(isOpen(a)) || ts(a) - ts(b));
    return list;
  }, [rows, filter, cat, range, sort, q]);

  const fmt = (iso: string) =>
    new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", { dateStyle: "medium", timeStyle: "short" }).format(new Date(iso));

  const exportCsv = () => {
    const head = ["Ticket", "Date", "Name", "Mobile", "Village", "Category", "Subject", "Details", "Status", "Reply"];
    const lines = [head.map(csvCell).join(",")];
    for (const r of visible) {
      lines.push(
        [r.id, r.created_at, r.name, r.mobile, r.village, categories[r.category] ?? r.category, r.subject, r.details, statuses[r.status], r.reply]
          .map((v) => csvCell(String(v ?? "")))
          .join(","),
      );
    }
    const blob = new Blob(["﻿" + lines.join("\r\n")], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `e-shikayat-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 2000);
  };

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

  const maxCat = Math.max(1, ...stats.cats.map((c) => c[1]));
  const tiles: { label: string; value: string; tone?: string }[] = [
    { label: x.total, value: String(stats.total) },
    { label: x.open, value: String(stats.openN), tone: "text-[#9a5b00]" },
    { label: x.resolved, value: String(stats.resolved), tone: "text-[#138808]" },
    { label: x.rate, value: `${stats.rate}%` },
    { label: x.week, value: String(stats.week) },
    { label: x.overdue, value: String(stats.overdue), tone: stats.overdue ? "text-[#b3261e]" : undefined },
  ];

  return (
    <div>
      {!durable && (
        <p className="mb-6 flex gap-3 rounded-card bg-[#fff4e0] p-4 text-sm text-[#9a5b00]">
          <AlertTriangle aria-hidden="true" className="h-5 w-5 shrink-0" />
          {t.demo}
        </p>
      )}

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {tiles.map((k) => (
          <div key={k.label} className="card p-4">
            <p className={`text-3xl font-bold ${k.tone ?? "text-ink"}`}>{k.value}</p>
            <p className="mt-1 text-sm text-muted">{k.label}</p>
          </div>
        ))}
      </div>

      {stats.total > 0 && (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <div className="card p-5">
            <h2 className="text-base font-semibold">{x.byCategory}</h2>
            <ul className="mt-3 space-y-2">
              {stats.cats.map(([k, n]) => (
                <li key={k}>
                  <div className="flex justify-between text-sm">
                    <span>{categories[k] ?? k}</span>
                    <span className="font-semibold">{n}</span>
                  </div>
                  <div className="mt-1 h-2 rounded-full bg-[#0000000f]">
                    <div className="h-2 rounded-full bg-[#e8630a]" style={{ width: `${(n / maxCat) * 100}%` }} />
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="card p-5">
            <h2 className="text-base font-semibold">{x.topVillages}</h2>
            <ol className="mt-3 space-y-2">
              {stats.villages.map(([v, n], i) => (
                <li key={v} className="flex items-center justify-between text-sm">
                  <span>{i + 1}. {v}</span>
                  <span className="font-semibold">{n}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3">
        <div role="group" className="flex flex-wrap gap-2">
          {(["all", "received", "progress", "resolved", "rejected"] as const).map((s) => (
            <button key={s} type="button" className="chip" aria-pressed={filter === s} onClick={() => setFilter(s)}>
              {s === "all" ? t.all : statuses[s]} <span className="text-sm text-muted">{counts[s] ?? 0}</span>
            </button>
          ))}
        </div>
        <div className="flex gap-2">
          <button type="button" className="btn btn-ghost btn-sm" onClick={exportCsv} disabled={visible.length === 0}>
            <Download aria-hidden="true" className="h-4 w-4" />
            {x.csv}
          </button>
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

      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <input className="field lg:col-span-1" type="search" placeholder={t.search} value={q} onChange={(e) => setQ(e.target.value)} aria-label={t.search} />
        <select className="field" value={cat} onChange={(e) => setCat(e.target.value)} aria-label={x.allCats}>
          <option value="all">{x.allCats}</option>
          {Object.keys(categories).map((k) => (
            <option key={k} value={k}>{categories[k]}</option>
          ))}
        </select>
        <select className="field" value={range} onChange={(e) => setRange(e.target.value as "all" | "7" | "30")} aria-label={x.range}>
          <option value="all">{x.range}: {x.r_all}</option>
          <option value="7">{x.range}: {x.r_7}</option>
          <option value="30">{x.range}: {x.r_30}</option>
        </select>
        <select className="field" value={sort} onChange={(e) => setSort(e.target.value as "new" | "old" | "pending")} aria-label={x.sort}>
          <option value="new">{x.s_new}</option>
          <option value="old">{x.s_old}</option>
          <option value="pending">{x.s_pending}</option>
        </select>
      </div>
      <p className="mt-3 text-sm text-muted">{x.showing} {visible.length} {x.of} {rows.length}</p>

      {visible.length === 0 ? (
        <p className="mt-8 text-muted">{t.empty}</p>
      ) : (
        <ul className="mt-4 space-y-3">
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
                  {isOverdue(r) && (
                    <span title={x.od} className="ml-2 rounded-full bg-[#fde8e6] px-2 py-0.5 text-xs font-semibold text-[#b3261e]">{x.overdue}</span>
                  )}
                  <span className="mt-1 block font-semibold">{r.subject}</span>
                  <span className="block text-sm text-ink-2">
                    {r.name} · {r.village} · {categories[r.category] ?? r.category}
                  </span>
                </span>
                <span className={`status status-${r.status}`}>{statuses[r.status]}</span>
              </button>
              {open === r.id && <Editor row={r} t={t} x={x} statuses={statuses} onSaved={(c) => setRows((p) => p.map((v) => (v.id === c.id ? { ...v, ...c } : v)))} />}
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
  x,
  statuses,
  onSaved,
}: {
  row: Complaint;
  t: PortalText["admin"];
  x: typeof L.en;
  statuses: Record<Status, string>;
  onSaved: (c: Complaint) => void;
}) {
  const [status, setStatus] = useState<Status>(row.status);
  const [reply, setReply] = useState(row.reply);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [failed, setFailed] = useState(false);
  const quick = [x.q1, x.q2, x.q3, x.q4];
  const wa = `https://wa.me/91${row.mobile}?text=${encodeURIComponent(`${x.ticket} ${row.id}\n${reply || ""}`.trim())}`;
  return (
    <div className="border-t border-line p-4">
      <p className="whitespace-pre-line leading-relaxed text-ink-2">{row.details}</p>
      <div className="mt-3 flex flex-wrap gap-4">
        <a href={`tel:+91${row.mobile}`} className="link-arrow">
          <Phone aria-hidden="true" className="h-4 w-4" />+91 {row.mobile}
        </a>
        <a href={wa} target="_blank" rel="noopener noreferrer" className="link-arrow">
          <MessageCircle aria-hidden="true" className="h-4 w-4" />{x.whatsapp}
        </a>
      </div>
      <div className="mt-4 grid gap-4 sm:grid-cols-[14rem_1fr]">
        <div>
          <label htmlFor={`st-${row.id}`} className="field-label">Status</label>
          <select id={`st-${row.id}`} className="field" value={status} onChange={(e) => { setStatus(e.target.value as Status); setSaved(false); }}>
            {(Object.keys(statuses) as Status[]).map((s) => (
              <option key={s} value={s}>{statuses[s]}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor={`rp-${row.id}`} className="field-label">{t.replyLabel}</label>
          <textarea id={`rp-${row.id}`} className="field !min-h-24" value={reply} onChange={(e) => { setReply(e.target.value); setSaved(false); }} />
          <div className="mt-2 flex flex-wrap gap-2" aria-label={x.quick}>
            {quick.map((qr) => (
              <button key={qr} type="button" className="chip text-xs" onClick={() => { setReply(qr); setSaved(false); }}>
                {qr.length > 34 ? qr.slice(0, 32) + "…" : qr}
              </button>
            ))}
          </div>
        </div>
      </div>
      <button
        type="button"
        className="btn btn-primary btn-sm mt-4"
        disabled={saving}
        onClick={async () => {
          setSaving(true);
          setSaved(false);
          setFailed(false);
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
          } else setFailed(true);
        }}
      >
        {saving && <Loader2 aria-hidden="true" className="h-4 w-4 animate-spin" />}
        {saved ? t.saved : t.save}
      </button>
      {failed && <p role="alert" className="field-error mt-2">Could not save. Please try again.</p>}
    </div>
  );
}
