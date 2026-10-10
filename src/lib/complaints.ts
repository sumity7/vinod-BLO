import { randomInt } from "node:crypto";
import { promises as fs } from "node:fs";
import os from "node:os";
import path from "node:path";
import { complaintCategories, complaintStatuses, type ComplaintCategory, type ComplaintStatus } from "@/content/portal";
import { normaliseMobile } from "./contact";

/**
 * e-Shikayat storage.
 *
 * Live: Supabase (Postgres) through its REST API, when SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 * are set. The table is created by the SQL in README.md. The service key is only ever used on the
 * server; visitors never talk to the database directly.
 *
 * Without Supabase the complaints are kept in a JSON file: in the project's .data folder during
 * development, and in the server's temporary folder in production. The production fallback is
 * for demos only (it can be lost when the server restarts), and the dashboard says so.
 */

export type HistoryEntry = { at: string; status: ComplaintStatus; note?: string };

export type Complaint = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  mobile: string;
  village: string;
  category: ComplaintCategory;
  subject: string;
  details: string;
  status: ComplaintStatus;
  reply: string;
  history: HistoryEntry[];
  lang: string;
};

export type NewComplaint = Pick<Complaint, "name" | "mobile" | "village" | "category" | "subject" | "details" | "lang">;

export type ComplaintErrors = Partial<Record<keyof NewComplaint | "consent", true>>;

export function validateComplaint(c: NewComplaint & { consent?: boolean }): ComplaintErrors {
  const e: ComplaintErrors = {};
  if (c.name.trim().length < 2 || c.name.length > 100) e.name = true;
  if (!/^[6-9]\d{9}$/.test(normaliseMobile(c.mobile))) e.mobile = true;
  if (c.village.trim().length < 2 || c.village.length > 120) e.village = true;
  if (!complaintCategories.includes(c.category)) e.category = true;
  if (c.subject.trim().length < 5 || c.subject.length > 150) e.subject = true;
  if (c.details.trim().length < 15 || c.details.length > 4000) e.details = true;
  if (c.consent === false) e.consent = true;
  return e;
}

export const isStatus = (s: unknown): s is ComplaintStatus =>
  typeof s === "string" && (complaintStatuses as string[]).includes(s);

/* ---------------- Ticket numbers ---------------- */

// No 0/O or 1/I/L, so a number read out over the phone cannot be misheard.
const ALPHABET = "23456789ABCDEFGHJKMNPQRSTUVWXYZ";

export function newTicket(now = new Date()) {
  const yymm = `${String(now.getFullYear()).slice(2)}${String(now.getMonth() + 1).padStart(2, "0")}`;
  let code = "";
  for (let i = 0; i < 4; i++) code += ALPHABET[randomInt(ALPHABET.length)];
  return `HRH-${yymm}-${code}`;
}

export const normaliseTicket = (t: string) => t.trim().toUpperCase().replace(/\s+/g, "");

/* ---------------- Stores ---------------- */

interface Store {
  readonly kind: "supabase" | "file";
  readonly durable: boolean;
  insert(c: Complaint): Promise<void>;
  get(id: string): Promise<Complaint | null>;
  list(): Promise<Complaint[]>;
  update(id: string, patch: Partial<Complaint>): Promise<Complaint | null>;
}

