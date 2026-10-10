import type { Metadata } from "next";
import Link from "next/link";
import { Info, Search } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ShikayatForm } from "@/components/shikayat/ShikayatForm";
import { complaintCategories, pt } from "@/content/portal";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";
import { localePath } from "@/lib/i18n";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = pt(lang).shikayat;
  return buildMetadata({ lang, path: "/e-shikayat", title: t.seoTitle, description: t.description });
}

export default async function ShikayatPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = pt(lang);
  const categories = complaintCategories.map((id) => ({ id, label: t.categories[id] }));

  return (
    <>
      <PageHero
        lang={lang}
        path="/e-shikayat"
        crumbs={[{ name: t.shikayat.title, path: "/e-shikayat" }]}
        title={t.shikayat.title}
        lead={t.shikayat.lead}
        description={t.shikayat.description}
        visual={
          <ol className="ghat-steps rounded-panel bg-ganga p-7 text-white shadow-soft sm:p-9">
            {t.shikayat.steps.map((s) => (
              <li key={s.t}>
                <p className="font-semibold text-marigold">{s.t}</p>
                <p className="text-white/85">{s.d}</p>
              </li>
            ))}
          </ol>
        }
      />
      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <ShikayatForm
              lang={lang}
              t={t.shikayat}
              categories={categories}
              trackHref={localePath(lang, "/e-shikayat/track")}
            />
          </div>
          <aside className="lg:col-span-4">
            <div className="rounded-panel bg-ghat p-6 lg:sticky lg:top-28">
              <h2 className="h-card flex items-center gap-2 text-lg">
                <Info aria-hidden="true" className="h-5 w-5 text-sindoor" />
                {t.shikayat.aside.title}
              </h2>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-[0.95rem]">
                {t.shikayat.aside.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
              <Link href={localePath(lang, "/e-shikayat/track")} className="btn btn-ghost mt-5">
                <Search aria-hidden="true" className="h-4 w-4" />
                {t.serviceBar.items.track.title}
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
