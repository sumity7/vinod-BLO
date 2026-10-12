import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ArticleCard } from "@/components/vichar/ArticleCard";
import { VicharList } from "@/components/vichar/VicharList";
import { articles, vicharCategories, type VicharCategory } from "@/content/vichar";
import { pt } from "@/content/portal";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = pt(lang).vichar;
  return buildMetadata({ lang, path: "/vichar", title: t.seoTitle, description: t.description });
}

export default async function VicharPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = pt(lang);
  const cats = (Object.keys(vicharCategories) as VicharCategory[]).map((id) => ({
    id,
    label: vicharCategories[id][lang],
    count: articles.filter((a) => a.category === id).length,
  }));

  return (
    <>
      <PageHero
        lang={lang}
        path="/vichar"
        crumbs={[{ name: t.nav.vimarsh, path: "/vimarsh" }, { name: t.nav.vichar, path: "/vichar" }]}
        title={t.vichar.title}
        lead={t.vichar.lead}
        description={t.vichar.description}
      />
      <section className="section">
        <div className="shell">
          <VicharList
            allLabel={t.vichar.all}
            heading={t.nav.vicharAll}
            categories={cats}
            items={articles.map((a) => ({ id: a.slug, category: a.category, node: <ArticleCard article={a} lang={lang} /> }))}
          />
        </div>
      </section>
    </>
  );
}
