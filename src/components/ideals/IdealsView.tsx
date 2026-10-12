import Image from "next/image";
import Link from "next/link";
import { Quote } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Monogram } from "@/components/ideals/Monogram";
import { idealCategories, idealsIn, thoughtOfTheDay, type IdealCategory } from "@/content/ideals";
import { pt } from "@/content/portal";
import { localePath, type Lang } from "@/lib/i18n";

/** The first category is the Ideals page itself; the others live at /ideals/<slug>. */
export const categoryPath = (category: IdealCategory) =>
  category.slug === idealCategories[0].slug ? "/ideals" : `/ideals/${category.slug}`;

/**
 * Our Ideals for one category: the categories listed on the left, and a card per person on the
 * right with their portrait, a quote, and their name and years.
 */
export function IdealsView({ lang, category }: { lang: Lang; category: IdealCategory }) {
  const t = pt(lang);
  const featured = thoughtOfTheDay();
  const path = categoryPath(category);
  const people = idealsIn(category.slug);
  const crumbs = [{ name: t.ideals.title, path: "/ideals" }];
  if (path !== "/ideals") crumbs.push({ name: category.name[lang], path });

  return (
    <>
      <PageHero
        lang={lang}
        path={path}
        crumbs={crumbs}
        title={t.ideals.title}
        lead={t.ideals.lead}
        description={t.ideals.description}
        visual={
          <figure className="relative overflow-hidden rounded-panel bg-ganga p-7 text-white shadow-soft sm:p-9">
            <Quote aria-hidden="true" className="h-8 w-8 text-marigold" />
            <p className="mt-3 text-sm font-semibold text-marigold">{t.ideals.thought}</p>
            <blockquote className="font-display mt-2 whitespace-pre-line text-[1.45rem] leading-snug sm:text-[1.7rem]">
              {featured.quote[lang]}
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3 text-white/85">
              <Monogram ideal={featured} lang={lang} size={44} />
              {featured.name[lang]}
            </figcaption>
          </figure>
        }
      />

      <section className="section">
        <div className="shell grid gap-10 lg:grid-cols-12">
          <aside className="lg:col-span-4">
            <nav aria-labelledby="ideal-categories" className="card lg:sticky lg:top-28">
              <h2 id="ideal-categories" className="border-b border-line px-5 py-4 font-semibold">
                {t.ideals.categories}
              </h2>
              <ul className="space-y-1 p-2">
                {idealCategories.map((c) => {
                  const active = c.slug === category.slug;
                  return (
                    <li key={c.slug}>
                      <Link
                        href={localePath(lang, categoryPath(c))}
                        aria-current={active ? "page" : undefined}
                        className={`flex items-center justify-between gap-3 rounded-xl px-4 py-3 font-medium transition-colors ${
                          active ? "bg-saffron-deep text-white" : "text-ink-2 hover:bg-sand hover:text-ink"
                        }`}
                      >
                        {c.name[lang]}
                        <span className={`text-sm ${active ? "text-white" : "text-muted"}`}>{idealsIn(c.slug).length}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </aside>

          <div className="lg:col-span-8">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line pb-4">
              <h2 className="h-section">{t.ideals.title}</h2>
              <p className="font-semibold text-saffron-deep">{category.name[lang]}</p>
            </div>
            <ul className="mt-6 space-y-5">
              {people.map((ideal) => (
                <li
                  key={ideal.slug}
                  className="card grid grid-cols-[6.5rem_minmax(0,1fr)] items-start gap-4 p-4 sm:grid-cols-[11rem_minmax(0,1fr)] sm:items-center sm:gap-6 sm:p-5"
                >
                  <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-sand">
                    <Image src={ideal.image} alt={ideal.name[lang]} fill sizes="(min-width: 640px) 176px, 104px" className="object-cover" />
                  </div>
                  <figure>
                    <blockquote className="font-display whitespace-pre-line text-lg leading-relaxed text-ink sm:text-xl">
                      {ideal.quote[lang]}
                    </blockquote>
                    {ideal.source && <p className="mt-2 text-sm text-muted">{ideal.source[lang]}</p>}
                    <figcaption className="mt-4 text-right font-semibold text-saffron-deep">
                      {ideal.name[lang]}
                      {ideal.years && ` (${ideal.years[lang]})`}
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
