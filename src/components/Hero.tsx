import { heroSlides } from "@/content/heroSlides";
import { getDict } from "@/content/ui";
import { localePath, tr, type Lang } from "@/lib/i18n";
import { HeroCarousel, type HeroSlideView } from "./HeroCarousel";

/**
 * Home hero. The slides themselves live in content/heroSlides.ts; this only puts the words in the
 * page's language and hands them to the carousel.
 */
export function Hero({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const slides: HeroSlideView[] = heroSlides.map((s) => ({
    id: s.id,
    eyebrow: tr(s.eyebrow, lang),
    title: s.title[lang],
    subtitle: s.subtitle ? tr(s.subtitle, lang).replace(/^\(|\)$/g, "") : undefined,
    subtitleNote: s.subtitleNote ? tr(s.subtitleNote, lang) : undefined,
    description: tr(s.description, lang),
    primary: { href: localePath(lang, s.primary.href), label: tr(s.primary.label, lang) },
    secondary: s.secondaryButton
      ? { href: localePath(lang, s.secondaryButton.href), label: tr(s.secondaryButton.label, lang) }
      : undefined,
    facts: s.snapshot.rows.map((r) => ({ k: tr(r.k, lang), v: tr(r.v, lang) })),
    image: {
      src: s.person.src,
      alt: tr(s.person.alt, lang),
      position: s.person.position,
      cutout: s.person.cutout,
      ratio: s.person.width / s.person.height,
    },
  }));
  const labels =
    lang === "hi"
      ? { region: "मुख्य बैनर", prev: "पिछली स्लाइड", next: "अगली स्लाइड", goTo: "स्लाइड" }
      : { region: "Featured banner", prev: "Previous slide", next: "Next slide", goTo: "Go to slide" };
  return (
    <HeroCarousel
      slides={slides}
      contact={{ href: localePath(lang, "/contact"), label: d.hero.ctaSecondary }}
      labels={labels}
    />
  );
}
