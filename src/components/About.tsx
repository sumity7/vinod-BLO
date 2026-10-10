import Image from "next/image";
import Link from "next/link";
import { aboutPreview } from "@/content/profile";
import { getDict } from "@/content/ui";
import { localePath, tr, type Lang } from "@/lib/i18n";
import { Reveal } from "./Reveal";

/**
 * Biography band: the cut-out portrait standing on the band with a warm glow behind it on the
 * left; on the right the heading, a few paragraphs and a "Read More" button.
 */
export function About({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  return (
    <section id="about" aria-labelledby="about-title" className="section bg-sand">
      <div className="shell grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
        <Reveal className="lg:col-span-4">
          <div className="relative mx-auto aspect-[1186/1326] w-full max-w-sm lg:max-w-none">
            <span
              aria-hidden="true"
              className="absolute inset-x-[6%] bottom-[8%] top-[6%] rounded-full bg-[radial-gradient(closest-side,rgba(244,114,22,0.35),rgba(242,165,26,0.15)_60%,transparent)] blur-2xl"
            />
            <Image
              src="/images/leader-portrait.webp"
              alt={d.hero.portraitAlt}
              fill
              sizes="(min-width: 1024px) 30vw, 90vw"
              className="object-contain object-bottom [mask-image:linear-gradient(to_bottom,#000_82%,transparent)]"
            />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-8" delay={0.08}>
          <h2 id="about-title" className="h-section">
            {d.nav.biography}
          </h2>
          <div className="mt-6 max-w-[72ch] space-y-4 leading-[1.8] text-ink-2 [text-wrap:pretty]">
            {aboutPreview.map((p) => (
              <p key={p.en}>{tr(p, lang)}</p>
            ))}
          </div>
          <Link href={localePath(lang, "/about")} className="btn btn-primary mt-7">
            {d.sections.readMore}
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
