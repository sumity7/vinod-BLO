import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { StatCompare } from "@/components/vikas/StatCompare";
import { indiaStats, kashiMilestones, upStats } from "@/content/vikas";
import { pt } from "@/content/portal";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";
import { localePath } from "@/lib/i18n";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = pt(lang).vikas;
  return buildMetadata({ lang, path: "/vikas-yatra", title: t.seoTitle, description: t.description });
}

export default async function VikasPage({ params }: LangParams) {
  const lang = await getLang(params);
  const t = pt(lang);
  const v = t.vikas;

  return (
    <>
      <PageHero
        lang={lang}
        path="/vikas-yatra"
        crumbs={[{ name: t.nav.vimarsh, path: "/vimarsh" }, { name: t.nav.vikas, path: "/vikas-yatra" }]}
        title={v.title}
        lead={v.lead}
        description={v.description}
        points={[v.india, v.up, v.kashi]}
        visual={
          <figure className="relative overflow-hidden rounded-panel shadow-soft">
            <div className="relative aspect-[5/4]">
              <Image
                src="/images/vikas/hero.webp"
                alt={v.heroCaption}
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent px-5 pb-4 pt-12 text-sm font-medium text-white">
              {v.heroCaption}
            </figcaption>
          </figure>
        }
      />

      <section className="section" aria-labelledby="india">
        <div className="shell">
          <h2 id="india" className="h-section">{v.india}</h2>
          <p className="lead mt-4 max-w-2xl text-ink-2">{v.indiaLead}</p>
          <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {indiaStats.map((s) => (
              <li key={s.id}>
                <StatCompare stat={s} lang={lang} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section ghat-steps bg-ganga text-white" aria-labelledby="up">
        <div className="shell on-dark">
          <h2 id="up" className="h-section">{v.up}</h2>
          <p className="lead mt-4 max-w-2xl text-white/85">{v.upLead}</p>
          <ul className="mt-10 grid gap-6 text-ink sm:grid-cols-2 lg:grid-cols-3">
            {upStats.map((s) => (
              <li key={s.id}>
                <StatCompare stat={s} lang={lang} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="kashi">
        <div className="shell">
          <h2 id="kashi" className="h-section">{v.kashi}</h2>
          <p className="lead mt-4 max-w-2xl text-ink-2">{v.kashiLead}</p>
          <ol className="mt-10 grid gap-6 md:grid-cols-3">
            {kashiMilestones.map((m) => (
              <li key={m.title.en}>
                <article className="card group flex h-full flex-col">
                  <div className="relative aspect-[16/10] overflow-hidden bg-ganga">
                    <Image
                      src={m.image}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-sm font-semibold text-saffron-deep shadow-soft">
                      {m.date[lang]}
                    </span>
                  </div>
                  <div className="p-5 sm:p-6">
                    <h3 className="h-card">{m.title[lang]}</h3>
                    <p className="mt-2 leading-relaxed text-ink-2">{m.text[lang]}</p>
                  </div>
                </article>
              </li>
            ))}
          </ol>
          <p className="mt-12 max-w-3xl border-t border-line pt-6 text-sm leading-relaxed text-muted">{v.note}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={localePath(lang, "/vichar/bharat-2014-ke-baad")} className="btn btn-primary">
              {lang === "hi" ? "2014 के बाद का भारत: लेख पढ़ें" : "Read: India after 2014"}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
            <Link href={localePath(lang, "/vichar/uttar-pradesh-2017-ke-baad")} className="btn btn-ghost">
              {lang === "hi" ? "2017 के बाद उत्तर प्रदेश: लेख पढ़ें" : "Read: UP after 2017"}
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
