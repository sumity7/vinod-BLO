import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CircleCheckBig,
  ClipboardList,
  FileText,
  IdCard,
  ImagePlus,
  PenLine,
  Search,
  Send,
  Sparkles,
  Ticket,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { pt } from "@/content/portal";
import { localePath, type Lang } from "@/lib/i18n";

/**
 * Two invitations near the end of the home page, as equal cards with a picture band on top: the
 * complaint service with a photograph from the block, and the e-card maker with a small preview of
 * a card. Each lists its three steps as icon chips. Hovering lifts the card, zooms the photograph
 * and fans out the preview; the motion is left out for visitors who prefer reduced motion.
 */
export function PortalCtas({ lang }: { lang: Lang }) {
  const t = pt(lang);
  const h = t.home;
  const stepIcons = { shikayat: [ClipboardList, Ticket, CircleCheckBig], ecard: [ImagePlus, PenLine, Send] };
  const chip = (dark: boolean) =>
    `flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-medium transition-colors duration-300 ${
      dark ? "bg-white/10 text-white/90 group-hover:bg-white/15" : "bg-white/80 text-ink-2 group-hover:bg-white"
    }`;
  const lift =
    "group relative flex h-full flex-col overflow-hidden rounded-panel shadow-soft transition-[transform,box-shadow] duration-500 ease-[var(--ease-out)] hover:shadow-raised motion-safe:hover:-translate-y-1.5";

  return (
    <section className="section bg-paper pb-0!">
      {/* Followed by Stay Connected on the same white, whose own top padding is the gap between them. */}
      <div className="shell grid gap-6 md:grid-cols-2">
        {/* e-Shikayat */}
        <Reveal className="h-full">
          <article className={`on-dark bg-burnt text-white ${lift}`}>
            <div className="relative -mb-px h-52 overflow-hidden sm:h-60">
              <Image
                src="/images/media/village-road-hd.webp"
                alt={h.shikayatPhoto}
                fill
                sizes="(min-width: 768px) 45vw, 100vw"
                className="object-cover object-[50%_60%] transition-transform duration-[1200ms] ease-[var(--ease-out)] motion-safe:group-hover:scale-[1.07]"
              />
              {/* Runs a pixel past the photograph's foot, so no seam shows where it meets the card. */}
              <div aria-hidden="true" className="absolute inset-x-0 -bottom-px top-0 bg-gradient-to-t from-burnt from-[6%] via-burnt/40 to-burnt/0" />
            </div>
            <div className="relative flex flex-1 flex-col px-7 pb-8 sm:px-9">
              <span className="shrink-0 relative -mt-8 grid h-16 w-16 place-items-center rounded-2xl bg-white text-saffron-deep shadow-raised transition-transform duration-500 motion-safe:group-hover:-rotate-6 motion-safe:group-hover:scale-105">
                <span aria-hidden="true" className="absolute inset-0 rounded-2xl bg-white/25 motion-safe:animate-ping [animation-duration:2.8s]" />
                <FileText aria-hidden="true" className="relative h-7 w-7" />
              </span>
              <h2 className="font-display mt-5 text-[1.7rem] leading-snug text-white">{h.shikayatTitle}</h2>
              <p className="mt-3 max-w-prose leading-relaxed text-white/85">{h.shikayatText}</p>
              <ol className="mt-5 flex flex-wrap gap-2">
                {t.shikayat.steps.map((step, i) => {
                  const Icon = stepIcons.shikayat[i];
                  return (
                    <li key={step.t} className={chip(true)}>
                      <Icon aria-hidden="true" className="h-4 w-4 text-peach" />
                      {step.t}
                    </li>
                  );
                })}
              </ol>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                <Link href={localePath(lang, "/e-shikayat")} className="btn btn-white">
                  {t.serviceBar.items.shikayat.title}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
                <Link href={localePath(lang, "/e-shikayat/track")} className="btn btn-light">
                  <Search aria-hidden="true" className="h-4 w-4" />
                  {t.serviceBar.items.track.title}
                </Link>
              </div>
            </div>
          </article>
        </Reveal>

        {/* e-card */}
        <Reveal delay={0.08} className="h-full">
          <article className={`bg-saffron-tint text-ink ${lift}`}>
            <div
              aria-hidden="true"
              className="relative grid h-52 place-items-center overflow-hidden bg-gradient-to-br from-peach via-saffron-tint to-[#ffe9c7] sm:h-60"
            >
              <Sparkles className="absolute left-8 top-7 h-5 w-5 text-saffron/70 motion-safe:animate-pulse" />
              <Sparkles className="absolute bottom-10 right-10 h-4 w-4 text-saffron/60 motion-safe:animate-pulse [animation-delay:0.8s]" />
              {/* A second card behind, fanned out on hover */}
              <div className="absolute h-44 w-72 rotate-[8deg] rounded-2xl bg-gradient-to-br from-burnt to-crimson shadow-soft transition-transform duration-700 ease-[var(--ease-out)] motion-safe:group-hover:translate-x-10 motion-safe:group-hover:rotate-[14deg] sm:h-48 sm:w-80" />
              <div className="relative flex h-44 w-72 -rotate-[5deg] items-center overflow-hidden rounded-2xl bg-gradient-to-br from-saffron-deep via-saffron to-marigold p-4 text-white shadow-raised transition-transform duration-700 ease-[var(--ease-out)] motion-safe:group-hover:-translate-y-2 motion-safe:group-hover:rotate-0 motion-safe:group-hover:scale-105 sm:h-48 sm:w-80">
                {/* The leader's standing photograph, as on the banner, fills the card's right side. */}
                <span className="absolute bottom-0 right-0 aspect-[1059/1319] h-[96%]">
                  <span className="absolute inset-x-[10%] bottom-[10%] top-[20%] rounded-full bg-white/30 blur-xl" />
                  <Image
                    src="/images/leader-standing.webp"
                    alt=""
                    fill
                    sizes="160px"
                    className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,#000_85%,transparent)]"
                  />
                </span>
                <span className="relative min-w-0 max-w-[56%]">
                  <span className="font-display block text-[1.15rem] leading-tight sm:text-[1.3rem]">{h.ecardMock.greeting}</span>
                  <span className="mt-2 block h-px w-full bg-white/50" />
                  <span className="mt-2 flex items-center gap-2">
                    <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border-2 border-dashed border-white/80 bg-white/15">
                      <ImagePlus className="h-4 w-4" />
                    </span>
                    <span className="text-sm leading-tight">
                      <span className="block font-semibold">{h.ecardMock.name}</span>
                      <span className="block text-white/85">{h.ecardMock.village}</span>
                    </span>
                  </span>
                </span>
              </div>
            </div>
            <div className="relative flex flex-1 flex-col px-7 pb-8 sm:px-9">
              <span className="shrink-0 relative -mt-8 grid h-16 w-16 place-items-center rounded-2xl bg-saffron-deep text-white shadow-raised transition-transform duration-500 motion-safe:group-hover:rotate-6 motion-safe:group-hover:scale-105">
                <IdCard aria-hidden="true" className="h-7 w-7" />
              </span>
              <h2 className="font-display mt-5 text-[1.7rem] leading-snug">{h.ecardTitle}</h2>
              <p className="mt-3 max-w-prose leading-relaxed text-ink-2">{h.ecardText}</p>
              <ol className="mt-5 flex flex-wrap gap-2">
                {h.ecardSteps.map((step, i) => {
                  const Icon = stepIcons.ecard[i];
                  return (
                    <li key={step} className={chip(false)}>
                      <Icon aria-hidden="true" className="h-4 w-4 text-saffron-deep" />
                      {step}
                    </li>
                  );
                })}
              </ol>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-7">
                <Link href={localePath(lang, "/e-card")} className="btn btn-primary">
                  {t.serviceBar.items.ecard.title}
                  <ArrowRight aria-hidden="true" className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}
