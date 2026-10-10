import Link from "next/link";
import { publishedUpdates } from "@/content/updates";
import { getDict } from "@/content/ui";
import { localePath, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { UpdateCard } from "./UpdateCard";

/**
 * Events for the home page: heading with a quiet "View All" button, then the latest events as
 * cards of equal width and height, side by side, sized so the section fits on one screen.
 * Renders nothing until an update exists.
 */
export function Updates({ lang }: { lang: Lang }) {
  const latest = publishedUpdates().slice(0, 3);
  if (latest.length === 0) return null;
  const d = getDict(lang);
  const cols = latest.length >= 3 ? "md:grid-cols-2 lg:grid-cols-3" : latest.length === 2 ? "md:grid-cols-2" : "mx-auto max-w-3xl";
  return (
    <section id="updates" aria-labelledby="updates-title" className="section bg-sand">
      <div className="shell">
        <Reveal className="flex flex-wrap items-center justify-between gap-4">
          <h2 id="updates-title" className="h-section">
            {d.sections.events}
          </h2>
          <Link href={localePath(lang, "/updates")} className="btn btn-ghost">
            {d.sections.viewAll}
          </Link>
        </Reveal>

        <div className={`mt-8 grid gap-6 ${cols}`}>
          {latest.map((u, i) => (
            <Reveal key={u.slug} delay={0.06 * i} className="h-full">
              <UpdateCard update={u} lang={lang} readMore={d.sections.readMore} featuredLabel={d.updates.featured} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