function supabaseStore(url: string, key: string): Store {
  const base = `${url.replace(/\/$/, "")}/rest/v1/complaints`;
  const headers = { apikey: key, Authorization: `Bearer ${key}`, "Content-Type": "application/json" };
  const call = async (input: string, init: RequestInit = {}) => {
    const res = await fetch(input, { ...init, headers: { ...headers, ...(init.headers ?? {}) }, cache: "no-store" });
    if (!res.ok) throw new Error(`supabase ${res.status}: ${(await res.text()).slice(0, 200)}`);
    return res;
  };
  return {
    kind: "supabase",
    durable: true,
    async insert(c) {
      await call(base, { method: "POST", body: JSON.stringify(c), headers: { Prefer: "return=minimal" } });
    },
    async get(id) {
      const res = await call(`${base}?id=eq.${encodeURIComponent(id)}&select=*&limit=1`);
      const rows = (await res.json()) as Complaint[];
      return rows[0] ?? null;
    },
    async list() {
      const res = await call(`${base}?select=*&order=created_at.desc&limit=1000`);
      return (await res.json()) as Complaint[];
    },
    async update(id, patch) {
      const res = await call(`${base}?id=eq.${encodeURIComponent(id)}`, {
        method: "PATCH",
        body: JSON.stringify(patch),
        headers: { Prefer: "return=representation" },
      });
      const rows = (await res.json()) as Complaint[];
      return rows[0] ?? null;
    },
  };
}

function fileStore(): Store {
  const dir = process.env.NODE_ENV === "production" ? path.join(os.tmpdir(), "harhua-eshikayat") : path.join(process.cwd(), ".data");
  const file = path.join(dir, "complaints.json");
  let queue: Promise<unknown> = Promise.resolve();
  const read = async (): Promise<Complaint[]> => {
    try {
      return JSON.parse(await fs.readFile(file, "utf8")) as Complaint[];
    } catch {
      return [];
    }
  };
  const write = async (rows: Complaint[]) => {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(file, JSON.stringify(rows, null, 2));
  };
  // Serialise writes so two complaints arriving together cannot overwrite each other.
  const locked = <T,>(fn: () => Promise<T>) => {
    const run = queue.then(fn, fn);
    queue = run.catch(() => undefined);
    return run;
  };
  return {
    kind: "file",
    durable: process.env.NODE_ENV !== "production",
    insert: (c) =>
      locked(async () => {
        const rows = await read();
        rows.unshift(c);
        await write(rows);
      }),
    get: async (id) => (await read()).find((r) => r.id === id) ?? null,
    list: async () => (await read()).sort((a, b) => b.created_at.localeCompare(a.created_at)),
    update: (id, patch) =>
      locked(async () => {
        const rows = await read();
        const i = rows.findIndex((r) => r.id === id);
        if (i < 0) return null;
        rows[i] = { ...rows[i], ...patch };
        await write(rows);
        return rows[i];
      }),
  };
}

let store: Store | null = null;
export function getStore(): Store {
  if (store) return store;
  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
  store = url && key ? supabaseStore(url, key) : fileStore();
  return store;
}

export async function createComplaint(input: NewComplaint): Promise<Complaint> {
  const db = getStore();
  const now = new Date().toISOString();
  let id = newTicket();
  // A clash is very unlikely (31^4 codes a month), but check anyway.
  for (let i = 0; i < 5 && (await db.get(id)); i++) id = newTicket();
  const complaint: Complaint = {
    id,
    created_at: now,
    updated_at: now,
    name: input.name.trim(),
    mobile: normaliseMobile(input.mobile),
    village: input.village.trim(),
    category: input.category,
    subject: input.subject.trim(),
    details: input.details.trim(),
    status: "received",
    reply: "",
    history: [{ at: now, status: "received" }],
    lang: input.lang,
  };
  await db.insert(complaint);
  return complaint;
}

/** What a citizen may see when tracking: no mobile number, no other complainant's data. */
export type PublicComplaint = Pick<
  Complaint,
  "id" | "created_at" | "updated_at" | "village" | "category" | "subject" | "status" | "reply" | "history"
> & { name: string };

export function toPublic(c: Complaint): PublicComplaint {
  const first = c.name.split(/\s+/)[0] ?? "";
  return {
    id: c.id,
    created_at: c.created_at,
    updated_at: c.updated_at,
    name: first,
    village: c.village,
    category: c.category,
    subject: c.subject,
    status: c.status,
    reply: c.reply,
    history: c.history,
  };
}
