import type { Metadata } from "next";
import { defaultLang, locales, localePath, type L, type Lang } from "./i18n";
import { absoluteUrl, site } from "./site";

const ogLocale: Record<Lang, string> = { en: "en_IN", hi: "hi_IN" };

type PageMeta = {
  lang: Lang;
  /** Route without language prefix, e.g. "/public-life". "" is home. */
  path: string;
  title: string;
  description: string;
  /** Path of an image under /public, or the image with its real size and description. */
  image?: string | { src: string; width: number; height: number; alt?: string };
  type?: "website" | "article";
  /** Use the title as-is instead of applying the "%s | Name" template. */
  absoluteTitle?: boolean;
  publishedTime?: string;
};

/** Shortens text at a word boundary so titles and descriptions are not cut off in search results. */
function clip(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max - 1);
  const at = cut.lastIndexOf(" ");
  return (at > max * 0.6 ? cut.slice(0, at) : cut).replace(/[\s,;:–-]+$/, "") + "…";
}

/**
 * The text of the browser tab and the search-result headline. Search engines show about 60 characters
 * (a little fewer in Devanagari), so a long "Title | Name" is shortened in this order: the whole title
 * alone (without the name); else the part before its colon plus the name; else the title cut at a word.
 * The page's own heading is untouched, and so are the Open Graph titles used by link previews.
 */
function fitTitle(title: string, name: string, lang: Lang): { title: string; absolute: boolean } {
  const max = lang === "hi" ? 54 : 62;
  const withName = (t: string) => `${t} | ${name}`;
  if (withName(title).length <= max) return { title, absolute: false };
  // Whole title without the name: keeps a title like "Our Ideals: Leaders of ..." distinct from its siblings.
  if (title.length <= max) return { title, absolute: true };
  const head = title.split(/:\s/)[0].trim();
  if (head !== title && head.length >= 8 && withName(head).length <= max) return { title: head, absolute: false };
  if (head !== title && head.length >= 8 && head.length <= max) return { title: head, absolute: true };
  return { title: clip(title, max), absolute: true };
}

export function buildMetadata({
  lang,
  path,
  title,
  description,
  image = "/images/og/og-default.jpg",
  type = "website",
  absoluteTitle = false,
  publishedTime,
}: PageMeta): Metadata {
  // Open Graph and Twitter keep the full title (link previews have more room); the tab text is fitted below.
  const fitted = absoluteTitle ? { title: clip(title, lang === "hi" ? 54 : 62), absolute: true } : fitTitle(title, site.name[lang], lang);
  title = clip(title, 90);
  description = clip(description, 160);
  const img = typeof image === "string" ? { src: image, width: 1200, height: 630, alt: site.name[lang] } : image;
  const canonical = localePath(lang, path);
  const languages: Record<string, string> = Object.fromEntries(
    locales.map((l) => [l, localePath(l, path)]),
  );
  languages["x-default"] = localePath(defaultLang, path);

  return {
    title: fitted.absolute ? { absolute: fitted.title } : fitted.title,
    description,
    alternates: { canonical, languages },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: site.name[lang],
      locale: ogLocale[lang],
      alternateLocale: locales.filter((l) => l !== lang).map((l) => ogLocale[l]),
      type,
      ...(publishedTime ? { publishedTime } : {}),
      images: [{ url: img.src, width: img.width, height: img.height, alt: img.alt ?? site.name[lang] }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [img.src],
    },
  };
}

export type Crumb = { name: string; path: string };

export function breadcrumbLd(lang: Lang, crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: absoluteUrl(localePath(lang, crumb.path)),
    })),
  };
}

const websiteId = (lang: Lang) => `${absoluteUrl(localePath(lang))}#website`;
const personId = `${site.url}/#person`;
const inLanguage = (lang: Lang) => (lang === "hi" ? "hi-IN" : "en-IN");

export function webPageLd(lang: Lang, path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${absoluteUrl(localePath(lang, path))}#webpage`,
    url: absoluteUrl(localePath(lang, path)),
    name,
    description,
    inLanguage: inLanguage(lang),
    isPartOf: { "@id": websiteId(lang) },
    about: { "@id": personId },
  };
}

/** For the pages that are the profile of the person: the home page and About. The Person itself is defined in the layout. */
export function profilePageLd(lang: Lang, path: string, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "@id": `${absoluteUrl(localePath(lang, path))}#webpage`,
    url: absoluteUrl(localePath(lang, path)),
    name,
    description,
    inLanguage: inLanguage(lang),
    isPartOf: { "@id": websiteId(lang) },
    mainEntity: { "@id": personId },
  };
}

export function websiteLd(lang: Lang, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": websiteId(lang),
    url: absoluteUrl(localePath(lang)),
    name: site.name[lang],
    description,
    inLanguage: inLanguage(lang),
    publisher: { "@id": personId },
  };
}

export function personLd(lang: Lang, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": personId,
    name: site.name[lang],
    alternateName: [site.name.en, site.name.hi],
    url: absoluteUrl(localePath(lang)),
    image: absoluteUrl("/images/leader-portrait-saffron.webp"),
    description,
    jobTitle: site.role[lang],
    memberOf: { "@type": "Organization", name: "Bharatiya Janata Party" },
    workLocation: {
      "@type": "Place",
      name: "Harhua Block, Varanasi, Uttar Pradesh, India",
    },
    sameAs: site.socials.map((s) => s.href),
  };
}

export function articleLd(opts: {
  lang: Lang;
  path: string;
  headline: L;
  description: L;
  date?: string;
  image?: string;
}) {
  const { lang, path, headline, description, date, image } = opts;
  const person = { "@type": "Person", "@id": personId, name: site.name[lang], url: absoluteUrl(localePath(lang)) };
  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    headline: headline[lang],
    description: description[lang],
    ...(date ? { datePublished: date, dateModified: date } : {}),
    inLanguage: inLanguage(lang),
    mainEntityOfPage: absoluteUrl(localePath(lang, path)),
    author: person,
    publisher: person,
    image: absoluteUrl(image ?? "/images/og/og-default.jpg"),
  };
}
