import type { Metadata } from "next";
import { AdminDashboard } from "@/components/shikayat/AdminDashboard";
import { pt } from "@/content/portal";
import { adminEnabled } from "@/lib/adminAuth";
import { getLang, type LangParams } from "@/lib/page";

export const metadata: Metadata = { title: "Office dashboard", robots: { index: false, follow: false } };
export const dynamic = "force-dynamic";

export default async function AdminPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = pt(lang);
  return (
    <section className="section">
      <div className="shell">
        <AdminDashboard lang={lang} t={t.admin} statuses={t.statuses} categories={t.categories} enabled={adminEnabled()} />
      </div>
    </section>
  );
}
