import Image from "next/image";
import type { ReactNode } from "react";
import type { HeroImage } from "@/content/heroImages";
import { getDict } from "@/content/ui";
import { tr, type Lang } from "@/lib/i18n";
import { breadcrumbLd, profilePageLd, webPageLd, type Crumb } from "@/lib/seo";
import { Breadcrumbs } from "./Breadcrumbs";
import { JsonLd } from "./JsonLd";

/**
 * Header for every inner page: breadcrumb, title and short text on the left, and on the right
 * a visual that belongs to the page (a photograph, a collage, a portrait, a contact panel or
 * a plain architectural motif). The visuals below are the only variations; the frame around
 * them, the spacing and the type are shared.
 */
export function PageHero({
  lang,
  path,
  crumbs,
  title,
  lead,
  body,
  description,
  eyebrow,
  meta,
  points,
  visual,
  profile,
}: {
  lang: Lang;
  path: string;
  crumbs: Crumb[];
  title: string;
  lead?: string;
  /** Mark the page as the profile of the person in structured data (ProfilePage instead of WebPage). */
  profile?: boolean;
  /** A further paragraph under the lead. */
  body?: string;
  description: string;
  /** Short label above the title. */
  eyebrow?: string;
  /** Small factual line under the text, for example the place. */
  meta?: string;
  /** Short supporting points shown as a plain list under the text. */
  points?: string[];
  visual?: ReactNode;
}) {
  const d = getDict(lang);
  const all: Crumb[] = [{ name: d.home, path: "/" }, ...crumbs];
  return (
    <header className="page-hero border-b border-line bg-sand/50">
      <div className="shell pb-10 pt-7 lg:pb-12">
        <Breadcrumbs lang={lang} crumbs={all} label={d.breadcrumbs} />
        <div className={`mt-6 grid items-center gap-8 lg:grid-cols-12 lg:gap-12 ${visual ? "lg:min-h-[20rem]" : ""}`}>
          <div className={visual ? "min-w-0 lg:col-span-7" : "min-w-0 lg:col-span-12"}>
            {eyebrow && <p className="text-sm font-semibold text-saffron-deep">{eyebrow}</p>}
            <h1 className={`h-page max-w-3xl ${eyebrow ? "mt-2" : ""}`}>{title}</h1>
            {lead && <p className="lead mt-5 max-w-2xl text-ink-2">{lead}</p>}
            {body && <p className="mt-4 max-w-2xl leading-[1.8] text-ink-2 [text-wrap:pretty]">{body}</p>}
            {points && points.length > 0 && (
              <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 border-t border-line pt-5 text-sm font-medium text-ink-2">
                {points.map((p) => (
                  <li key={p} className="flex items-center gap-2">
                    <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-saffron" />
                    {p}
                  </li>
                ))}
              </ul>
            )}
            {meta && <p className="mt-6 text-sm text-muted">{meta}</p>}
          </div>
          {visual && <div className="min-w-0 lg:col-span-5">{visual}</div>}
        </div>
      </div>
      <JsonLd
        data={[
          breadcrumbLd(lang, all),
          (profile ? profilePageLd : webPageLd)(lang, path, title, description),
        ]}
      />
    </header>
  );
}

/** The leader's cut-out portrait, standing on the header without a frame, with a warm glow behind. */
export function HeroPortrait({ image, lang }: { image: HeroImage; lang: Lang }) {
  return (
    <div className="relative mx-auto aspect-[1186/1326] w-full max-w-sm">
      <span
        aria-hidden="true"
        className="absolute inset-x-[6%] bottom-[8%] top-[6%] rounded-full bg-[radial-gradient(closest-side,rgba(244,114,22,0.35),rgba(242,165,26,0.15)_60%,transparent)] blur-2xl"
      />
      <Image
        src={image.src}
        alt={tr(image.alt, lang)}
        fill
        sizes="(min-width: 1024px) 30vw, 90vw"
        loading="eager"
        fetchPriority="high"
        className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,#000_82%,transparent)]"
      />
    </div>
  );
}
