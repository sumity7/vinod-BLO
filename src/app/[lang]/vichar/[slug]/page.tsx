import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ExternalLink, FileCheck2, Flag, HelpCircle, Users } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PageHero } from "@/components/PageHero";
import { ArticleCard } from "@/components/vichar/ArticleCard";
import { ShareButton } from "@/components/vichar/ShareButton";
import { articles, getArticle, vicharCategories, type Block } from "@/content/vichar";
import { fill, pt } from "@/content/portal";
import { isLang, locales, localePath, type Lang } from "@/lib/i18n";
import { articleLd, buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ lang: string; slug: string }> };

export function generateStaticParams() {
  return locales.flatMap((lang) => articles.map((a) => ({ lang, slug: a.slug })));
}
export const dynamicParams = false;

async function resolve(params: Params["params"]) {
  const { lang, slug } = await params;
  const article = getArticle(slug);
  if (!isLang(lang) || !article) notFound();
  return { lang: lang as Lang, article };
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { lang, article } = await resolve(params);
  return buildMetadata({
    lang,
    path: `/vichar/${article.slug}`,
    title: article.title[lang],
    description: article.summary[lang],
    type: "article",
    publishedTime: article.date,
  });
}

function Blocks({ blocks, lang }: { blocks: Block[]; lang: Lang }) {
  return (
    <>
      {blocks.map((b, i) => (
        <div key={i}>
          {b.heading && <h2>{b.heading[lang]}</h2>}
          {b.paras?.map((p, j) => <p key={j}>{p[lang]}</p>)}
          {b.bullets && (
            <ul>
              {b.bullets.map((p, j) => (
                <li key={j}>{p[lang]}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </>
  );
}

export default async function ArticlePage({ params }: Params) {
  const { lang, article } = await resolve(params);
  const t = pt(lang);
  const v = t.vichar;
  const related = articles.filter((a) => a.slug !== article.slug && a.category === article.category).concat(
    articles.filter((a) => a.slug !== article.slug && a.category !== article.category),
  ).slice(0, 3);
  const date = new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${article.date}T00:00:00`),
  );

  const schemeParts = article.scheme
    ? [
        { icon: FileCheck2, title: v.what, items: article.scheme.what, list: false },
        { icon: Users, title: v.who, items: article.scheme.who, list: true },
        { icon: HelpCircle, title: v.how, items: article.scheme.how, list: true, numbered: true },
      ]
    : [];

  return (
    <>
      <PageHero
        lang={lang}
        path={`/vichar/${article.slug}`}
        crumbs={[
          { name: t.nav.vimarsh, path: "/vimarsh" },
          { name: t.nav.vichar, path: "/vichar" },
          { name: article.title[lang], path: `/vichar/${article.slug}` },
        ]}
        eyebrow={vicharCategories[article.category][lang]}
        title={article.title[lang]}
        lead={article.summary[lang]}
        description={article.summary[lang]}
        meta={`${v.published}: ${date} · ${fill(v.readTime, { n: article.readMin })}`}
        visual={
          <figure className="relative overflow-hidden rounded-panel bg-ganga shadow-soft">
            <div className="relative aspect-[16/11]">
              <Image src={article.image} alt="" fill priority sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
            {article.highlight && (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/50 to-transparent px-6 pb-6 pt-20 text-white sm:px-8">
                <p className="font-display text-[clamp(2.4rem,2rem+1.6vw,3.2rem)] leading-none text-marigold">
                  {article.highlight.value[lang]}
                </p>
                <p className="mt-2 text-white/90">{article.highlight.label[lang]}</p>
              </figcaption>
            )}
          </figure>
        }
      />

      <section className="section">
        <div className="shell grid gap-12 lg:grid-cols-12">
          <article className="article min-w-0 lg:col-span-8">
            {schemeParts.map((part) => (
              <div key={part.title}>
                <h2 className="flex items-center gap-3">
                  <part.icon aria-hidden="true" className="h-6 w-6 shrink-0 text-saffron-deep" />
                  {part.title}
                </h2>
                {part.list ? (
                  part.numbered ? (
                    <ol className="mb-6 max-w-[66ch] space-y-3">
                      {part.items.map((p, j) => (
                        <li key={j} className="flex gap-3">
                          <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-saffron-tint text-sm font-semibold text-burnt">
                            {j + 1}
                          </span>
                          <span>{p[lang]}</span>
                        </li>
                      ))}
                    </ol>
                  ) : (
                    <ul>
                      {part.items.map((p, j) => (
                        <li key={j}>{p[lang]}</li>
                      ))}
                    </ul>
                  )
                ) : (
                  part.items.map((p, j) => <p key={j}>{p[lang]}</p>)
                )}
              </div>
            ))}
            {article.body && <Blocks blocks={article.body} lang={lang} />}

            <div className="mt-10 rounded-panel border border-saffron/40 bg-saffron-tint/40 p-6 sm:p-8">
              <h2 className="!mt-0 flex items-center gap-3">
                <Flag aria-hidden="true" className="h-6 w-6 shrink-0 text-saffron-deep" />
                {v.stance}
              </h2>
              {article.stance.map((p, j) => (
                <p key={j}>{p[lang]}</p>
              ))}
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              {article.cta && (
                <Link href={localePath(lang, article.cta.href)} className="btn btn-primary">
                  {article.cta.label[lang]}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              )}
              <ShareButton text={article.title[lang]} label={v.share} />
            </div>
          </article>

          <aside className="space-y-6 lg:col-span-4">
            {article.official && (
              <a
                href={article.official.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card card-hover flex items-center justify-between gap-3 p-5"
              >
                <span>
                  <span className="block text-sm text-muted">{v.official}</span>
                  <span className="font-semibold text-ganga">{article.official.label}</span>
                </span>
                <ExternalLink aria-hidden="true" className="h-5 w-5 text-saffron-deep" />
              </a>
            )}
            <div className="card p-5">
              <p className="text-sm font-semibold text-muted">{v.sources}</p>
              <ul className="mt-3 space-y-2 text-sm">
                {article.sources.map((s) => (
                  <li key={s.url}>
                    <a href={s.url} target="_blank" rel="noopener noreferrer" className="text-ganga underline decoration-line underline-offset-4 hover:decoration-saffron">
                      {s.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <section className="section border-t border-line bg-sand/60">
        <div className="shell">
          <h2 className="h-section">{v.related}</h2>
          <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((a) => (
              <li key={a.slug}>
                <ArticleCard article={a} lang={lang} compact />
              </li>
            ))}
          </ul>
        </div>
      </section>
      <JsonLd
        data={articleLd({
          lang,
          path: `/vichar/${article.slug}`,
          headline: article.title,
          description: article.summary,
          date: article.date,
        })}
      />
    </>
  );
}
