import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { HoverGallery } from "@/components/HoverGallery";
import { updateCategories, type Update, type UpdateImage } from "@/content/updates";
import { localePath, tr, type Lang } from "@/lib/i18n";

export function formatDate(iso: string, lang: Lang) {
  return new Intl.DateTimeFormat(lang === "hi" ? "hi-IN" : "en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(iso));
}

/** The main photograph followed by the gallery, each once: the slides of the card's hover gallery. */
function slides(update: Update): UpdateImage[] {
  const all = [update.image, ...(update.gallery ?? [])].filter((i): i is UpdateImage => Boolean(i));
  return all.filter((img, i) => all.findIndex((o) => o.src === img.src) === i);
}

export function UpdateCard({
  update,
  lang,
  readMore,
  variant = "card",
  featuredLabel,
  headingLevel = "h3",
}: {
  update: Update;
  lang: Lang;
  readMore: string;
  /** "feature" puts the photograph beside the text on wide screens. */
  variant?: "card" | "feature";
  /** When given, an update marked `featured` shows this tag. */
  featuredLabel?: string;
  /** Use "h2" where the card sits directly under the page's h1. */
  headingLevel?: "h2" | "h3";
}) {
  const Heading = headingLevel;
  const href = localePath(lang, `/updates/${update.slug}`);
  const feature = variant === "feature";
  // Tall or very small photographs stay on the article page; they would look soft when stretched into a card.
  const cover =
    update.image && update.image.width >= 500 && update.image.height <= update.image.width * 1.4
      ? update.image
      : null;
  const split = feature && Boolean(cover);
  if (!feature) {
    // Card: soft white surface that lifts on hover, the date on a small chip over the photograph.
    return (
      <article className="group card card-hover flex h-full flex-col">
        {cover ? (
          <Link href={href} tabIndex={-1} aria-hidden="true" className="relative block aspect-[16/9] overflow-hidden bg-sand lg:aspect-[2/1]">
            <HoverGallery images={[cover, ...slides(update).filter((i) => i.src !== cover.src)]} sizes="(min-width: 1024px) 55vw, 90vw" />
            {update.date && (
              <time
                dateTime={update.date}
                className="absolute left-3 top-3 z-30 rounded-full bg-white/95 px-3 py-1 text-[0.8125rem] font-semibold text-ink shadow-soft"
              >
                {formatDate(update.date, lang)}
              </time>
            )}
          </Link>
        ) : (
          update.date && (
            <time dateTime={update.date} className="px-5 pt-5 text-[0.8125rem] font-semibold text-muted">
              {formatDate(update.date, lang)}
            </time>
          )
        )}
        <div className="flex flex-1 flex-col p-5">
          <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
            {featuredLabel && update.featured && (
              <span className="rounded-full bg-peach px-2.5 py-0.5 text-[0.8125rem] font-semibold text-burnt">
                {featuredLabel}
              </span>
            )}
            <span className="font-semibold text-saffron-deep">{tr(updateCategories[update.category], lang)}</span>
          </p>
          <Heading className="h-card mt-2">
            <Link href={href} className="hover:text-saffron-deep">
              {tr(update.title, lang)}
            </Link>
          </Heading>
          <p className="mt-2 line-clamp-3 flex-1 text-[0.95rem] leading-relaxed text-ink-2">{tr(update.summary, lang)}</p>
          <Link href={href} className="link-arrow mt-4 self-start">
            {readMore}
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </Link>
        </div>
      </article>
    );
  }
  return (
    <article
      className={`group ${
        split
          ? "grid items-center gap-8 border-t border-ink/60 pt-8 lg:grid-cols-12 lg:gap-14"
          : feature
            ? "border-t border-ink/60 pt-8"
            : "flex h-full flex-col border-t border-ink/60 pt-5"
      }`}
    >
      {cover && (
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className={`block overflow-hidden bg-sand ${feature ? "lg:col-span-7" : "mb-5"}`}
        >
          <Image
            src={cover.src}
            alt=""
            width={cover.width}
            height={cover.height}
            sizes={feature ? "(min-width: 1024px) 58vw, 92vw" : "(min-width: 1024px) 30vw, 90vw"}
            style={cover.position ? { objectPosition: cover.position } : undefined}
            className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        </Link>
      )}
      <div className={split ? "lg:col-span-5" : feature ? "max-w-3xl" : "flex flex-1 flex-col"}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          {featuredLabel && update.featured && (
            <span className="rounded-full bg-peach px-2.5 py-0.5 text-[0.8125rem] font-semibold text-burnt">
              {featuredLabel}
            </span>
          )}
          <span className="font-semibold text-saffron-deep">
            {tr(updateCategories[update.category], lang)}
          </span>
          {update.date && (
            <>
              <span aria-hidden="true" className="hidden text-line sm:inline">
                |
              </span>
              <time dateTime={update.date} className="text-muted">
                {formatDate(update.date, lang)}
              </time>
            </>
          )}
          {update.location && (
            <>
              <span aria-hidden="true" className="hidden text-line sm:inline">
                |
              </span>
              <span className="text-muted">{tr(update.location, lang)}</span>
            </>
          )}
        </p>
        <Heading className={`h-card mt-3 ${feature ? "text-[1.65rem] leading-snug" : ""}`}>
          <Link href={href} className="hover:text-saffron-deep">
            {tr(update.title, lang)}
          </Link>
        </Heading>
        <p className={`mt-3 leading-relaxed text-ink-2 text-justify hyphens-auto ${feature ? "" : "flex-1"}`}>
          {tr(update.summary, lang)}
        </p>
        <Link href={href} className="link-arrow mt-6 self-start">
          {readMore}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}

/**
 * One event as a full-width row: photograph on the left, text on the right. Rows stack one
 * after another in the order given, so the Events page has no gaps or half-empty grid cells.
 */
export function UpdateRow({
  update,
  lang,
  readMore,
  featuredLabel,
}: {
  update: Update;
  lang: Lang;
  readMore: string;
  featuredLabel?: string;
}) {
  const href = localePath(lang, `/updates/${update.slug}`);
  const img = update.image;
  return (
    <article className="group card card-hover grid md:grid-cols-12">
      {img && (
        <Link
          href={href}
          tabIndex={-1}
          aria-hidden="true"
          className="relative block aspect-[3/2] overflow-hidden bg-sand md:col-span-5 md:aspect-auto md:min-h-[17rem]"
        >
          <HoverGallery images={slides(update)} sizes="(min-width: 768px) 40vw, 92vw" />
          {update.date && (
            <time
              dateTime={update.date}
              className="absolute left-3 top-3 z-30 rounded-full bg-white/95 px-3 py-1 text-[0.8125rem] font-semibold text-ink shadow-soft"
            >
              {formatDate(update.date, lang)}
            </time>
          )}
        </Link>
      )}
      <div className={`flex flex-col justify-center p-5 sm:p-7 ${img ? "md:col-span-7" : "md:col-span-12"}`}>
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
          {featuredLabel && update.featured && (
            <span className="rounded-full bg-peach px-2.5 py-0.5 text-[0.8125rem] font-semibold text-burnt">{featuredLabel}</span>
          )}
          <span className="font-semibold text-saffron-deep">{tr(updateCategories[update.category], lang)}</span>
          {update.location && <span className="text-muted">· {tr(update.location, lang)}</span>}
        </p>
        <h2 className="h-card mt-2 text-[1.4rem]">
          <Link href={href} className="hover:text-saffron-deep">
            {tr(update.title, lang)}
          </Link>
        </h2>
        <p className="mt-3 leading-relaxed text-ink-2 text-justify hyphens-auto">{tr(update.summary, lang)}</p>
        <Link href={href} className="link-arrow mt-5 self-start">
          {readMore}
          <ArrowRight aria-hidden="true" className="h-4 w-4" />
        </Link>
      </div>
    </article>
  );
}
