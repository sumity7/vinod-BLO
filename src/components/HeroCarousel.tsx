"use client";

import { Fragment, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { CountUp } from "./CountUp";

export type HeroSlideView = {
  id: string;
  eyebrow: string;
  title: string[];
  subtitle?: string;
  subtitleNote?: string;
  description: string;
  primary: { href: string; label: string };
  /** Replaces the shared Contact button on this slide. */
  secondary?: { href: string; label: string };
  facts: { k: string; v: string }[];
  image: { src: string; alt: string; position: string; cutout?: boolean; ratio: number };
};

/**
 * Home hero: name, role and a short line on the left with two actions and a strip of key facts;
 * the photograph on the right, in a soft frame or, for a transparent cut-out, standing on the hero
 * itself with a soft halo behind it. The field is deep saffron, darkest where the text sits. Slides
 * cross-fade in place (they share one grid cell, so the hero never changes height) and change only
 * when the visitor uses the arrows or dots. The hero fills the screen under the sticky header (and
 * grows instead of clipping when its text needs more room), so no other section shows beneath it.
 */
export function HeroCarousel({
  slides,
  contact,
  labels,
}: {
  slides: HeroSlideView[];
  contact: { href: string; label: string };
  labels: { region: string; prev: string; next: string; goTo: string };
}) {
  const [index, setIndex] = useState(0);
  const count = slides.length;

  const go = (n: number) => setIndex((n + count) % count);

  return (
    <section
      aria-roledescription="carousel"
      aria-label={labels.region}
      className="relative isolate overflow-hidden bg-burnt text-white"
    >
      {/* Deep saffron field: darkest behind the text, a brighter saffron light behind the photograph
          (above the text on phones, to the right on wide screens) and a faint darker foot. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_45%_at_50%_18%,rgba(255,150,60,0.55),transparent_70%),linear-gradient(160deg,#8a3203_0%,#9e3c03_45%,#b04a08_100%)] lg:bg-[radial-gradient(42%_75%_at_80%_42%,rgba(255,140,40,0.6),transparent_72%),radial-gradient(35%_45%_at_8%_100%,rgba(242,165,26,0.22),transparent_70%),linear-gradient(110deg,#7c2c02_0%,#953903_45%,#b44c08_100%)]"
      />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-black/25 to-transparent" />

      <div className="grid">
        {slides.map((s, i) => {
          const active = i === index;
          // One h1 per page: the first slide carries it, the others are h2.
          const Heading = i === 0 ? "h1" : "h2";
          // The parts of the current slide fade up one after another; each gets its own delay.
          const rise = active ? "hero-rise" : "";
          const after = (n: number) => ({ "--d": `${0.08 + n * 0.09}s` }) as CSSProperties;
          return (
            <div
              key={s.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${count}`}
              aria-hidden={!active}
              inert={!active}
              className={`relative [grid-area:1/1] transition-opacity duration-700 ease-[var(--ease-out)] ${
                active ? "z-10 opacity-100" : "pointer-events-none opacity-0"
              }`}
            >
              <div className={`shell grid min-h-[calc(100svh-4.5rem)] gap-6 py-6 ${s.image.cutout ? "content-center" : "content-start"} lg:min-h-[clamp(32rem,calc(100svh-5rem),68rem)] lg:grid-cols-12 lg:grid-rows-1 lg:content-stretch lg:items-center lg:gap-12 lg:py-8`}>
                <div className="order-2 lg:order-1 lg:col-span-7">
                  <p
                    style={after(0)}
                    className={`${rise} inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-sm font-medium`}
                  >
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-saffron" />
                    {s.eyebrow}
                  </p>

                  <Heading
                    id={i === 0 ? "hero-title" : undefined}
                    style={after(1)}
                    // The name on the first slide is the largest type; later slides carry a phrase and sit a size smaller.
                    className={`${rise} font-display mt-4 ${i === 0 ? "text-[clamp(2.6rem,1.5rem+4.6vw,5.25rem)]" : "text-[clamp(2.3rem,1.3rem+3.6vw,4.25rem)]"} font-normal leading-[1] tracking-[-0.01em] [:lang(hi)_&]:leading-[1.2] [:lang(hi)_&]:tracking-normal`}
                  >
                    {s.title.map((line, n) => (
                      <Fragment key={line}>
                        {/* A real space between the lines, so the name reads as two words to screen readers and in the tab title. */}
                        {n > 0 && " "}
                        <span className="block">{line}</span>
                      </Fragment>
                    ))}
                  </Heading>

                  {s.subtitle && (
                    <p style={after(2)} className={`${rise} mt-3 text-lg font-medium text-peach sm:text-2xl`}>
                      {s.subtitle}
                      {s.subtitleNote && (
                        <span className="ml-2 inline-block text-[0.95rem] font-normal text-white/80 sm:text-lg">({s.subtitleNote})</span>
                      )}
                    </p>
                  )}

                  <p style={after(3)} className={`${rise} mt-4 max-w-xl text-[1.05rem] leading-relaxed text-white/85 max-sm:pr-12 sm:text-lg`}>
                    {s.description}
                  </p>

                  <div style={after(4)} className={`${rise} mt-7 flex flex-wrap gap-3`}>
                    <Link href={s.primary.href} className="btn btn-white">
                      {s.primary.label}
                      <ArrowRight aria-hidden="true" className="h-4 w-4" />
                    </Link>
                    <Link href={(s.secondary ?? contact).href} className="btn btn-light">
                      {(s.secondary ?? contact).label}
                    </Link>
                  </div>

                  <dl style={after(5)} className={`${rise} mt-7 grid max-w-2xl grid-cols-3 gap-3 border-t border-white/20 pt-4 sm:mt-8 sm:gap-6 sm:pt-5`}>
                    {s.facts.map((f) => (
                      <div key={f.k}>
                        <dt className="text-xs text-white/80 sm:text-sm">{f.k}</dt>
                        <dd className="mt-1 text-sm font-semibold leading-snug sm:text-base">
                          <CountUp text={f.v} active={active} />
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>

                <div className="order-1 lg:order-2 lg:col-span-5 lg:h-full">
                  {/* A cut-out stands in the column. A photograph has no frame and no space around it: on
                      phones it runs edge to edge across the top of the hero, and on wide screens it fills
                      the hero's right side to the window edge, top to bottom, blending into the saffron
                      only on its left, next to the text. */}
                  <div
                    className={`relative h-[46svh] max-h-[30rem] [@media(max-height:700px)]:h-[38svh] lg:max-h-none lg:[@media(max-height:700px)]:h-full ${
                      s.image.cutout
                        ? "mx-auto w-full max-w-md lg:h-full lg:max-w-none"
                        : "-mx-5 -mt-6 md:-mx-10 lg:absolute lg:inset-y-0 lg:right-0 lg:m-0 lg:h-auto lg:w-[45%]"
                    }`}
                  >
                    {s.image.cutout && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-[8%] bottom-[6%] top-[12%] rounded-full bg-[radial-gradient(closest-side,rgba(255,224,178,0.55),rgba(255,170,90,0.25)_60%,transparent)] blur-2xl"
                      />
                    )}
                    {/* A cut-out sits in a box of its own shape, so the soft fade at its sides and foot falls
                        on its edges (where the elbows and waist are cropped). On wide screens it grows past the
                        row's padding, its faded foot reaching the hero's lower edge, so the figure reads large;
                        its left edge stays in the gap beside the text and it grows only rightwards, to the
                        window edge, then shrinks (standing on its foot) rather than cover the text. */}
                    <div
                      className={`${active ? "hero-zoom" : ""} ${
                        s.image.cutout
                          ? "origin-bottom absolute bottom-0 left-1/2 h-full -translate-x-1/2 lg:-bottom-8 lg:left-[-1.5rem] lg:h-[calc(100%+3.5rem)] lg:max-w-[calc(100%_+_3.5rem_+_max(0px,_(100vw_-_90rem)_/_2))] lg:translate-x-0"
                          : "absolute inset-0"
                      }`}
                      style={s.image.cutout ? { aspectRatio: s.image.ratio } : undefined}
                    >
                      <Image
                        src={s.image.src}
                        alt={s.image.alt}
                        fill
                        // The first slide is the largest paint of the page: fetch it first. The others load lazily.
                        loading={i === 0 ? "eager" : "lazy"}
                        fetchPriority={i === 0 ? "high" : "auto"}
                        sizes={s.image.cutout ? "(min-width: 1024px) 40vw, 90vw" : "(min-width: 1024px) 45vw, 100vw"}
                        style={{ objectPosition: s.image.position }}
                        className={
                          s.image.cutout
                            ? "object-contain [mask-composite:intersect] [mask-image:linear-gradient(to_bottom,#000_80%,transparent),linear-gradient(to_right,transparent,#000_7%,#000_93%,transparent)] drop-shadow-[0_20px_30px_rgba(0,0,0,0.3)]"
                            : "object-cover [mask-image:linear-gradient(to_bottom,#000_75%,transparent)] lg:[mask-image:linear-gradient(to_right,transparent,#000_22%)]"
                        }
                      />
                    </div>

                    {count > 1 && (
                      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/35 p-0.5 text-white backdrop-blur-md lg:bottom-24">
                        <button
                          type="button"
                          onClick={() => go(index - 1)}
                          aria-label={labels.prev}
                          className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-white/20"
                        >
                          <ChevronLeft aria-hidden="true" className="h-5 w-5" />
                        </button>
                        {slides.map((dot, j) => (
                          <button
                            key={dot.id}
                            type="button"
                            onClick={() => setIndex(j)}
                            aria-label={`${labels.goTo} ${j + 1}`}
                            aria-current={j === index}
                            className="group grid h-11 w-8 place-items-center"
                          >
                            <span
                              className={`block h-2 rounded-full bg-white transition-all duration-300 ${
                                j === index ? "w-5" : "w-2 opacity-50 group-hover:scale-125 group-hover:opacity-100"
                              }`}
                            />
                          </button>
                        ))}
                        <button
                          type="button"
                          onClick={() => go(index + 1)}
                          aria-label={labels.next}
                          className="grid h-11 w-11 place-items-center rounded-full transition-colors hover:bg-white/20"
                        >
                          <ChevronRight aria-hidden="true" className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
