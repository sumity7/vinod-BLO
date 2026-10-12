import { ArrowUpRight } from "lucide-react";
import type { Lang } from "@/lib/i18n";

const CREDIT_URL = "https://praibadvisors.com/";

const copy = {
  en: { label: "Website developed & managed by", name: "PRAIB Advisors LLP", newTab: "(opens in a new tab)" },
  hi: { label: "वेबसाइट निर्माण एवं प्रबंधन", name: "PRAIB Advisors LLP", newTab: "(नए टैब में खुलता है)" },
} satisfies Record<Lang, Record<string, string>>;

/**
 * The website credit in the footer's bottom row: a small label above the company name, the whole
 * block one link. Hindi is never letter-spaced or uppercased, so the tracking is English only.
 */
export function SiteCredit({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <a
      href={CREDIT_URL}
      target="_blank"
      rel="noopener noreferrer nofollow"
      className="group inline-flex min-h-14 items-center rounded-lg border border-white/25 bg-white/[0.04] px-4 py-2.5 text-white transition-colors duration-200 hover:border-white/55 hover:bg-white/10"
    >
      <span className="block">
        <span
          className={`block whitespace-nowrap text-xs font-medium leading-snug text-peach ${lang === "en" ? "uppercase tracking-[0.14em]" : ""}`}
        >
          {t.label}
        </span>
        <span className="mt-0.5 flex items-center gap-1.5 font-display text-[1.05rem] font-semibold leading-tight">
          {t.name}
          <ArrowUpRight
            aria-hidden="true"
            className="h-4 w-4 text-peach transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white motion-reduce:transition-none"
          />
        </span>
      </span>
      <span className="sr-only">{t.newTab}</span>
    </a>
  );
}
