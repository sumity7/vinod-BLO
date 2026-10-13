import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BookOpenText, TrendingUp } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { ArticleCard } from "@/components/vichar/ArticleCard";
import { StatCompare } from "@/components/vikas/StatCompare";
import { pt } from "@/content/portal";
import { articles } from "@/content/vichar";
import { indiaStats } from "@/content/vikas";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";
import { localePath } from "@/lib/i18n";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = pt(lang).vimarsh;
  return buildMetadata({ lang, path: "/vimarsh", title: t.seoTitle, description: t.description });
}

export default async function VimarshPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = pt(lang);
  return (
    <>
      <PageHero
        lang={lang}
        path="/vimarsh"
        crumbs={[{ name: t.nav.vimarsh, path: "/vimarsh" }]}
        title={t.vimarsh.title}
        lead={t.vimarsh.lead}
        description={t.vimarsh.description}
      />

      <section aria-labelledby="vm-vichar" className="section">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="shrink-0 grid h-12 w-12 place-items-center rounded-full bg-ganga text-marigold">
                <BookOpenText aria-hidden="true" className="h-6 w-6" />
              </span>
              <div>
                <h2 id="vm-vichar" className="h-section">{t.nav.vichar}</h2>
                <p className="mt-1 max-w-prose text-ink-2">{t.vimarsh.vicharText}</p>
              </div>
            </div>
            <Link href={localePath(lang, "/vichar")} className="btn btn-ghost">
              {t.vichar.viewAll}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {articles.slice(0, 3).map((a) => (
              <ArticleCard key={a.slug} article={a} lang={lang} />
            ))}
          </div>
        </div>
      </section>

      <section aria-labelledby="vm-vikas" className="section on-dark bg-ganga text-white">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="shrink-0 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-marigold">
                <TrendingUp aria-hidden="true" className="h-6 w-6" />
              </span>
              <div>
                <h2 id="vm-vikas" className="h-section text-white">{t.nav.vikas}</h2>
                <p className="mt-1 max-w-prose text-white/85">{t.vimarsh.vikasText}</p>
              </div>
            </div>
            <Link href={localePath(lang, "/vikas-yatra")} className="btn btn-light">
              {t.vimarsh.open}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8 grid gap-6 text-ink md:grid-cols-3">
            {indiaStats.slice(0, 3).map((s) => (
              <StatCompare key={s.id} stat={s} lang={lang} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
