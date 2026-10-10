import { ArrowUpRight } from "lucide-react";
import type { Lang } from "@/lib/i18n";

const AD_URL = "https://praibadvisors.com/";

const copy = {
  en: { label: "Advertisement", name: "PRAIB Advisors" },
  hi: { label: "विज्ञापन", name: "PRAIB Advisors" },
} satisfies Record<Lang, Record<string, string>>;

/**
 * Sponsor pill for the footer's bottom row. On hover it lifts, a light sweeps across it, and the
 * arrow circle fills and turns. It is labelled as an advertisement.
 */
export function PartnerAd({ lang }: { lang: Lang }) {
  const t = copy[lang];
  return (
    <aside aria-label={t.label}>
      <a
        href={AD_URL}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="group relative inline-flex h-16 items-center gap-5 overflow-hidden rounded-full border border-white/35 py-2 pl-6 pr-3 text-white transition-all duration-300 hover:-translate-y-1 hover:border-white hover:bg-white/10 hover:shadow-[0_14px_28px_-10px_rgba(0,0,0,0.6)]"
      >
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-1/3 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent group-hover:[animation:ad-shine_0.9s_ease-out]"
        />
        <span className="relative block">
          <span className="block text-[0.65rem] font-medium uppercase tracking-[0.18em] text-white/80">
            {t.label}
          </span>
          <span className="block font-display text-[1.05rem] font-semibold leading-tight">{t.name}</span>
        </span>
        <span className="relative grid h-10 w-10 shrink-0 place-items-center rounded-full border border-saffron text-saffron transition-all duration-300 group-hover:rotate-45 group-hover:bg-saffron group-hover:text-white">
          <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
        </span>
        <span className="sr-only">(opens in a new tab)</span>
      </a>
    </aside>
  );
}
