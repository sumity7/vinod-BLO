import { steps } from "@/content/journey";
import { getDict } from "@/content/ui";
import { tr, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { Timeline, TimelineItem } from "./Timeline";

/**
 * The full journey, step by step. The biodata records the steps in order but gives no dates, so each
 * step is numbered instead; nothing is dated by guesswork.
 */
export function Milestones({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const m = d.milestones;
  return (
    <section id="milestones" aria-labelledby="milestones-title" className="section bg-paper">
      <div className="shell grid gap-10 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <SectionHeading id="milestones-title" title={m.title} lead={m.lead} />
          </div>
        </Reveal>

        <div className="lg:col-span-8">
          <Timeline label={m.title}>
            {steps.map((s, i) => (
              <TimelineItem
                key={s.id}
                last={i === steps.length - 1}
                tone={s.current ? "ink" : "saffron"}
                className="pb-10"
              >
                <Reveal>
                  <p className="label">
                    {s.current ? m.current : `${m.step} ${i + 1}`}
                  </p>
                  <h3 className="h-card mt-1 text-[1.35rem]">
                    {tr(s.title, lang)}
                    {s.badge && (
                      <span className="ml-3 inline-block rounded-full border border-saffron px-2.5 py-0.5 align-middle font-sans text-xs font-semibold text-saffron-deep">
                        {tr(s.badge, lang)}
                      </span>
                    )}
                  </h3>
                  <p className="mt-2 max-w-2xl text-ink-2">{tr(s.body, lang)}</p>
                  {s.items && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {s.items.map((it) => (
                        <li
                          key={it.en}
                          className="rounded-full border border-line bg-white px-3 py-1 text-[0.9rem] text-ink-2"
                        >
                          {tr(it, lang)}
                        </li>
                      ))}
                    </ul>
                  )}
                </Reveal>
              </TimelineItem>
            ))}
          </Timeline>
        </div>
      </div>
    </section>
  );
}
