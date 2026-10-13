import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { highlights, ownJourney, ownRoles } from "@/content/journey";
import { getDict } from "@/content/ui";
import { localePath, tr, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { CountUp } from "./CountUp";
import { Timeline, TimelineItem } from "./Timeline";

/**
 * Two tracks side by side: the responsibilities he holds, and four turning points in his journey.
 * `preview` adds the link to the full page and uses the shorter lead for the home page.
 */
export function PoliticalJourney({
  lang,
  preview = false,
}: {
  lang: Lang;
  preview?: boolean;
}) {
  const d = getDict(lang);
  return (
    <section
      id="journey"
      aria-labelledby="journey-title"
      className="section bg-sand/60"
    >
      <div className="shell">
        <Reveal className="mb-8">
          <SectionHeading
            id="journey-title"
            title={d.sections.journey}
            lead={preview ? d.sections.journeyLead : tr(ownJourney[0], lang)}
          />
        </Reveal>

        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          {/* Responsibilities */}
          <Reveal>
            <p className="label">{d.journey.rolesLabel}</p>
            <h3 className="h-card mt-2 text-[1.5rem]">{d.journey.rolesLead}</h3>
            <ul className="mt-7 divide-y divide-line border-y border-line">
              {ownRoles.map((role) => (
                <li key={role.title.en} className="grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                  <p className="font-display text-lg font-semibold">{tr(role.title, lang)}</p>
                  <p className="text-ink-2">{tr(role.body, lang)}</p>
                </li>
              ))}
            </ul>
            {preview && (
              <Link href={localePath(lang, "/about#journey")} className="link-arrow mt-8">
                {d.sections.readJourney}
                <ArrowRight aria-hidden="true" className="h-4 w-4" />
              </Link>
            )}
          </Reveal>

          {/* Turning points */}
          <Reveal delay={0.08} className="card p-6 sm:p-8">
            <p className="label">{d.journey.stepsLabel}</p>
            <h3 className="h-card mt-2 text-[1.5rem]">{d.journey.stepsLead}</h3>

            <div className="mt-7">
              <Timeline>
                {highlights.map((p, i) => (
                  <TimelineItem key={p.label.en} last={i === highlights.length - 1} className="pb-8">
                    <p className="font-display text-xl font-semibold text-saffron-deep">{tr(p.label, lang)}</p>
                    <p className="mt-1 font-display text-lg font-semibold">
                      <CountUp text={tr(p.title, lang)} />
                    </p>
                    <p className="mt-1 text-[0.95rem] text-ink-2 text-justify hyphens-auto">{tr(p.body, lang)}</p>
                  </TimelineItem>
                ))}
              </Timeline>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
