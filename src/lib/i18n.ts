export const locales = ["hi", "en"] as const;
export type Lang = (typeof locales)[number];
/** Visitors with no language preference land on Hindi (see proxy.ts). */
export const defaultLang: Lang = "hi";

/** A string that exists in both languages. */
export type L = { en: string; hi: string };

export const isLang = (value: string): value is Lang =>
  (locales as readonly string[]).includes(value);

export const tr = (value: L, lang: Lang) => value[lang];

/** Build a locale-prefixed path. `path` starts with "/" or is empty for home. */
export const localePath = (lang: Lang, path = "") =>
  `/${lang}${path === "/" ? "" : path}`;

export const otherLang = (lang: Lang): Lang => (lang === "en" ? "hi" : "en");
