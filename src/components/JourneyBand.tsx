import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { highlights } from "@/content/journey";
import { getDict } from "@/content/ui";
import { localePath, tr, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/**
 * Political journey on the home page: the four turning points as a horizontal timeline (a row of
 * cards on a shared line), with a link to the full journey on the About page. The last point is
 * where he is today, so it is filled.
 */
export function JourneyBand({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const last = highlights.length - 1;
  return (
    <section id="journey" aria-labelledby="journey-title" className="section bg-paper">
      <div className="shell">
        <Reveal className="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
          <div className="max-w-2xl">
            <p className="label">{d.journey.stepsLabel}</p>
            <h2 id="journey-title" className="h-section mt-2">
              {d.sections.journey}
            </h2>
            <p className="mt-4 text-ink-2">{d.sections.journeyLead}</p>
          </div>
          <Link href={localePath(lang, "/about#journey")} className="link-arrow">
            {d.sections.readJourney}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </Reveal>

        <ol className="relative mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* The shared line the dots sit on (wide screens only, where the cards are in one row). */}
          <span aria-hidden="true" className="absolute inset-x-0 top-1.75 hidden h-px bg-line lg:block" />
          {highlights.map((h, i) => {
            const now = i === last;
            return (
              <Reveal as="li" key={h.label.en} delay={i * 0.06} className="relative lg:pt-9">
                <span
                  aria-hidden="true"
                  className={`absolute left-6 top-0 hidden h-3.5 w-3.5 rounded-full border-2 lg:block ${
                    now ? "border-saffron bg-saffron shadow-[0_0_0_5px_rgba(244,114,22,0.2)]" : "border-saffron bg-paper"
                  }`}
                />
                <div
                  className={`h-full rounded-card border p-6 ${
                    now ? "border-burnt bg-burnt text-white shadow-soft" : "border-line bg-sand"
                  }`}
                >
                  <p className={`flex items-baseline gap-3 text-sm font-semibold ${now ? "text-peach" : "text-saffron-deep"}`}>
                    <span className="font-display tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    {tr(h.label, lang)}
                  </p>
                  <h3 className="h-card mt-3">{tr(h.title, lang)}</h3>
                  <p className={`mt-2 text-[0.975rem] leading-relaxed ${now ? "text-white/85" : "text-ink-2"}`}>
                    {tr(h.body, lang)}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
