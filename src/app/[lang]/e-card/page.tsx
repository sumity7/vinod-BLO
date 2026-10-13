import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { ECardMaker, type CardOption } from "@/components/ecard/ECardMaker";
import { ecardTemplates, themeFor, tributeText } from "@/content/ecards";
import { ideals } from "@/content/ideals";
import { pt } from "@/content/portal";
import { getLang, type LangParams } from "@/lib/page";
import { buildMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import type { Lang } from "@/lib/i18n";

export async function generateMetadata({ params }: LangParams): Promise<Metadata> {
  const lang = await getLang(params);
  const t = pt(lang).ecard;
  return buildMetadata({ lang, path: "/e-card", title: t.seoTitle, description: t.description });
}

function cardOptions(lang: Lang): CardOption[] {
  const festivals: CardOption[] = ecardTemplates.map((t) => ({
    id: t.id,
    label: t.label[lang],
    greeting: t.greeting[lang],
    title: t.label[lang],
    kicker: lang === "hi" ? "हार्दिक शुभकामनाएँ" : "Warm Wishes",
    line: t.line[lang],
    motif: t.motif,
    scene: t.scene,
    detail: t.detail?.[lang],
    palette: t.palette,
    group: "festival",
  }));
  const tributes: CardOption[] = ideals.flatMap((ideal) => {
    const out: CardOption[] = [];
    const make = (kind: "jayanti" | "punyatithi", date: string): CardOption => {
      const tx = tributeText[kind];
      const name = ideal.name[lang];
      const theme = themeFor(ideal.slug);
      // The person's own words on the card; the quote's line breaks (couplets) become spaces.
      const quote = ideal.quote[lang].replace(/\s*\n\s*/g, " ").trim();
      return {
        id: `${ideal.slug}-${kind}`,
        label: `${name}: ${pt(lang).ideals[kind]}`,
        greeting: lang === "hi" ? `${name} ${tx.greeting.hi}` : `${tx.greeting.en} ${name}`,
        title: name,
        kicker: lang === "hi" ? (kind === "jayanti" ? "जयंती · शत-शत नमन" : "पुण्यतिथि · विनम्र श्रद्धांजलि") : kind === "jayanti" ? "Jayanti · Humble Tributes" : "Punyatithi · Heartfelt Tributes",
        line: `“${quote}”`,
        detail: ideal.source ? `— ${ideal.source[lang]}` : tx.line[lang],
        motif: "scene",
        scene: theme.scene,
        palette: theme.palette,
        medallion: ideal.initials[lang],
        portrait: ideal.image,
        caption: ideal.years?.[lang],
        group: "tribute",
        date: date.slice(5),
      };
    };
    if (ideal.born) out.push(make("jayanti", ideal.born));
    if (ideal.died) out.push(make("punyatithi", ideal.died));
    return out;
  });
  return [...festivals, ...tributes];
}

export default async function ECardPage({
  params,
  searchParams,
}: LangParams & { searchParams: Promise<{ occasion?: string | string[] }> }) {
  const lang = await getLang(params);
  const t = pt(lang);
  const { occasion } = await searchParams;
  // The card's foot line: the Facebook page, which stays the same wherever the site runs (the site's
  // own address is localhost or a vercel.app name until a domain is chosen).
  const fb = site.socials.find((x) => x.id === "facebook");
  const footer = fb ? fb.href.replace(/^https?:\/\/(www\.)?/, "") : site.name[lang];

  return (
    <>
      <PageHero
        lang={lang}
        path="/e-card"
        crumbs={[{ name: t.nav.ecard, path: "/e-card" }]}
        title={t.ecard.title}
        lead={t.ecard.lead}
        description={t.ecard.description}
      />
      <section className="section">
        <div className="shell">
          <ECardMaker
            options={cardOptions(lang)}
            initial={typeof occasion === "string" ? occasion : undefined}
            leader={{
              name: site.name[lang],
              role: site.roleShort[lang],
              photo: "/images/leader-standing.webp",
              logo: "/images/logo.webp",
            }}
            footer={footer}
            fileStem={lang === "hi" ? "shubhkamna" : "greeting"}
            labels={{
              ...t.ecard,
              festivals: lang === "hi" ? "त्योहार और राष्ट्रीय पर्व" : "Festivals and national days",
              tributes: lang === "hi" ? "हमारे आदर्श: जयंती और पुण्यतिथि" : "Our Ideals: anniversaries",
              today: t.ideals.today,
              tomorrow: t.ideals.tomorrow,
              inDays: t.ideals.inDays,
            }}
          />
        </div>
      </section>
    </>
  );
}
