import type { L } from "./i18n";

// Set NEXT_PUBLIC_SITE_URL to the live domain. Until a custom domain is chosen, the live
// Vercel address is used, so link previews (WhatsApp, Facebook) and search engines get a real URL.
const PRODUCTION_URL = "https://vinod-jet.vercel.app";

/**
 * Canonical origin for every absolute URL (canonical links, hreflang, Open Graph, sitemap, robots,
 * structured data). NEXT_PUBLIC_SITE_URL overrides it, but a production build never accepts a
 * localhost, plain-http or *.vercel.app value, so a missing or wrong env var cannot leak into search.
 */
function resolveSiteUrl() {
  const fromEnv = (process.env.NEXT_PUBLIC_SITE_URL ?? "").trim().replace(/\/$/, "");
  if (!fromEnv) return process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000";
  // Preview deployments (random *.vercel.app names) and localhost never leak into production URLs.
  if (process.env.NODE_ENV === "production" && !/^https:\/\/(?!localhost)/.test(fromEnv)) {
    return PRODUCTION_URL;
  }
  return fromEnv;
}

export const site = {
  url: resolveSiteUrl(),
  name: {
    en: "Vinod Kumar Upadhyay",
    hi: "विनोद कुमार उपाध्याय",
  } satisfies L,
  role: {
    en: "Block Pramukh, Harhua Block, Varanasi",
    hi: "ब्लॉक प्रमुख, हरहुआ ब्लॉक, वाराणसी",
  } satisfies L,
  roleShort: { en: "Block Pramukh, Harhua", hi: "ब्लॉक प्रमुख, हरहुआ" } satisfies L,
  constituency: {
    en: "Shivpur Assembly Constituency, Varanasi",
    hi: "शिवपुर विधानसभा क्षेत्र, वाराणसी",
  } satisfies L,
  place: {
    en: "Harhua Block, Varanasi",
    hi: "हरहुआ ब्लॉक, वाराणसी",
  } satisfies L,
  socials: [
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/babbu4bjp",
      handle: "babbu4bjp",
    },
    {
      id: "x",
      label: "X",
      href: "https://x.com/babbuvinod4bjp",
      handle: "@babbuvinod4bjp",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/babbuvinod4bjp",
      handle: "@babbuvinod4bjp",
    },
    {
      id: "youtube",
      label: "YouTube",
      href: "https://www.youtube.com/@babbuvinod_4bjp",
      handle: "@babbuvinod_4bjp",
    },
  ],
  /** Used by the "Latest from social media" section. */
  feeds: {
    facebookPage: "https://www.facebook.com/babbu4bjp",
    youtubeChannelId: "UCzb71g1m1e_cepUofH9IyZQ",
  },
} as const;

export const absoluteUrl = (path: string) => `${site.url}${path}`;
