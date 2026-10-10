import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { getDict } from "@/content/ui";
import { localePath, type Lang } from "@/lib/i18n";
import { buildNav } from "@/lib/nav";
import { site } from "@/lib/site";
import { PartnerAd } from "./PartnerAd";
import { socialIcons } from "./icons";

/**
 * Burnt-orange footer: brand, Quick Links (in two short columns, so the footer stays low) and Stay
 * Connected, all starting on one line, with round social buttons and a copyright line. There is
 * no newsletter or published address.
 */
export function Footer({ lang }: { lang: Lang }) {
  const d = getDict(lang);
  const links = buildNav(d, lang).flatMap((item) =>
    item.children
      ? item.children.map((c) => ({ label: c.label, href: c.href }))
      : item.href
        ? [{ label: item.label, href: item.href }]
        : [],
  );
  const year = new Date().getFullYear();
  const heading = "mb-4 font-display text-[1.15rem] font-semibold text-white";

  return (
    <footer className="on-dark bg-burnt text-white">
      <div className="shell py-14">
        <div className="grid gap-10 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-4">
            <p className="font-display text-2xl font-semibold leading-tight">{site.name[lang]}</p>
            <p className="mt-1 text-lg text-peach">{site.role[lang]}</p>
            <p className="mt-4 max-w-sm leading-relaxed text-white/90">{d.footer.tagline}</p>
          </div>

          <nav aria-label={d.footer.quickLinks} className="md:col-span-5">
            <h2 className={heading}>{d.footer.quickLinks}</h2>
            <ul className="grid grid-cols-2 gap-x-6">
              {links.map((l) => (
                <li key={l.href}>
                  <Link
                    href={localePath(lang, l.href)}
                    className="group inline-flex min-h-9 items-center gap-1.5 text-white/85 transition-colors hover:text-white"
                  >
                    <ChevronRight
                      aria-hidden="true"
                      className="h-3.5 w-3.5 shrink-0 text-peach transition-transform duration-200 group-hover:translate-x-0.5"
                    />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="md:col-span-3">
            <h2 className={heading}>{d.footer.stayConnected}</h2>
            <ul className="flex flex-wrap gap-2">
              {site.socials.map((s) => {
                const Icon = socialIcons[s.id as keyof typeof socialIcons];
                return (
                  <li key={s.id}>
                    <a
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${s.label} (opens in a new tab)`}
                      className="grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition-colors hover:bg-white hover:text-saffron-deep"
                    >
                      <Icon className="h-5 w-5" />
                    </a>
                  </li>
                );
              })}
            </ul>
            <p className="mt-5 text-white/90">{site.place[lang]}</p>
          </div>
        </div>
      </div>

      <div className="border-t border-white/20">
        {/* One row: copyright on the left, the sponsor pill on the right with room beside it for the
            assistant button, which is fixed to the bottom-right corner on the same line. */}
        <div className="shell flex flex-col gap-4 pb-24 pt-5 text-sm text-white/90 sm:flex-row sm:items-center sm:justify-between sm:py-5 lg:pb-5">
          <p>
            © {year} {site.name[lang]}. {d.footer.rights}
          </p>
          <div className="sm:mr-44 lg:mr-52">
            <PartnerAd lang={lang} />
          </div>
        </div>
      </div>
    </footer>
  );
}
