import { MapPin } from "lucide-react";
import { getDict } from "@/content/ui";
import type { Lang } from "@/lib/i18n";
import { site } from "@/lib/site";
import { ContactForm } from "./ContactForm";
import { socialIcons } from "./icons";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";
import { SocialLinks } from "./SocialLinks";

/**
 * Enquiry section, used on the home page and on /contact. The compact version (on /contact) puts
 * the form beside a card with the official social pages and the place.
 */
export function ContactSection({ lang, compact = false }: { lang: Lang; compact?: boolean }) {
  const d = getDict(lang);

  if (compact) {
    return (
      <section id="contact" aria-label={d.contact.title} className="section bg-paper">
        <div className="shell grid items-start gap-6 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-8">
            <div className="card p-5 sm:p-8">
              <ContactForm copy={d.contact.form} />
            </div>
          </Reveal>

          <Reveal className="lg:sticky lg:top-28 lg:col-span-4" delay={0.08}>
            <div className="card p-6 sm:p-7">
              <p className="label">{d.contact.social}</p>
              <ul className="mt-3 divide-y divide-line">
                {site.socials.map((s) => {
                  const Icon = socialIcons[s.id as keyof typeof socialIcons];
                  return (
                    <li key={s.id}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 py-3 transition-colors hover:text-saffron-deep"
                      >
                        <span className="grid h-10 w-10 shrink-0 place-items-center rounded-soft bg-sand text-saffron-deep transition-colors group-hover:bg-saffron group-hover:text-white">
                          <Icon className="h-[1.1rem] w-[1.1rem]" />
                        </span>
                        <span className="min-w-0">
                          <span className="block font-semibold leading-tight">{s.label}</span>
                          <span className="block truncate text-sm text-muted">{s.handle}</span>
                        </span>
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
              <p className="mt-4 flex items-center gap-2 border-t border-line pt-4 text-ink-2">
                <MapPin aria-hidden="true" className="h-4 w-4 shrink-0 text-saffron-deep" />
                {site.place[lang]}
              </p>
              <p className="mt-2 text-sm text-muted">{d.contact.note}</p>
            </div>
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" aria-labelledby="contact-title" className="section bg-paper">
      <div className="shell grid gap-8 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            id="contact-title"
            title={d.sections.contactTitle}
            lead={d.sections.contactLead}
          />

          <div className="mt-6 border-t border-line pt-5">
            <p className="label">{d.contact.social}</p>
            <div className="-ml-2 mt-1">
              <SocialLinks iconClassName="h-5 w-5" linkClassName="text-ink" />
            </div>
          </div>
          <p className="mt-4 text-sm text-muted">{d.contact.note}</p>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={0.08}>
          <div className="card p-5 sm:p-8">
            <ContactForm copy={d.contact.form} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
