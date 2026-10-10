import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Milestones } from "@/components/Milestones";
import { HeroPortrait, PageHero } from "@/components/PageHero";
import { PoliticalJourney } from "@/components/PoliticalJourney";
import { Reveal } from "@/components/Reveal";
import { heroImages } from "@/content/heroImages";
import { biography, quickFacts } from "@/content/profile";
import { pageSeo } from "@/content/seo";
import { getDict } from "@/content/ui";
import { localePath, tr } from "@/lib/i18n";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";

const PATH = "/about";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  return buildMetadata({
    lang,
    path: PATH,
    absoluteTitle: true,
    title: pageSeo.about.title[lang],
    description: pageSeo.about.description[lang],
  });
}

/**
 * One continuous page: who he is and his vision, his journey (with the roles he holds today) and
 * the steps along it. The responsibilities are listed once, in the journey's roles table, so the
 * biography's own list of them is not repeated here.
 */
export default async function AboutPage({ params }: LangParams) {
  const lang = await getLang(params);
  const d = getDict(lang);

  return (
    <>
      <PageHero
        lang={lang}
        path={PATH}
        crumbs={[{ name: d.nav.about, path: PATH }]}
        eyebrow={d.nav.about}
        title={site.name[lang]}
        lead={d.biography.lead}
        description={pageSeo.about.description[lang]}
        profile
        meta={`${site.role[lang]} · ${site.constituency[lang]}`}
        visual={<HeroPortrait image={heroImages.portrait} lang={lang} />}
      />

      {/* Who he is, his responsibilities and his vision */}
      <div
        id="biography"
        className="section shell grid gap-14 lg:grid-cols-12 lg:gap-20"
      >
        <div className="lg:col-span-8">
          {biography.filter((section) => section.id !== "responsibilities").map((section, i) => (
            <Reveal key={section.id} className={i > 0 ? "mt-10" : ""}>
              <section id={section.id} aria-labelledby={`${section.id}-title`}>
                <h2 id={`${section.id}-title`} className="h-section text-[clamp(1.75rem,3.4vw,2.5rem)]">
                  {tr(section.title, lang)}
                </h2>
                <div className="prose-ed mt-5 text-ink-2">
                  {section.body.map((p) => (
                    <p key={p.en}>{tr(p, lang)}</p>
                  ))}
                </div>
              </section>
            </Reveal>
          ))}
        </div>

        <aside className="lg:col-span-4" aria-label={d.biography.title}>
          <div className="card px-6 py-1 lg:sticky lg:top-28">
            <dl className="divide-y divide-line">
              {quickFacts.map((f) => (
                <div key={f.label.en} className="py-5">
                  <dt className="label">{tr(f.label, lang)}</dt>
                  <dd className="mt-1.5 text-lg">{tr(f.value, lang)}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
      </div>

      {/* His journey */}
      <PoliticalJourney lang={lang} />

      {/* The steps, in order */}
      <Milestones lang={lang} />

      {/* Where to go next */}
      <section aria-label={d.biography.alsoSee} className="border-t border-line bg-white py-8">
        <div className="shell flex flex-wrap gap-x-12 gap-y-4">
          {[
            { href: "/media", label: d.nav.gallery },
          ].map((l) => (
            <Link key={l.href} href={localePath(lang, l.href)} className="link-arrow">
              {l.label}
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
